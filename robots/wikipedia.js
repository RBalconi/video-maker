const superAgent = require("superagent");

async function Wikipedia(content) {
  try {
    const response = await superAgent
      .get("https://pt.wikipedia.org/w/api.php")
      .query({
        action: "query",
        prop: "extracts|images|links|info|extlinks",
        redirects: 1,
        exsectionformat: "wiki",
        explaintext: true,
        titles: content.searchTerm,
        format: "json",
      });

    const wikipediaRawContent = response.body.query.pages;

    Object.keys(wikipediaRawContent).forEach((key) => {
      content.sourceContentOriginal = wikipediaRawContent[key]["extract"];
    });
    return content;
  } catch (error) {
    console.log(error);
  }
}

module.exports = Wikipedia;
