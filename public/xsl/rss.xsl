<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:rss="http://purl.org/rss/1.0/"  xmlns:dc="http://purl.org/dc/elements/1.1/"  xmlns:content="http://purl.org/rss/1.0/modules/content/"> 
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <title>
          <xsl:value-of select="rss/channel/title"/> - RSS Feed 
        </title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"/> 
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
          }
          .header h1 {
            margin-bottom: 10px;
          }
          .header p {
            color: #666;
            margin-top: 0;
          }
          .header img {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
          }
          .entry {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .entry h2 {
            margin-bottom: 5px;
          }
          .entry h2 a {
            color: #0066cc;
            text-decoration: none;
          }
          .entry h2 a:hover {
            text-decoration: underline;
          }
          .entry-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
          }
          .entry-content {
            margin-top: 15px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 0.9em;
          }
          .feed-link {
            display: inline-block;
            margin-top: 20px;
            padding: 8px 15px;
            background: #f0f0f0;
            border-radius: 4px;
            text-decoration: none;
            color: #333;
          }
          .date {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <xsl:if test="rss/channel/image">
            <img src="{rss/channel/image/url}" alt="{rss/channel/image/title}"/>
          </xsl:if>
          <h1>
            <xsl:value-of select="rss/channel/title"/>
          </h1>
          <p>
            <xsl:value-of select="rss/channel/description"/>
          </p>
          <a href="{rss/channel/link}" class="feed-link">访问网站</a>
          <a href="/rss.xml"  class="feed-link">原始 RSS Feed</a>
        </div>
        
        <xsl:for-each select="rss/channel/item">
          <div class="entry">
            <h2>
              <a href="{link}">
                <xsl:value-of select="title"/>
              </a>
            </h2>
            <div class="entry-meta">
              <span class="date">
                <xsl:value-of select="substring(pubDate, 1, 16)"/>
              </span>
              <xsl:if test="dc:creator">
                <span> • 作者: <xsl:value-of select="dc:creator"/></span>
              </xsl:if>
            </div>
            <div class="entry-content">
              <xsl:value-of select="description" disable-output-escaping="yes"/>
            </div>
            <xsl:if test="content:encoded">
              <div class="entry-content">
                <xsl:value-of select="content:encoded" disable-output-escaping="yes"/>
              </div>
            </xsl:if>
          </div>
        </xsl:for-each>
        
        <div class="footer">
          <p>
            版权 © <xsl:value-of select="rss/channel/copyright"/>
            • 最后更新: <xsl:value-of select="substring(rss/channel/lastBuildDate, 1, 16)"/>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>