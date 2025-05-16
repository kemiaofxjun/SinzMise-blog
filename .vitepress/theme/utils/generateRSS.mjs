import { createContentLoader } from "vitepress";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import path,{resolve} from "path";

/**
 * 生成 RSS
 * @param {*} config VitePress buildEnd
 * @param {*} themeConfig 主题配置
 */
export const createRssFile = async (config, themeConfig) => {
  // 配置信息
  const siteMeta = themeConfig.siteMeta;
  const cover = themeConfig.cover;
  const hostLink = siteMeta.site;
  // Feed 实例
  const feed = new Feed({
    title: siteMeta.title,
    description: siteMeta.description,
    id: hostLink,
    link: hostLink,
    language: "zh",
    generator: siteMeta.author.name,
    favicon: siteMeta.logo,
    copyright: `Copyright © 2021-present ${siteMeta.title}`,
    updated: new Date(),
  });
  // 加载文章
  let posts = await createContentLoader("posts/**/*.md", {
    render: true,
  }).load();
  // 日期降序排序
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
  for (const { url, frontmatter } of posts) {
    // 仅保留最近 10 篇文章
    if (feed.items.length >= 10) break;
    // 文章信息
    let { title, description, date } = frontmatter;
    // 处理日期
    if (typeof date === "string") date = new Date(date);
    // 添加文章
    feed.addItem({
      title,
      id: `${hostLink}${url}`,
      link: `${hostLink}${url}`,
      description,
      date,
      // updated,
      author: [
        {
          name: siteMeta.author.name,
          email: siteMeta.author.email,
          link: siteMeta.author.link,
        },
      ],
    });
  }
  // 获取所有页面 
  let pages = await createContentLoader('posts/**/*.md', {
    excerpt: true,
    render: true 
  }).load()

  // 按照日期排序
  pages = pages.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });

  // 过滤隐藏文章
  const filteredPages = pages 
    .filter(page => !page.frontmatter.hidden) 
  
  // RSS、Atom的XSL美化
  const rssContent = feed.rss2() 
    .replace('<?xml version="1.0" encoding="utf-8"?>', 
            '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet type="text/xsl" href="/xsl/rss.xsl"?>') 

  const atomContent = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/xsl/atom.xsl"?> 
  <feed xmlns="http://www.w3.org/2005/Atom">
    <id>${hostLink}</id>
    <title>${siteMeta.title}</title>
    <updated>${new Date().toISOString()}</updated>
    <description>${siteMeta.description}</description>
    <author>
      <name>${siteMeta.author.name}</name>
      <email>${siteMeta.author.email}</email>
      <uri>${siteMeta.author.link}</uri>
    </author>
    <link href="${hostLink}"></link>
    <language>zh-Hans</language>
    <generator uri="https://github.com/SinzMise/blog">Ceta Blog</generator>
    <icon>${hostLink}${siteMeta.logo}</icon>
    <logo>${hostLink}${siteMeta.logo}</logo>
    <rights>Copyright © 2021-${new Date().getFullYear()} ${siteMeta.title}</rights>
    <subtitle>${siteMeta.subtitle}</subtitle>
    ${filteredPages.map(page  => `
    <entry>
      <id>${hostLink}${page.url}</id>
      <title>${page.frontmatter.title}</title>
      <updated>${new Date(page.lastUpdated || page.frontmatter.updated).toISOString()}</updated>
      <author>
        <name>${siteMeta.author.name}</name>
      </author>
      <content type="html">
        <![CDATA[<img src="${page.frontmatter.cover || Array.isArray(cover.showCover.defaultCover) ? cover.showCover.defaultCover[Math.floor(Math.random() * cover.showCover.defaultCover.length)] : false}" /> <p>${page.frontmatter.description ? page.frontmatter.description[Math.floor(Math.random() * page.frontmatter.description)] : `暂无简介` }</p> <a href="${hostLink}${page.url}">点击查看全文</a>]]>
      </content>
      <link href="${hostLink}${page.url}"></link>
      <summary>${page.frontmatter.description || `暂无简介`}</summary>
      <category term="${page.frontmatter.categories}"></category>
      <published>${new Date(page.frontmatter.date || page.lastUpdated).toISOString()}</published>
    </entry>
    `).join('')}
  </feed>` 
  
  // 写入文件
  writeFileSync(path.join(config.outDir, "rss.xml"), rssContent, "utf-8");
  writeFileSync(path.join(config.outDir, "atom.xml"), atomContent, "utf-8");
};
