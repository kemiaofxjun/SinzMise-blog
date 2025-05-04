<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" indent="yes" />

  <xsl:template match="/">
    <html lang="{atom:feed/atom:language}">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title><xsl:value-of select="atom:feed/atom:title" /></title>
      <link rel="stylesheet" href="/css/xsl/atom.css" />
      <link rel="icon" href="{atom:feed/atom:icon}" />
    </head>

    <body>
      <header>
        <div class="logo-header">
          <img class="logo" src="{atom:feed/atom:logo}" alt="" />
          <h1 class="title"><xsl:value-of select="atom:feed/atom:title" /></h1>
          <div class="subtitle"><xsl:value-of select="atom:feed/atom:subtitle" /></div>
        </div>
        <!-- <div class="description"><xsl:value-of select="atom:feed/atom:description" /></div> -->
        <div class="header-subscribe">
          <p>
            不要诧异于异常精美的页面，你可以直接使用 RSS 阅读器比如：
            <a href="https://feedly.com/i/subscription/feed/{atom:feed/atom:id}" target="_blank" rel="noopener noreferrer">Feedly</a>,
            <a href="https://www.inoreader.com/feed/{atom:feed/atom:id}" target="_blank" rel="noopener noreferrer">Inoreader</a>,
            <a href="https://www.newsblur.com/?url={atom:feed/atom:id}" target="_blank" rel="noopener noreferrer">Newsblur</a>,
            <a href="follow://add?url={atom:feed/atom:id}" rel="noopener noreferrer">Follow</a> 或者
            <a href="feed:{atom:feed/atom:id}" rel="noopener noreferrer">RSS Reader</a> 等工具，来订阅这个 RSS 源链接。
          </p>
        </div>
      </header>

      <main>
        <xsl:apply-templates select="atom:feed/atom:entry" />
      </main>

      <footer>
        <xsl:value-of select="atom:feed/atom:rights" />
        <br />
        由 <xsl:value-of select="atom:feed/atom:generator" /> 生成
        <br />
        最近更新：<xsl:value-of select="atom:feed/atom:updated" />
      </footer>
    </body>

    </html>
  </xsl:template>

  <xsl:template match="atom:entry">
    <a href="{atom:link/@href}" class="entry">
      <xsl:variable name="img-src"
        select="substring-before(substring-after(substring-after(atom:content, '&lt;img'), 'src=&quot;'), '&quot;')" />
      <xsl:if test="$img-src">
        <img class="entry-image" src="{$img-src}" alt="{atom:title}" loading="lazy" />
      </xsl:if>

      <article>
        <h2 class="entry-title">
          <xsl:value-of select="atom:title" />
        </h2>

        <xsl:if test="atom:summary">
          <div class="entry-summary">
            <xsl:value-of select="atom:summary" />
          </div>
        </xsl:if>

        <div class="entry-meta">
          <xsl:variable name="published-date" select="substring(atom:published, 1, 10)" />
          发布于 <xsl:value-of select="$published-date" />

          <xsl:if test="atom:updated and atom:updated != atom:published">
            <xsl:text> • 更新于 </xsl:text>
            <xsl:value-of select="substring(atom:updated, 1, 10)" />
          </xsl:if>

          <xsl:if test="atom:category">
            <xsl:text> • </xsl:text>
            <xsl:for-each select="atom:category">
              <xsl:value-of select="@term" />
            </xsl:for-each>
          </xsl:if>
        </div>
      </article>
    </a>

  </xsl:template>

</xsl:stylesheet>