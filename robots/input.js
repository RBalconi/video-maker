const readline = require("readline-sync");
const state = require("./state.js");

function robot() {
  const content = {
    maximumSentences: 7,
  };

  content.searchTerm = askAndReturnSearchTerm();
  content.prefix = askAndReturnPrefix();
  // content.sentences.keywords = askAndReturnKeywords();
  content.sentences = askAndReturnKeywords().map((keyword, i) => {
    return { keywords: keyword.toLowerCase() };
  });
  // content.keywords = askAndReturnKeywords();

  state.save(content);

  function askAndReturnSearchTerm() {
    return readline.question("Type a Wikipedia search term: ");
  }

  function askAndReturnPrefix() {
    const prefixes = ["Who is", "What is", "The history of"];
    const selectedPrefixIndex = readline.keyInSelect(
      prefixes,
      "Choose one option: "
    );
    const selectedPrefixText = prefixes[selectedPrefixIndex];

    return selectedPrefixText;
  }

  function askAndReturnKeywords() {
    return readline
      .question(`Type Key Words (split from "comma"): `)
      .split(",");
  }
}

module.exports = robot;
