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
对IndieWeb的适配分为四个部分：IndieAuth、RelMeAuth和Microformats
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
{% tip warning %}
如果你用的是静态博客，那么在去登录之前你必须要给博客push上去！要不然提示找不到rel=me标签！
{% endtip %}
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
+             a.h-card.p-author(href=url_for("/") rel="author" style='display:none')= config.author
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

# 可选添加
如果你做完前面这三个步骤，恭喜你，你的站点已经适配IndieWeb了
适配完IndieWeb之后就可以选择加入IndieWeb webring或者添加WebMention（也就是我那评论下面的网络回响）
## WebMention （可选）
[官方介绍](https://indieweb.org/Webmention)（翻译后）：

[Webmention](https://www.w3.org/TR/webmention/) 是一种用于跨 Web 对话和交互的开放 Web 标准（[W3C](https://indieweb.org/W3C) 推荐标准），是一个强大的构建块，用于不断增长的分布式网络，该网络包含跨 Web 的点对点[评论](https://indieweb.org/comment)、[点赞](https://indieweb.org/like)、[转发](https://indieweb.org/repost)和其他[响应](https://indieweb.org/responses)。

### 登录WebMention，获取两段link
前往 https://webmention.io/ 登录你的网站
登录之后点击最上方的Setting，按照图片的来
![按照图片来](https://images1.blog.sinzmise.top/azurlane/msedge_nK204ZgG2B.avif)
然后点击最上方的Sites，新增一个网站，新增完成之后点击你新增站点的“Get Setup Code”获取代码
![获取到的代码在这](https://images1.blog.sinzmise.top/azurlane/image.avif)
把这个地方的`<link>`代码也给复制到`</head>`前面

然后，去 https://webmention.rocks/receive/2 检验你的代码是否安装成功
如果提示这个就代表成功了：
![成功的提示](https://images1.blog.sinzmise.top/azurlane/msedge_BTNfmkpumY.avif)

### 添加 网络回响 功能
这个获取Mention的js代码是基于别人的方案而改来
在此基础上适配了pjax
{% tabs WebMention %}
<!-- tab Solitude主题 -->
新增`[Blogroot]\themes\solitude\layout\includes\widgets\third-party\webmention.pug`，内容如下：
```pug
hr
#post-comment
  .comment-head
    .comment-headline
      i.fas.fa-comments.fa-fw
      span= ' ' + _p('webmention.webmention')

  .comment-wrap
    p!= _p('webmention.title')
    br
    form.form-webmention(action=url_for(theme.indieweb.webmention.endpoint) method="post" target="_blank")
      input#form-webmention-source(name="source" placeholder=_p('webmention.placeholder') required="" type="url")
      input(name="target" type="hidden" value=urlNoIndex())
      input.form-webmention-btn(type="submit" value="Send Webmention")
    .webmention-timeline
```
修改`[Blogroot]\themes\solitude\layout\post.pug`
给这个功能加在comment下面
```diff
            if page.comment
                - var comment_js = true
                include includes/widgets/third-party/comments/comment
+             if theme.indieweb.enable && theme.indieweb.webmention.enable && page.webmention !== false
+                 !=partial('includes/widgets/third-party/webmention', {}, {cache: true})   
```
引入css代码：
```css
.wm-avatar {
  border-radius: 50%;
  margin: 0;
}
.webmention-avatars .avatar-wrapper {
  margin-right: -8px;
}
a.avatar-wrapper {
  display: inline-block;
  width: 50px;
  height: 50px;
  position: relative;
}
.replies {
  margin: 0;
  padding: 0;
}
.reply {
  list-style: none;
  display: flex;
  position: relative;
  padding: 0;
  align-items: flex-start;
  margin-top: 0.6rem;
}
.reply p {
  margin: 0;
}
.reply .text {
  margin-left: 1rem;
  font-size: 14px;
}
.reply-author-name {
  font-weight: 500;
}
.form-webmention {
  display: flex;
}
.form-webmention-btn {
  flex: 0 0 auto;
  margin-left: 12px;
  align-items: baseline;
  border: 0;
  cursor: pointer;
}
.form-webmention-btn,
a.retweetBtn {
  display: flex;
  justify-content: center;
  padding: 0 12px;
  background: var(--anzhiyu-reverse);
  color: var(--efu-secondbg);
}
#form-webmention-source {
  flex: 1 0 auto;
  border: 1px solid;
  padding: 0 8px;
  background: var(--efu-secondbg);
  border: var(--style-border-always);
}
#form-webmention-source,
.form-webmention-btn,
a.retweetBtn {
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  border-radius: 8px;
}
```
引入js代码：
```js
function webmention() {
    const url = window.location.href;
    const webmentionBaseUrl = "https://webmention.io"
    fetch(webmentionBaseUrl + "/api/mentions.jf2?target=" + encodeURIComponent(url))
        .then(function (response) {
            console.log('sucess '  + webmentionBaseUrl + "/api/mentions.jf2?target=" + url);
            return response.json();
        })
        .then(function (data) {
            var html = '';
            const distinctMentions = [
                ...new Map(data.children.map((item) => [item.author.url, item])).values()].sort((a, b) => new Date(a['wm-received']) - new Date(b['wm-received']));

            html += `<div><p>`;

            if (distinctMentions.length > 0) {
                html += `${GLOBAL_CONFIG.lang.webmention.likes.replace(/\$\{distinctMentions}/, distinctMentions.length)}</p>`;
            }
            html += `<div className="webmention-avatars">`;
            distinctMentions.forEach(function (reply) {
                html += `<a class="avatar-wrapper" href=${reply.author.url} key=${reply.author.name}><image class="wm-avatar" loading="lazy" src=${reply.author.photo != "" ? reply.author.photo: "/img/avatar.png"} data-nimg="fill" sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"/></a>`;
            });
            html += `</div>`;

            const replies = distinctMentions.filter(
                (mention) => ('in-reply-to' in mention || 'mention-of' in mention)&& 'content' in mention
            );
            if (replies && replies.length) {
                html +=  `<div class="webmention-replies">`;
                html += `</br><h3>${GLOBAL_CONFIG.lang.webmention.comment.replace(/\$\{replies}/, replies.length)}</h3>`;
                html += `<ul class="replies">`;
                replies.forEach(function (reply){
                    html += `<li class="reply" key=${reply["wm-id"]}>`;
                    html += `<div>`;
                    html += `<a class="avatar-wrapper" href=${reply.author.url} key=${reply.author.name}><image class="wm-avatar" loading="lazy" src=${reply.author.photo != "" ? reply.author.photo: "/img/avatar.png"} alt=${reply.author.name} data-nimg="fill" sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"/></a>`;
                    html += `</div>`;
                    html += `<div class="text">`;
                    html += `<p class="reply-author-name"><a href=${reply.url} target="_blank">${reply.author.name}</a></p>`;
                    html += `<p class="reply-content">${reply.content.text.slice(0, 200)}</p>`;
                    html += `</div>`;
                    html += `</li>`;

                });
                html += `</ul>`;
                html += `</div>`;
            }
            document.querySelector('div.webmention-timeline').innerHTML = html;
        })
        .catch(function (ex) {
            console.error('fetch webmention error' + ex);
        });
}
window.WebMentionLoad = function () {
	if (document.querySelector('.webmention-timeline')) webmention();
};
window.addEventListener("load", WebMentionLoad)
document.addEventListener("pjax:complete", WebMentionLoad)
```
如果还不知道怎么引入js和css代码的话看这个：
https://blog.leonus.cn/2022/custom.html
https://akilar.top/posts/ebf20e02/#%E9%AD%94%E6%94%B9%E6%A0%B7%E5%BC%8F%E5%BC%95%E5%85%A5
{% tip warning %}
Butterfly主题的inject，对应的是Solitude主题的extends，别看错！
{% endtip %}
<!-- endtab -->

<!-- tab Butterfly主题 -->
还没写完
<!-- endtab -->
{% endtabs %}
