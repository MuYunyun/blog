// default config is writen in config.yml
// and some dynamic function config to write in this config.js

// used with crd-leetcode-cli.
const transform_markdown_table = (dataArr) => {
  let result =
    '| # | Title | Explanation | Difficulty | Type |' +
    '\n' +
    '|:---:|:---:|:---:|:---:|:---:|';

  for (let i = 0; i < dataArr.length; i++) {
    result += `\n| ${dataArr[i].questionId} | [${dataArr[i].title
      }](https://leetcode.com/problems/${dataArr[i].titleSlug
      }/) | [Analyze](https://github.com/MuYunyun/blog/blob/master/LeetCode/${dataArr[i].questionId
      }.${dataArr[i].title.split(' ').join('_')}.md) | ${dataArr[i].difficulty
      } | ${dataArr[i].topicTags} |`;
  }
  return result;
};

export { transform_markdown_table }
