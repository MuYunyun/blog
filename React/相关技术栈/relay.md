### Relay

It's not just a `GraghQL client` but also a framework for `declarative data-fetching`.

### Fetching Data

Using REST API:

```js
// Fetch the list of story IDs but not their details:
rest.get('/stories').then(stories =>
  // This resolves to a list of items with linked resources:
  // `[ { href: "http://.../story/1" }, ... ]`
  Promise.all(stories.map(story =>
    rest.get(story.href) // Follow the links
  ))
).then(stories => {
  // This resolves to a list of story items:
  // `[ { id: "...", text: "..." } ]`
  console.log(stories);
});
```

请求接口次数为 `n + 1`;

```js
graphql.get(`query { stories { id, text } }`).then(
  stories => {
    // A list of story items:
    // `[ { id: "...", text: "..." } ]`
    console.log(stories);
  }
);
```

### links

* [Relay document](https://relay.dev/docs/en/experimental/step-by-step)
  * [step-by-step](https://relay.dev/docs/en/experimental/step-by-step): done
  * [Thinking in GraghQL](https://relay.dev/docs/en/thinking-in-graphql): to read
  * [Thinking in Relay](https://relay.dev/docs/en/thinking-in-relay): to read
* [relay-examples](https://github.com/relayjs/relay-examples/tree/master/issue-tracker)
* [suspense-experimental](https://github.com/gaearon/suspense-experimental-github-demo)