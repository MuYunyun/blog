### Kibana 用户手册

* `搜索数据`
  * 直接输入文本字符串来进行简单文本搜索。`eg: safari`
  * 根据 key:value 进行搜索。`eg: error_msg:200`
  * 可以通过中括号指定范围搜索， [START_VALUE TO END_VALUE]。`error_msg:[200 TO 499]`
  * 您可以通过布尔操作符 AND、OR 和 NOT 来指定更多的搜索条件。例如，搜索状态为 4xx 而且扩展名为 php 或 html 的条目，您可以输入 `error_msg:[200 TO 499] AND (extension:php OR extension:html)`。
* 可视化

* [创建可视化视图](https://www.elastic.co/guide/cn/kibana/current/createvis.html)
