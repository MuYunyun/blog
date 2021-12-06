(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3160],{73160:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>b});var a=n(59713),r=n.n(a),p=n(6479),l=n.n(p),o=(n(67294),n(3905));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function b(e){var t=e.components,n=l()(e,["components"]);return(0,o.kt)("wrapper",s(s(s({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"前置准备"),(0,o.kt)("p",null,"本系列文章在实现 cpreact 的同时理顺 React 框架的核心内容(JSX/虚拟 DOM/组件/生命周期/diff 算法/setState/PureComponent/HOC/onChange 事件) ",(0,o.kt)("a",s({parentName:"p"},{href:"https://github.com/MuYunyun/cpreact"}),"项目地址")),(0,o.kt)("h3",null,"环境准备"),(0,o.kt)("p",null,"首先安装以下 babel 模块, 其具体作用会在后文 ",(0,o.kt)("a",s({parentName:"p"},{href:"https://github.com/MuYunyun/blog/blob/master/%E4%BB%8E0%E5%88%B01%E5%AE%9E%E7%8E%B0React/1.JSX%E5%92%8C%E8%99%9A%E6%8B%9FDOM.md"}),"JSX 和 虚拟 DOM")," 中提及。"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"扩展延伸: ",(0,o.kt)("a",s({parentName:"p"},{href:"https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E7%95%AA%E5%A4%96%E7%AF%87/babel%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6.md"}),"babel 执行机制"))),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'"@babel/core": "^7.0.0",\n"@babel/preset-env": "^7.0.0",\n"@babel/preset-react": "^7.0.0",\n"babel-loader": "v8.0.0-beta.0",\n')),(0,o.kt)("p",null,"同时 ",(0,o.kt)("inlineCode",{parentName:"p"},".babelrc")," 配置如下:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'{\n  "presets": [\n    [\n      "@babel/preset-env",\n      {\n        "targets": "> 0.25%, not dead",\n        "useBuiltIns": "entry"\n      }\n    ],\n    [\n      "@babel/preset-react", {\n        "pragma": "cpreact.createElement" // 该参数传向 transform-react-jsx 插件, 是前置的一个核心, 后文有解释为什么使用 cpreact.createElement\n      }\n    ]\n  ]\n}\n')),(0,o.kt)("p",null,"配置好 babel 后, 接着提供两套打包工具的配置方案, 读者可以自行选择。"),(0,o.kt)("h4",null,"方案 1: 使用 webpack"),(0,o.kt)("p",null,"webpack 拥有一个活跃的社区, 提供了更为丰富的打包能力。"),(0,o.kt)("p",null,"首先安装以下模块:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{}),'"webpack": "^4.17.2",\n"webpack-cli": "^3.1.0",\n"webpack-dev-server": "^3.1.8"\n')),(0,o.kt)("p",null,"在根目录的 ",(0,o.kt)("inlineCode",{parentName:"p"},"webpack.config.js")," 配置如下:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),"const webpack = require('webpack')\nconst path = require('path')\nconst rootPath = path.resolve(__dirname)\n\nmodule.exports = {\n  entry: path.resolve(rootPath, 'test', 'index.js'),\n  mode: 'development',\n  devtool: 'inline-source-map',\n  devServer: {\n    contentBase: './dist'\n  },\n  output: {\n    filename: 'cpreact.js',\n    path: path.resolve(rootPath, 'dist'),\n    libraryTarget: 'umd'\n  },\n  module: {\n    rules: [{\n      test: /\\.js$/,\n      loader: \"babel-loader\",\n    }]\n  },\n}\n")),(0,o.kt)("p",null,"然后在 ",(0,o.kt)("inlineCode",{parentName:"p"},"package.json")," 里加上如下配置:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{}),'"scripts": {\n  "start": "webpack-dev-server --open",\n},\n')),(0,o.kt)("p",null,"具体可以参照 ",(0,o.kt)("a",s({parentName:"p"},{href:"https://github.com/MuYunyun/cpreact/blob/master/webpack.config.js"}),"0.4.3 版本")),(0,o.kt)("h4",null,"方案 2: 使用 parcel"),(0,o.kt)("p",null,(0,o.kt)("a",s({parentName:"p"},{href:"https://parceljs.org/getting_started.html"}),"parcel")," 是一款上手极快的打包工具, 使用其可以快速地进入项目开发的状态。在 ",(0,o.kt)("inlineCode",{parentName:"p"},"package.json")," 加上如下配置, 具体可以参照 ",(0,o.kt)("a",s({parentName:"p"},{href:"https://github.com/MuYunyun/cpreact/blob/0.1/package.json"}),"0.1 版本")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{}),'"scripts": {\n  "start": "parcel ./index.html --open -p 8080 --no-cache"\n},\n')))}b.isMDXComponent=!0}}]);