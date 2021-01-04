### 关系型数据库

使用多个表格管理的数据库。

### 创建数据库

```js
CREATE DATABASE 数据库名;
```

### 删除数据库

```js
DROP DATABASE 数据库名;
```

### 数据库类型

数据库类型分为数字类型、时间类型、字符串类型。

|    类型     |       用途       |     格式     |
| :---------: | :--------------: | :----------: |
| INT(INEGER) |     大整数值     |              |
|    FLOAT    |      单精度      |              |
|    DATE     |      日期值      | 'YYYY-MM-DD' |
|    TIME     | 时间值或持续时间 |  'HH:MM:SS'  |
|    YEAR     |      年份值      |    'YYYY'    |
|  DATETIME   | 混合日期和时间值 | 'YYYY-MM-DD' |
|   VARCHAR   |    变长字符串    |              |

### 创建数据表

```js
CREATE TABLE table_name (column_name column_type);
```

### 删除数据表

```js
DROP TABLE table_name;
```

### 插入数据

```js
INSERT INTO table_name ( field1, field2, ...fieldN ) VALUES ( value1, value2, ...valueN )
```

### 查询数据

```js
SELECT field1,field2
FROM table_name1, table_name2
[WHERE condition1 [AND [OR]] condition2
[GROUP BY]
[HAVING]
[ORDER BY]
[LIMIT N][OFFSET M]
```

* `FROM`: 可以从多个 table 中进行查询
* `WHERE`
  * WHERE 相当于编程语言中的 if。
  * 可以使用在 SELECT、UPDATE、DELETE 语句中。
  * 可以使用 AND 或者 OR 指定一个或多个条件。
  * 操作符有 `=`、`>`、`<`、`>=`、`<=`、`!= or <>`、`IS NULL`、`IS NOT NULL`
  * `Like`: 类似于 `=`, SQL 提供了四种匹配方式。
    * `%`: 表示任意 0 个或多个字符。可匹配任意类型和长度的字符, 有些情况下若是中文, 请使用两个百分号（%%）表示。
      * eg: 查询包含 javascript 字段的信息: `SELECT * FROM position WHERE name LIKE '%java%';`
    * `_`: 表示任意单个字符。匹配单个任意字符, 它常用来限制表达式的字符长度语句。
    * []: 表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围, 要求所匹配对象为它们中的任一个。
    * [^]: 表示不在括号所列之内的单个字符。其取值和 [] 相同, 但它要求所匹配对象为指定字符以外的任一个字符。
    查询内容包含通配符时,由于通配符的缘故, 导致我们查询特殊字符 “%”、“_”、“[” 的语句无法正常实现, 而把特殊字符用 “[ ]” 括起便可正常查询。
  * `REGEXP`: 可以使用正则进行筛选。
    * eg: `SELECT name FROM person_tbl WHERE name REGEXP '^st';`
* `GROUP BY`: 对 SELECT 查询出来的结果集按照某个字段或者表达式进行分组，获得一组组的集合。
  * `WITH ROLLUP`: 可以实现在分组统计数据基础上再进行相同的统计 (SUM, AVG, COUNT 等)。
    * ![](http://with.muyunyun.cn/1d8a95a812f6ffc91d6f5a357fe9755c.jpg)
  * `coalesce`: 针对上图 null 处, 可以使用 coalesce(a,b,c) 语法, 其等价于 JavaScript 中 `a || b || c || null`
    * ![](http://with.muyunyun.cn/8530fc78779c7024f41053a51c160196.jpg)
* `HAVING`: 用于对 WHERE 和 GROUP BY 查询出来的分组经行过滤，查出满足条件的分组结果。(场景使用存疑: 后续有场景进行补充)
* `ORDER BY`:
  * 可设置多个字段来排序: `ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]`;
  * 可设置 `ASD`(ascending) 或 `DESD`(descending) 来表示升序或降序, 默认 ascending。
  * 拼音场景: 如果字符集采用的是 utf8(万国码)而非 gbk，需要先对字段进行转为 gbk 码然后排序:
    * `ORDER BY CONVERT(title using gbk);`
* `LIMIT`: 可以设置查询返回条数
* `OFFSET`: 可以设置起始查询条数
* `limit N,M`: 相当于 LIMIT M OFFSET N , 从第 N 条记录开始, 返回 M 条记录

### UPDATE

```js
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE CLAUSE]
```

### DELETE

```js
DELETE FROM table_name
[WHERE CLAUSE]
```

### UNION

UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。

```js
SELECT field1,field2
FROM table_name1, table_name2
[WHERE condition1 [AND [OR]] condition2
UNION [ALL | DISTINCT]
```

* `DISTINCT`: 默认值, 表示多个 SELECT 语句会删除重复的数据。
* `All`: 表示多个 SELECT 语句不会删除重复的数据。

### 连接的使用

真正的应用中经常需要从多个数据表中读取数据。此时可以使用 JOIN 在两个或多个表中读取数据。

* INNER JOIN (内连接)
  * ![](http://with.muyunyun.cn/b6fb7c5a37b37586b7c36f7b524294bd.jpg)
  * `SELECT field1,field2 FROM table_name1 INNER JOIN table_name2 ON condition;`
* LEFT JOIN (左连接)
  * ![](http://with.muyunyun.cn/52e7cfa17e2c2ff5983a2ba3c6f3eb8e.jpg)
  * `SELECT field1,field2 FROM table_name1 LEFT JOIN ttable_name2 ON condition;`
* RIGHT JOIN (右连接)
  * ![](http://with.muyunyun.cn/d79d96273e72c6c308ba8744b507f562.jpg)
  * `SELECT field1,field2 FROM table_name1 RIGHT JOIN table_name2 ON condition;`

### 事务

事务主要用于处理操作量大，复杂度高的数据。笔者认为事务就像数据库语句中引入 git 操作。

* MySQL 中使用了 Innodb 引擎的数据库或表支持事务;
* 事务用来管理 insert、update、delete 语句;

MYSQL 事务控制语句

* BEGIN: 开始一个事务
* ROLLBACK: 事务回滚
* COMMIT: 事务确认

### ALTER

修改表名或者修改表字段就要使用 ALTER 命令。

* 删除表字段
  * DROP: `ALTER TABLE testalter_tbl DROP i;`
* 添加表字段
  * ADD: `ALTER TABLE testalter_tbl ADD i INT;`
* 修改表字段类型及名称
  * MODIFY: `alter table tableName modify name1 type1 first|after name2;`
    * name1 为想要修改的字段
    * type1 为该字段原来类型
    * first 与 after 二选一, first 放在第一位, after 放在 name2 字段后面
  * CHANGE: `ALTER TABLE testalter_tbl CHANGE i j BIGINT;`
    * 将 i 字段重命名为 j 字段

### 索引

空间换时间。使用索引可以加快数据库内部找寻数据的速度。

* 创建索引
  * `CREATE INDEX indexName ON table_name (column_name)`
* 删除索引
  * `DROP INDEX [indexName] ON mytable;`

### SQL 注入

线上应用应该注意防范 SQL 注入。