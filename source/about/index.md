---
title: 关于本站
date: 2025-02-01 19:28:28
---
框架为[Hexo](https://hexo.io/)
主题基于[Solitude](https://github.com/everfu/hexo-theme-solitude/)魔改，添加了如下功能：

- [IndieWeb](https://indieweb.org/)四件套：[IndieAuth](https://indieauth.com/)、[RelMeAuth](https://indieweb.org/RelMeAuth)、[Microformats](https://microformats.org/)、[Webmention](https://indieweb.org/webmention)
- 自带的音乐播放器换成[岑鬼鬼](https://y.cenguigui.cn/)音乐播放器，并且对此做了右键菜单和右上角控制台按钮适配，也因此修复了hexo-tag-aplayer无法使用的问题
- 右键菜单和右上角控制台添加Live2D按钮（使用的[OhMyLive2D](https://oml2d.hacxy.cn/)）

站点文件存储在Github仓库中，并通过Cloudflare pages、Vercel等部署平台构建

站点采用双线分流，海外走CloudFlare CDN， ~~国内走[云驰互联](https://cloud.zyidc.net/)的CDN~~
2025.02.02由于云驰互联CDN访问出现`failed to query the DNS server: failed to receive reply from UDP server ***: timeout`的情况，目前暂时换成别的CDN

# 建站历程

也是经历了很多故事

第一次搭建站点，是用的Utools自带的内网穿透+html自己车出来的下载站
后面由于特别耗电，只好作罢

第二次搭建是WordPress（后面换成了Z-Blog PHP）+免费虚拟主机
但是当时用的iFastNet的虚拟空间，而且必须一个月登录一次，要不然账号直接没
当时不知道这个规则，后面站点又没了
只好再次作罢

第三次终于找到了比较稳定的虚拟主机，并且认识了Freenom免费域名
也就用Z-Blog PHP再次搭建
结果没过多久虚拟主机商跑路了{% psw 凸显一个惨 %}

第四次是想找免费的虚拟主机商的，结果意外认识了Hexo+Github pages搭建静态博客
我就开始用Hexo了
主题的话刚开始是Next主题，后面换成基于hexo-theme-material-flow魔改的主题
并且给它取了个名字：Hexo Theme SinGO
结果在21年因为Freenom出事+当时我忘记续费Freenom域名导致五个域名全部丢失
导致被迫开新站{% psw 这回终于不是作罢了 %}

第五次就是现在这个了，当时在找主题的过程中意外遇到了Butterfly主题
所以我就用Butterfly了
然而因为我自己的魔改过多导致站点加载特别慢
我就一直想换主题
然后找着找着，突然间发现自己习惯了Butterfly或者基于Butterfly改的主题
于是就换成了Solitude