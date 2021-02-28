### Sitemap

XML 格式如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<urlset>
  <!-- 必填标签, 这是具体某一个链接的定义入口，每一条数据都要用 <url> 和 </url> 包含在里面, 这是必须的 -->
  <url>
    <!-- 必填, URL 链接地址,长度不得超过 256 字节 -->
    <loc>http://www.yoursite.com/yoursite.html</loc>
    <!-- 可以不提交该标签, 用来指定该链接的最后更新时间 -->
    <lastmod>2009-12-14</lastmod>
    <!-- 可以不提交该标签, 用这个标签告诉此链接可能会出现的更新频率 -->
    <changefreq>daily</changefreq>
    <!-- 可以不提交该标签, 用来指定此链接相对于其他链接的优先权比值，此值定于 0.0-1.0 之间 -->
    <priority>0.8</priority>
  </url>
</urlset>
```

- [google:how-to-create-a-sitemap](https://ahrefs.com/blog/zh/how-to-create-a-sitemap/)