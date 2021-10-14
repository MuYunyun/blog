<!--
abbrlink: fieex7n3
-->

### xss(cross site script)

* 内容型 xss: 后端返回前端的模板内容里掺杂脚本
* 反射型 xss: url 里带有脚本
* dom xss: 脚本通过 dom api 插入页面

防止措施: 正则过滤

### csrf(cross site request forgery)

防止措施: 校验 token