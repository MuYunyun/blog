(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5009],{55009:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>c});var r=n(59713),a=n.n(r),s=n(6479),l=n.n(s),i=(n(67294),n(3905));function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function c(e){var t=e.components,n=l()(e,["components"]);return(0,i.kt)("wrapper",p(p(p({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",null,"Relay"),(0,i.kt)("p",null,"It's not just a ",(0,i.kt)("inlineCode",{parentName:"p"},"GraghQL client")," but also a framework for ",(0,i.kt)("inlineCode",{parentName:"p"},"declarative data-fetching"),"."),(0,i.kt)("h3",null,"Fetching Data"),(0,i.kt)("p",null,"Using REST API:"),(0,i.kt)("pre",null,(0,i.kt)("code",p({parentName:"pre"},{className:"language-js"}),'// Fetch the list of story IDs but not their details:\nrest.get(\'/stories\').then(stories =>\n  // This resolves to a list of items with linked resources:\n  // `[ { href: "http://.../story/1" }, ... ]`\n  Promise.all(stories.map(story =>\n    rest.get(story.href) // Follow the links\n  ))\n).then(stories => {\n  // This resolves to a list of story items:\n  // `[ { id: "...", text: "..." } ]`\n  console.log(stories);\n});\n')),(0,i.kt)("p",null,"请求接口次数为 ",(0,i.kt)("inlineCode",{parentName:"p"},"n + 1"),";"),(0,i.kt)("pre",null,(0,i.kt)("code",p({parentName:"pre"},{className:"language-js"}),'graphql.get(`query { stories { id, text } }`).then(\n  stories => {\n    // A list of story items:\n    // `[ { id: "...", text: "..." } ]`\n    console.log(stories);\n  }\n);\n')),(0,i.kt)("h3",null,"links"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://relay.dev/docs/en/experimental/step-by-step"}),"Relay document"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://relay.dev/docs/en/experimental/step-by-step"}),"step-by-step"),": done"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://relay.dev/docs/en/thinking-in-graphql"}),"Thinking in GraghQL"),": to read"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://relay.dev/docs/en/thinking-in-relay"}),"Thinking in Relay"),": to read"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://github.com/relayjs/relay-examples/tree/master/issue-tracker"}),"relay-examples")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",p({parentName:"li"},{href:"https://github.com/gaearon/suspense-experimental-github-demo"}),"suspense-experimental"))))}c.isMDXComponent=!0}}]);