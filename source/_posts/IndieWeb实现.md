---
title: IndieWeb的实现
abbrlink: 22037
tags:
  - 站点折腾
categories:
  - 站点折腾
date: 2025-01-27 15:20:44
---
# 前言

## 初次看见webring
之前闲着没事干逛开往issues的时候看到了这么个站点：
{% link 甜鱼/Ayu,https://ayu.land/,https://ayu.land/favicon.png,虽然这位博主很久没更新了，邮件也不回。。。。。。 %}
当时这个按钮引起了我的注意：
![引起我注意的按钮](https://images1.blog.sinzmise.top/20250127/msedge_W0D5sJwJdS.avif)
这是个啥东西？友链接力？还是什么？于是我写了个邮件问问这位站长
这位站长给我的回复如下：
![站长的回复](https://images1.blog.sinzmise.top/20250127/msedge_aPesUGpkib.avif)
果然是类似于友链接力的，而且开往正是受到这个webring的启发
当时还以为那站点能加入的原因是简约，而且加入这个成员大多都是foreign，所以我就没怎么去了解

## 再次看见
后面闲着没事干，又去逛逛开往 {% psw 这波开往上大分 %} ，来到了[他的第二人生](https://his2nd.life/)这个站点
然后我就看到了这篇文章：
{% link IndieWeb 实现测试,https://his2nd.life/zh-CN/posts/127efb3.html,https://bucket.hollisdevhub.com/blog/common/avatar.webp %}
再加上我在那站点末尾看见了IndieWeb Webring的标志
才知道Hexo的博客原来也能加入IndieWeb webring

而加入IndieWeb webring的前提条件是：站点必须适配IndieWeb

# 前提条件
必须要有独立网站和个人域名，{% psw 没错，就是独立网站和个人域名，其实刚开始看的时候我还以为我看错了，后来才发现我没看错，那官方文档就是这么写的 %}

# 教程开始！
对IndieWeb的适配分为四个部分：IndieAuth、RelMeAuth、Microformats和WebMention
## IndieAuth（必选）&& RelMeAuth（必选）
这个教程其实很简单，就是在你的Github链接和邮箱链接对应的元素添加`rel="me"`的标签
并且去 https://indieauth.com/ 那边登录+获取IndieAuth代码放到head里面就行（后面那Web Sign-in form什么的不用添加）
也因此我才把这两个合并到一起

添加标签和代码：
{% tabs IndieAuth && RelMeAuth %}
<!-- tab Solitude主题 -->
修改`[Blogroot]\themes\solitude\layout\includes\widgets\aside\asideInfoCard.pug`，转到最后一行
```diff
            .card-info-social-icons.is-center
                each value, label in theme.aside.my_card.information || {}
                    - var array = value.split('||')
-                    a.social-icon.u-url(class=array[2] href=url_for(trim(array[0])), title=label)
+                    a.social-icon.u-url(class=array[2] href=url_for(trim(array[0])), title=label, rel="me")
                        i.solitude(class=array[1])

```
然后修改主题目录下的`_config.yml`或者博客目录下的`_config.solitude.yml`
```yaml
# Aside
# 侧边栏
aside:
  # Information card
  # 信息卡
  my_card:
    # social
    # 社交信息图标
    information:
     Github: https://github.com/SinzMise || fab fa-github # 添加你的Github链接（必须！）
     Email: mailto:email@sinzmise.top || fa fa-envelope # 添加你的邮件地址（必须！）

...

# Extend
# 扩展
extends:
  # Insert in head
  # 插入到 head
  head:
    - <link rel="authorization_endpoint" href="https://indieauth.com/auth">
    - <link rel="token_endpoint" href="https://tokens.indieauth.com/token">
```
<!-- endtab -->

<!-- tab 其它主题 -->
懒得写了，反正`rel-'me'`按照我上面说的来添加就可以
如果你想提前支持IndieAuth，就直接在`</head>`之前添加这两个就可以了：
```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth">
<link rel="token_endpoint" href="https://tokens.indieauth.com/token">
```
<!-- endtab -->
{% endtabs %}
然后去 https://indieauth.com/ 这边登录你的账号 
**（注意：如果你用的是静态博客，那么在去登录之前你必须要给博客push上去！要不然提示找不到rel=me标签！）**
划到最下面，在`Try It!`这个地方输入你的网址
![在这里输入网址](https://images1.blog.sinzmise.top/20250127/msedge_ZBaJIoLQB4.avif)
然后点击Sign-In会询问你用Github登录还是用邮箱登录
随便选一个登录之后看到这个就说明成功了：
![成功提示](https://images1.blog.sinzmise.top/20250127/msedge_wE6GFHM4xS.png)
当然在此之前你可以去 https://indiewebify.me/validate-rel-me/ 那边检测
检测成功会提示这个：
![检测成功的样子](https://images1.blog.sinzmise.top/20250127/image.avif)

## Microformats（必选）
最难的地方来了
因为这个会引入大量的class标签
如果是别的主题魔改还好，如果像solitude这种文章标题在Header里面就很难改，而且一不小心就识别错误
而如果是Redifine这种使用了Tailwind CSS就更难，因为这个会在页面中留下许多`h-`开头的类名，导致部分 microformats 解析器解析出错误的数据
{% psw 这也是为什么我这么讨厌Tailwind CSS %}

因此目前只有Solitude的魔改教程，而且只有必要的class，其它主题或者非Hexo博客可以参考一下wiki：
https://microformats.org/wiki/h-card
https://microformats.org/wiki/h-entry

### h-card（个人信息）
修改`[Blogroot]\themes\solitude\layout\includes\widgets\aside\asideInfoCard.pug`
```diff
- .card-widget.card-info
+ .card-widget.card-info.h-card
    .card-content
        .card-info-avatar.is-center
            .author-info__top-group
                .author-info__sayhi#author-info__sayhi(onclick="sco.changeWittyWord()")
        .avatar-img-group
-             img.avatar-img(alt=_p('aside.avatar'), src=theme.aside.my_card.author.img)
+             img.u-photo.avatar-img(alt=_p('aside.avatar'), src=theme.aside.my_card.author.img)
            if theme.aside.my_card.author.sticker
                .avatar-sticker
                    img.avatar-sticker-img(src=theme.aside.my_card.author.sticker, alt=_p('aside.sticker'))
        .author-info__description_group
            .author-info__description!= theme.aside.my_card.content
        .author-info__bottom-group
            span.author-info__bottom-group-left
-                 .author-info__name= config.author
-                 .author-info__desc!= theme.aside.my_card.description
+                 .author-info__name.p-name= config.author
+                 .author-info__desc.p-note!= theme.aside.my_card.description
            .card-info-social-icons.is-center
                each value, label in theme.aside.my_card.information || {}
                    - var array = value.split('||')
-                     a.social-icon(class=array[2] href=url_for(trim(array[0])), title=label, rel="me")
+                     a.social-icon.u-url(class=array[2] href=url_for(trim(array[0])), title=label, rel="me")
                        i.solitude(class=array[1])
```
修改完成后给博客push上去
然后去 https://indiewebify.me/validate-h-card/ 这边检测h-card的代码添加情况
如果识别到你设置的信息那就是成功了
![成功提示](https://images1.blog.sinzmise.top/azurlane/msedge_F1DgJAYQgE.png)

### h-entry（博客信息）
修改`[Blogroot]\themes\solitude\layout\post.pug`
```diff
extends includes/layout.pug

block content
    main.layout#content-inner
-         #post
+         #post.h-entry
+             .h-card
+                 a.p-author(href=url_for("/") rel="author" style='display:none')= config.author
+                 img.u-photo(href=theme.aside.my_card.author.img style='display:none')
+             a.u-url.p-name(href=urlNoIndex() style='display:none')= page.title
+             time.dt-published(datetime=date_xml(page.date) style='display:none')= date_xml(page.date)
+             time.dt-updated(datetime=date_xml(page.updated) style='display:none')= date_xml(page.updated)
+             if page.categories.data.length > 0
+                 a.p-category(href=url_for('/' + page.categories.data[0].path) style='display:none')= page.categories.data[0].name
            if page.not_cover
                include includes/widgets/post/postInfo
            article.post-content.article-container
                if theme.post_ai.enable
                    include includes/widgets/post/post-ai
-                 != page.content
+                 .e-content!= page.content
```
修改`[Blogroot]\themes\solitude\layout\includes\widgets\post\copyright.pug`，转到第`25`行
```diff
            each item in theme.post.share.list || []
                case item
                    when 'qq'
-                         a.social-share-ico.icon-qq(href=`https://connect.qq.com/widget/shareqq/index.html?url=${encodedPath}&title=${encodedTitle}&desc=${encodedDescription}&summary=${encodedDescription}&site=${encodedTitle}&pics=${encodedIcon}` title=_p('post.share.qq'))
+                         a.u-syndication.social-share-ico.icon-qq(href=`https://connect.qq.com/widget/shareqq/index.html?url=${encodedPath}&title=${encodedTitle}&desc=${encodedDescription}&summary=${encodedDescription}&site=${encodedTitle}&pics=${encodedIcon}` title=_p('post.share.qq'))
                            i.solitude.fab.fa-qq
                    when 'weibo'
-                         a.social-share-ico.icon-weibo(href=`http://service.weibo.com/share/share.php?url=${encodedPath}&title=${encodedTitle}&pic=${encodedIcon}` title=_p('post.share.weibo'))
+                         a.u-syndication.social-share-ico.icon-weibo(href=`http://service.weibo.com/share/share.php?url=${encodedPath}&title=${encodedTitle}&pic=${encodedIcon}` title=_p('post.share.weibo'))
                            i.solitude.fab.fa-weibo
                    when 'telegram'
-                         a.social-share-ico.icon-telegram(href=`https://t.me/share/url?url=${encodedPath}&text=${encodedTitle}` title=_p('post.share.telegram'))
+                         a.u-syndication.social-share-ico.icon-telegram(href=`https://t.me/share/url?url=${encodedPath}&text=${encodedTitle}` title=_p('post.share.telegram'))
                            i.solitude.fab.fa-telegram
                    when 'whatsapp'
-                         a.social-share-ico.icon-whatsapp(href=`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedPath}` title=_p('post.share.whatsapp'))
+                         a.u-syndication.social-share-ico.icon-whatsapp(href=`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedPath}` title=_p('post.share.whatsapp'))
                            i.solitude.fab.fa-whatsapp
                    when 'linkedin'
-                         a.social-share-ico.icon-linkedin(href=`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPath}&title=${encodedTitle}&summary=${encodedDescription}&source=${encodedTitle}` title=_p('post.share.linkedin'))
+                         a.u-syndication.social-share-ico.icon-linkedin(href=`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPath}&title=${encodedTitle}&summary=${encodedDescription}&source=${encodedTitle}` title=_p('post.share.linkedin'))
                            i.solitude.fab.fa-linkedin
                    when 'facebook'
-                         a.social-share-ico.icon-facebook(href=`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}` title=_p('post.share.facebook'))
+                         a.u-syndication.social-share-ico.icon-facebook(href=`https://www.facebook.com/sharer/sharer.php?u=${encodedPath}` title=_p('post.share.facebook'))
                            i.solitude.fab.fa-facebook
                    when 'twitter'
-                         a.social-share-ico.icon-twitter(href=`https://twitter.com/intent/tweet?url=${encodedPath}&text=${encodedTitle}` title=_p('post.share.twitter'))
+                         a.u-syndication.social-share-ico.icon-twitter(href=`https://twitter.com/intent/tweet?url=${encodedPath}&text=${encodedTitle}` title=_p('post.share.twitter'))
                            i.solitude.fab.fa-twitter
```
两个步骤修改完成之后给博客push上去
然后去 https://indiewebify.me/validate-h-entry/ 这边检测h-card的代码添加情况
提示：Success!We found the following post `h-entry` on your site就成功了


