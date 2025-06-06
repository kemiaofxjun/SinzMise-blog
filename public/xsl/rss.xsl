<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:rss="http://purl.org/rss/1.0/"  xmlns:dc="http://purl.org/dc/elements/1.1/"> 
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <title><xsl:value-of select="rss/channel/title"/> - RSS 订阅</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://cdn.tailwindcss.com"></script> 
        <script>
          tailwind.config  = {
            theme: {
              extend: {
                colors: {
                  primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    500: '#10b981',
                    600: '#059669',
                  }
                }
              }
            }
          }
        </script>
        <style type="text/css">
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .prose a {
            text-decoration: none;
            background-image: linear-gradient(currentColor, currentColor);
            background-position: 0% 100%;
            background-repeat: no-repeat;
            background-size: 0% 1px;
            transition: background-size .3s;
          }
          .prose a:hover {
            background-size: 100% 1px;
          }
        </style>
      </head>
      <body class="bg-gray-50 min-h-screen">
        <div class="max-w-4xl mx-auto px-4 py-12">
          <!-- 头部区域 -->
          <header class="text-center mb-16 fade-in">
            <xsl:if test="rss/channel/image">
              <img src="{rss/channel/image/url}" alt="{rss/channel/image/title}" class="mx-auto h-24 mb-6 rounded-lg shadow-md"/>
            </xsl:if>
            <h1 class="text-4xl font-bold text-gray-900 mb-3">
              <xsl:value-of select="rss/channel/title"/>
            </h1>
            <p class="text-lg text-gray-600 mb-6">
              <xsl:value-of select="rss/channel/description"/>
            </p>
            <div class="flex justify-center space-x-4">
              <a href="{rss/channel/link}" class="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                访问网站
              </a>
              <a href="/rss.xml"  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                原始 RSS
              </a>
            </div>
          </header>

          <!-- 内容列表 -->
          <main class="space-y-10">
            <xsl:for-each select="rss/channel/item">
              <article class="bg-white rounded-xl shadow-md overflow-hidden fade-in" style="animation-delay: {position() * 0.1}s">
                <xsl:if test="contains(description, '&lt;img')">
                  <xsl:variable name="imgSrc" select="substring-before(substring-after(description, 'src=&quot;'), '&quot;')"/>
                  <img src="{$imgSrc}" alt="{title}" class="w-full h-64 object-cover"/>
                </xsl:if>
                <div class="p-6 prose max-w-none">
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    <a href="{link}">
                      <xsl:value-of select="title"/>
                    </a>
                  </h2>
                  <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <span>
                      <xsl:value-of select="substring(pubDate, 1, 16)"/>
                    </span>
                    <xsl:if test="dc:creator">
                      <span>• 作者: <xsl:value-of select="dc:creator"/></span>
                    </xsl:if>
                  </div>
                  <div class="text-gray-700">
                    <xsl:value-of select="description" disable-output-escaping="yes"/>
                  </div>
                  <a href="{link}" class="inline-block mt-4 text-primary-500 hover:text-primary-600 font-medium">
                    阅读全文 →
                  </a>
                </div>
              </article>
            </xsl:for-each>
          </main>

          <!-- 页脚 -->
          <footer class="mt-16 text-center text-gray-500 text-sm fade-in">
            <p>
              最后更新: <xsl:value-of select="substring(rss/channel/lastBuildDate, 1, 16)"/>
            </p>
            <p class="mt-2">
              <xsl:value-of select="rss/channel/copyright"/>
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>