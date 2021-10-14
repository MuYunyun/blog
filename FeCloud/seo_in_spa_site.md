<!--
abbrlink: ettzfags
-->

## SEO 在 SPA 站点中的实践

### 背景

![](http://with.muyunyun.cn/c03d8772da6d57e47c55044aee364103.jpg)

观察基于 [create-react-doc](https://github.com/MuYunyun/create-react-doc) 搭建的[文档站点](http://muyunyun.cn/create-react-doc/), 发现网页代码光秃秃的一片(见下图)。这显然是单页应用 (SPA) 站点的通病 —— 不利于文档被搜索引擎搜索 (SEO)。

![](http://with.muyunyun.cn/0ba88a7544efe0e1978e6c8d8b7775a6.jpg)

难道 SPA 站点就无法进行 SEO 了么, 那么 [Gatsby](https://github.com/gatsbyjs/gatsby)、[nuxt](https://github.com/nuxt/nuxt.js) 等框架又为何能作为不少博主搭建博客的首选方案呢, 此类框架赋能 SEO 的技术原理是什么呢? 在好奇心的驱动下, 笔者尝试对 [creat-react-doc](https://github.com/MuYunyun/create-react-doc) 进行赋能 SEO 之旅。

### 搜索引擎优化

在实践之前, 先从理论上分析为何单页应用不能被搜索引擎搜索到。核心在于 `爬虫蜘蛛在执行爬取的过程中, 不会去执行网页中的 JS 逻辑`, 所以`隐藏在 JS 中的跳转逻辑也不会被执行`。

查看当前 SPA 站点打包后的代码, 除了一个根目录 index.html 外, 其它都是注入的 JS 逻辑, 因此浏览器自然不会对其进行 SEO。

![](http://with.muyunyun.cn/0d15d4e3a62516da7c301e8f1c9228d6.jpg)

此外, 搜索引擎详优化是一门较复杂的学问。如果你对 SEO 优化比较陌生, 建议阅读[搜索引擎优化 (SEO) 新手指南](https://developers.google.com/search/docs/beginner/seo-starter-guide) 一文, Google 搜索中心给出了全面的 **17 个**最佳做法, 以及 **33 个**应避免的做法, 这也是笔者近期在实践的部分。

### SEO 在 SPA 站点中的实践案例

在轻文档站点的背景前提下, 我们暂不考虑 SSR 方案。

对市面上文档站点的 SEO 方案调研后, 笔者总结为如下四类:

* 静态模板渲染方案
* 404 重定向方案
* SSG 方案
* 预渲染方案

#### 静态模板渲染方案

静态模板渲染方案以 [hexo](https://github.com/hexojs/hexo) 最为典型, 此类框架需要指定特定的模板语言(比如 [pug](https://github.com/pugjs/pug))来开发主题, 从而达到网页内容直出的目的。

#### 404 重定向方案

404 重定向方案的原理主要是利用 GitHub Pages 的 404 机制进行重定向。比较典型的案例有 [spa-github-pages](https://github.com/rafgraph/spa-github-pages)、[sghpa](https://github.com/csuwildcat/sghpa)。

但是遗憾的是 2019 年 Google [调整了爬虫算法](https://github.com/rafgraph/spa-github-pages#seo), 因此此类重定向方案在当下是无利于 SEO 的。spa-github-pages 作者也表示如果需要 SEO 的话, 使用 SSG 方案或者付费方案 [Netlify](https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas/)。

![](http://with.muyunyun.cn/bbb5ed8bce1e0c08dae94df98ff33262.jpg)

#### SSG 方案

SSG 方案全称为 static site generator, 中文可译为`路由静态化方案`。社区上 [nuxt](https://github.com/nuxt/nuxt.js)、[Gatsby](https://github.com/gatsbyjs/gatsby)、[docusaurus](https://github.com/facebook/docusaurus) 等框架赋能 SEO 的技术无一例外可以归类此类 SSG 方案。

以 nuxt 框架为例, 在`约定式路由`的基础上, 其通过执行 `nuxt generate` 命令将 vue 文件转化为静态网页。

例子:

```bash
-| pages/
---| about.vue/
---| index.vue/
```

静态化后变成:

```bash
-| dist/
---| about/
-----| index.html
---| index.html
```

经过路由静态化后, 此时的文档目录结构可以托管于任何一个静态站点服务商。

#### 预渲染方案

经过上文对 SSG 方案的分析, 此时 SPA 站点的优化关键已经跃然纸上 —— `静态化路由`。相较于 nuxt、Gatsby 等框架存在约定式路由的限制, [create-react-doc](https://github.com/MuYunyun/create-react-doc) 在目录结构上的组织灵活自由。它的建站理念是`文件即站点`, 同时它对存量 markdown 文档的迁移也十分便捷。

以 [blog](https://github.com/MuYunyun/blog) 项目结构为例, 其文档结构如下:

```bash
-| BasicSkill/
---| basic/
-----| DOM.md
-----| HTML5.md
```

静态化后应该变成:

```bash
-| BasicSkill/
---| basic/
-----| DOM
-------| index.html
-----| HTML5
-------| index.html
```

经过调研, 该构思与 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 预渲染方案一拍即合。预渲染方案的原理可以见如下图:

![](http://with.muyunyun.cn/f3eb18c162a31fb155fd9f4a364f7fb9.jpg)

至此技术选型定下为使用预渲染方案实现 SSG。

### 预渲染方案实践

create-react-doc 在预渲染方案实践的步骤简单概况如下(完整改动可见 [mr](https://github.com/MuYunyun/create-react-doc/pull/95/files)):

* 改造 hash 路由为 history 路由。因为 history 路由结构与文档静态化目录结构天然匹配。

```diff
export default function RouterRoot() {
  return (
-    <HashRouter>
+    <BrowserRouter>
      <RoutersContainer />
-    </HashRouter>
+    </BrowserRouter>
  )
}
```

* 在开发环境、生成环境的基础上新增`预渲染环境`, 同时对路由进行环境匹配。其主要解决了`资源文件`与`主域名下的子路径`的对应关系。过程比较曲折, 感兴趣的同学可以见 [issue](https://github.com/chrisvfritz/prerender-spa-plugin/issues/215#issuecomment-415942268)。

```diff
const ifProd = env === 'prod'
+ const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender
+ const ifAddPrefix = ifProd && !ifPrerender

<Route
  key={item.path}
  exact
-  path={item.path}
+  path={ifAddPrefix ? `/${repo}${item.path}` : item.path}
  render={() => { ... }}
/>
```

* 兼容 prerender-spa-plugin 在 webpack 5 的使用。

官方版本当前未支持 webpack 5, 详见 [issue](https://github.com/chrisvfritz/prerender-spa-plugin/issues/414), 同时笔者存在对预渲染后执行回调的需求。因此当前 fork 了一份[版本](https://github.com/create-react-doc/prerender-spa-plugin) 出来, 解决了以上问题。

经过上述步骤的实践, 终于在 SPA 站点中实现了[静态化路由](https://github.com/MuYunyun/blog/tree/gh-pages)。

![](http://with.muyunyun.cn/bf01633af158d460ca2830ed640e07cb.jpg)

### SEO 优化附加 buff, 站点秒开?

SEO 优化至此, 来看下站点优化前后 FP、FCP、LCP 等指标数据的变化。

以 [blog](https://muyunyun.cn/blog) 站点为例, 优化前后的指标数据如下(数据指标统计来自未使用梯子访问 gh-pages):

优化前: 接入预渲染方案前, 首次绘制(FP、FCP) 的时间节点在 8s 左右, LCP 在 17s 左右。

![](http://with.muyunyun.cn/23d56cc42fd778c23d8ed80331334343.jpg)

优化后: 接入预渲染方案后, 首次绘制时间节点在 `1s` 之内开始, LCP 在 1.5s 之内。

![](http://with.muyunyun.cn/9c551d29943c3d76700782374d86c37b.jpg)

对比优化前后: 首屏绘制速度提升了 `8` 倍, 最大内容绘制速度提升 `11` 倍。本想优化 SEO, 结果站点性能优化的方式又 get 了一个。

### 生成站点地图 Sitemap

在完成预渲染实现站点路由静态化后, 距离 SEO 的目标又近了一步。暂且抛开 [SEO 优化细节](https://developers.google.com/search/docs/beginner/seo-starter-guide), 单刀直入 SEO 核心腹地 [站点地图](https://developers.google.com/search/docs/advanced/sitemaps/overview)。

站点地图 Sitemap 格式与各字段含义简单说明如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<urlset>
  <!-- 必填标签, 这是具体某一个链接的定义入口，每一条数据都要用 <url> 和 </url> 包含在里面, 这是必须的 -->
  <url>
    <!-- 必填, URL 链接地址,长度不得超过 256 字节 -->
    <loc>http://www.yoursite.com/yoursite.html</loc>
    <!-- 可以不提交该标签, 用来指定该链接的最后更新时间 -->
    <lastmod>2021-03-06</lastmod>
    <!-- 可以不提交该标签, 用这个标签告诉此链接可能会出现的更新频率 -->
    <changefreq>daily</changefreq>
    <!-- 可以不提交该标签, 用来指定此链接相对于其他链接的优先权比值，此值定于 0.0-1.0 之间 -->
    <priority>0.8</priority>
  </url>
</urlset>
```

> 上述 sitemap 中, lastmod、changefreq、priority 字段对 SEO 没那么重要, 可以见 [how-to-create-a-sitemap](https://ahrefs.com/blog/zh/how-to-create-a-sitemap/)

根据上述结构, 笔者开发了 create-react-doc 的站点地图生成包 [crd-generator-sitemap](https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-generator-sitemap), 其逻辑就是将预渲染的路由路径拼接成上述格式。

使用方只需在站点根目录的 `config.yml` 添加如下参数便可以在自动化发版过程中自动生成 [sitemap](http://muyunyun.cn/create-react-doc/sitemap.xml)。

```bash
seo:
  google: true
```

将生成的站点地图往 [Google Search Console](https://search.google.com/search-console/sitemaps) 中提交试试吧,

![](http://with.muyunyun.cn/97c21838a1e3310b3c1259e30ab85f3b.jpg)

最后验证下 Google 搜索[站点](https://www.google.com/search?q=site%3Amuyunyun.cn%2Fcreate-react-doc&ie=UTF-8)优化前后效果。

优化前: 只搜索到一条数据。

![](http://with.muyunyun.cn/aea3401e5a31587deb8d93a14f32b011.jpg)

优化后: 搜索到站点地图中声明的位置数据。

![](http://with.muyunyun.cn/6df1536366c7d45e0f6418af03a7d948.jpg)

至此使用 SSG 优化 SPA 站点实现 SEO 的完整流程完整实现了一遍。后续便剩下参照 [搜索引擎优化 (SEO) 新手指南](https://developers.google.com/search/docs/beginner/seo-starter-guide) 做一些 SEO 细节方面的优化以及支持更多搜索引擎了。

### 小结

本文从 SPA 站点实现 SEO 作为切入点, 先后介绍了 SEO 的基本原理, SEO 在 SPA 站点中的 4 种实践案例, 并结合 [create-react-doc](https://github.com/MuYunyun/create-react-doc) SPA 框架进行完整的 SEO 实践。

如果本文对您有所帮助, 欢迎 [star](https://github.com/MuYunyun/create-react-doc)、[反馈](https://github.com/MuYunyun/create-react-doc/issues/new)。

### 相关链接

* [create-react-doc](https://github.com/MuYunyun/create-react-doc)
* [why-is-my-website-not-showing-up-on-google/](https://ahrefs.com/blog/zh/why-is-my-website-not-showing-up-on-google/)
* [A Technical Guide to SEO With Gatsby.js](https://medium.com/frontend-digest/a-technical-guide-to-seo-with-gatsby-js-e88a7dac80f0)
* [优化向：单页应用多路由预渲染指南](https://juejin.cn/post/6844903503362523143)
* [除了 SSR，就没有别的办法了吗？](https://zhuanlan.zhihu.com/p/57375824)
* [基于 SSR/SSG 的前端 SEO 优化](https://segmentfault.com/a/1190000023792497)

## translate

## SEO practice in SPA site

### Background

![](http://with.muyunyun.cn/c03d8772da6d57e47c55044aee364103.jpg)

Observe that [document site](http://muyunyun.cn/create-react-doc/) built based on [create-react-doc](https://github.com/MuYunyun/create-react-doc), I found the webpage code is bare(see the picture below). This is obviously a common problem of single-page application (SPA) sites. It is not conducive to be searched by search engines (SEO).

![](http://with.muyunyun.cn/0ba88a7544efe0e1978e6c8d8b7775a6.jpg)

Isn't it possible that SPA sites can't perform SEO, so what about frameworks such as [Gatsby](https://github.com/gatsbyjs/gatsby), [nuxt](https://github.com/nuxt/nuxt.js) It can be used as the first choice for many bloggers to build blogs. What are the technical principles of such frameworks to empower SEO? Driven by curiosity, I start my journey of empowering SEO in [creat-react-doc](https://github.com/MuYunyun/create-react-doc).

### Search Engine Optimization

Before practice, let's analyze why single-page applications cannot be searched by search engines. The core is that `the crawler spider will not execute the JavaScript logic in the webpage during the crawling process`, so `the jump logic hidden in the JavaScript will not be executed either`.

Check the packaged code of the current SPA site. Except for a root directory index.html, everything else is injected with JavaScript logic, so the browser will naturally not perform SEO on it.

![](http://with.muyunyun.cn/0d15d4e3a62516da7c301e8f1c9228d6.jpg)

In addition, detailed search engine optimization is a more complicated subject. If you are new to SEO optimization, it is recommended to read [Search Engine Optimization (SEO) Beginner's Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide) article, given by Google Search Center. There are a comprehensive list of **17** best practices, and **33** practices that should be avoided.

### Practical case of SEO in SPA site

In the context of the light document site, we do not consider the SSR scheme for the time being.

After investigating the SEO schemes of document sites on the market, the author summarizes the following four categories:

* Static template rendering scheme
* 404 redirection scheme
* SSG plan
* Pre-rendering scheme

#### Static template rendering scheme

 [hexo](https://github.com/hexojs/hexo) is the most typical in the static template rendering scheme. Such frameworks need to specify a specific template language (such as [pug](https://github.com/pugjs/pug )) to develop themes, so as to achieve the purpose of direct output of web content.

#### 404 Redirection Scheme

The principle of the 404 redirect solution is mainly to use the 404 mechanism of GitHub Pages for redirection. Typical cases are [spa-github-pages](https://github.com/rafgraph/spa-github-pages), [sghpa](https://github.com/csuwildcat/sghpa).

But unfortunately, in 2019 Google [adjusted crawler algorithm](https://github.com/rafgraph/spa-github-pages#seo), so this kind of redirection scheme is not conducive to SEO at the moment. The author of spa-github-pages also stated that if SEO is required, use the SSG plan or the paid plan [Netlify](https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas/).

![](http://with.muyunyun.cn/bbb5ed8bce1e0c08dae94df98ff33262.jpg)

#### SSG plan

The full name of the SSG scheme is called `static site generator`. In the community, [nuxt](https://github.com/nuxt/nuxt.js), [Gatsby](https://github.com/gatsbyjs/gatsby) and other framework-enabling SEO technologies can be classified without exception such SSG schemes.

Taking the nuxt framework as an example, based on the `conventional routing`, it converts vue files into static web pages by executing the `nuxt generate` command.

example:

```bash
-| pages/
---| about.vue/
---| index.vue/
```

After being static, it becomes:

```bash
-| dist/
---| about/
-----| index.html
---| index.html
```

After the routing is static, the document directory structure at this time can be hosted by any static site service provider.

#### Pre-rendering scheme

After the above analysis of the SSG scheme, at this time the key to optimization of the SPA site is already on paper —— `static routing`. Compared with frameworks such as nuxt and Gatsby, which have the limitation of conventional routing, [create-react-doc](https://github.com/MuYunyun/create-react-doc) has flexible and free organization in the directory structure. Its website building concept is `File is Site`, and it is also very convenient to migrate existing markdown documents.

Take [blog](https://github.com/MuYunyun/blog) project structure as an example, the document structure is as follows:

```bash
-| BasicSkill/
---| basic/
-----| DOM.md
-----| HTML5.md
```

It should become:

```bash
-| BasicSkill/
---| basic/
-----| DOM
-------| index.html
-----| HTML5
-------| index.html
```

After investigation, the idea and the [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) pre-rendering solution hit it off. The principle of the pre-rendering scheme can be seen in the following figure:

![](http://with.muyunyun.cn/f3eb18c162a31fb155fd9f4a364f7fb9.jpg)

So far, the technology selection is determined to use the pre-rendering scheme to achieve SSG.

### Pre-rendering program practice

A brief overview of the steps of create-react-doc's practice in the pre-rendering solution is as follows (for complete changes, see [mr](https://github.com/MuYunyun/create-react-doc/pull/95/files)):

* Transform hash routing to history routing. Because the history routing structure naturally matches the document static directory structure.

```diff
export default function RouterRoot() {
  return (
-<HashRouter>
+ <BrowserRouter>
      <RoutersContainer />
-</HashRouter>
+ </BrowserRouter>
  )
}
```

* Added `pre-rendering environment` on the basis of development environment and generation environment, and matched the routing environment at the same time. It mainly solves the correspondence between `resource files` and `sub-paths under the main domain name`. The process is tortuous, and interested friends can see [issue](https://github.com/chrisvfritz/prerender-spa-plugin/issues/215#issuecomment-415942268).

```diff
const ifProd = env ==='prod'
+ const ifPrerender = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerender
+ const ifAddPrefix = ifProd && !ifPrerender

<Route
  key={item.path}
  exact
-path={item.path}
+ path={ifAddPrefix? `/${repo}${item.path}`: item.path}
  render={() => {... }}
/>
```

* Compatible with the use of prerender-spa-plugin in webpack 5.

The official version currently does not support webpack 5, see [issue](https://github.com/chrisvfritz/prerender-spa-plugin/issues/414) for details, and I have a need to execute callbacks after pre-rendering. Therefore, a copy of [version](https://github.com/create-react-doc/prerender-spa-plugin) is currently forked, which solves the above problems.

After the practice of the above steps, [static routing](https://github.com/MuYunyun/blog/tree/gh-pages) is finally implemented in the SPA site.

![](http://with.muyunyun.cn/bf01633af158d460ca2830ed640e07cb.jpg)

### SEO optimization with additional buff, the site opens in seconds?

SEO optimization so far, let's look at the changes in `FP`, `FCP`, `LCP` and other indicator data before and after site optimization.

Taking the [blog](https://muyunyun.cn/blog) site as an example, the index data before and after optimization is as follows:

Before optimization: Before accessing the pre-rendering scheme, the time node for the first drawing (FP, FCP) is about `8s`, and the LCP is about 17s.

![](http://with.muyunyun.cn/23d56cc42fd778c23d8ed80331334343.jpg)

After optimization: After accessing the pre-rendering scheme, the first drawing time node starts within `1s`, and the LCP is within 1.5s.

![](http://with.muyunyun.cn/9c551d29943c3d76700782374d86c37b.jpg)

Comparing the optimization between before and after: the first screen drawing speed has been increased by `8` times, and the maximum content drawing speed has been increased by `11` times. I wanted to optimize SEO, but I got another way to optimize site performance.

### Generate Sitemap Sitemap

After finishing the pre-rendering and realizing the static routing of the site, it is one step closer to the goal of SEO. Putting aside [SEO optimization details](https://developers.google.com/search/docs/beginner/seo-starter-guide) for the time being, go straight to the core hinterland of SEO [site map](https://developers.google.com/search/docs/advanced/sitemaps/overview).

The format of Sitemap and the meaning of each field are briefly explained as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<urlset>
  <!-- Required tag, this is the definition entry of a specific link, each piece of data must be included with <url> and </url>, this is required -->
  <url>
    <!-- Required, URL link address, length must not exceed 256 bytes -->
    <loc>http://www.yoursite.com/yoursite.html</loc>
    <!-- You don't need to submit the tag, which is used to specify the last update time of the link -->
    <lastmod>2021-03-06</lastmod>
    <!-- You don't need to submit the tag, use this tag to tell the update frequency of this link -->
    <changefreq>daily</changefreq>
    <!-- You don’t need to submit the tag, which is used to specify the priority ratio of this link to other links. This value is set between 0.0-1.0 -->
    <priority>0.8</priority>
  </url>
</urlset>
```

> In the above sitemap, the lastmod, changefreq, and priority fields are not so important for SEO, see [how-to-create-a-sitemap](https://ahrefs.com/blog/zh/how-to-create-a -sitemap/)

According to the above structure, I developed the sitemap generation package [crd-generator-sitemap](https://github.com/MuYunyun/create-react-doc/tree/main/packages/crd-generator-sitemap), the logic is to splice the pre-rendered routing path into the above format.

The user only needs to add the following parameters in the site root directory `config.yml` to automatically generate [sitemap](http://muyunyun.cn/create-react-doc/sitemap.xml) during the automatic release process.

```bash
seo:
  google: true
```

Submit the generated sitemap to [Google Search Console](https://search.google.com/search-console/sitemaps) for a try,

![](http://with.muyunyun.cn/97c21838a1e3310b3c1259e30ab85f3b.jpg)

Finally, verify the before and after optimization of Google search [site](https://www.google.com/search?q=site%3Amuyunyun.cn%2Fcreate-react-doc&ie=UTF-8).

Before optimization: Only one piece of data is found.

![](http://with.muyunyun.cn/aea3401e5a31587deb8d93a14f32b011.jpg)

After optimization: Search the location data declared in the site map.

![](http://with.muyunyun.cn/6df1536366c7d45e0f6418af03a7d948.jpg)

So far, the complete process of using SSG to optimize SPA sites to achieve SEO has been fully realized. Follow-up is left to refer to the [Search Engine Optimization (SEO) Beginner's Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide) to optimize some SEO details and support more searches The engine is up.

### Summary

This article starts with the realization of SEO on the SPA site, and successively introduces the basic principles of SEO, four practical cases of SEO in the SPA site, combined with [create-react-doc](https://github.com/MuYunyun/create-react-doc) SPA framework for complete SEO practice.

If this article is helpful to you, welcome [star](https://github.com/MuYunyun/create-react-doc), [feedback](https://github.com/MuYunyun/create-react-doc/issues/new).

### Related Links

* [create-react-doc](https://github.com/MuYunyun/create-react-doc)
* [why-is-my-website-not-showing-up-on-google/](https://ahrefs.com/blog/zh/why-is-my-website-not-showing-up-on- google/)
* [A Technical Guide to SEO With Gatsby.js](https://medium.com/frontend-digest/a-technical-guide-to-seo-with-gatsby-js-e88a7dac80f0)