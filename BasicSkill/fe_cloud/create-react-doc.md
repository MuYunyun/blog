### How to get an updated time

* GraghQL API
  * https://developer.github.com/v4/explorer/
```js
input:
{
  repository(owner: "MuYunyun", name: "blog") {
    ref(qualifiedName: "refs/heads/master") {
      target {
        ... on Commit {
          history(first: 1, path: "package.json") {
            edges {
              node {
                committedDate
              }
            }
          }
        }
      }
    }
  }
}

return:
{
  "data": {
    "repository": {
      "ref": {
        "target": {
          "history": {
            "edges": [
              {
                "node": {
                  "committedDate": "2020-06-12T10:53:12Z"
                }
              }
            ]
          }
        }
      }
    }
  }
}
```