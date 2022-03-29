import * as readline from "readline-sync";
import { MessageType } from "../models/enumerations/message-type.enum";
import { Robot } from "../models/enumerations/robot.enum";
import { Log } from "../models/log.model";
import { State as state } from "./state";
// const readline = require("readline-sync");

export async function robotInput() {
  const content = {
    maximumSentences: 7,
    searchTerm: "",
    prefix: "",
    sentences: [],
  };

  content.searchTerm = askAndReturnSearchTerm();
  content.prefix = askAndReturnPrefix();
  content.sentences = askAndReturnKeywords().map((keyword, i) => {
    return { keywords: keyword.toLowerCase() };
  });

  state.save(content);

  function askAndReturnSearchTerm() {
    return readline.question(
      Log.getLogTemplate(
        Robot.INPUT,
        MessageType.INFO,
        "Type a Wikipedia search term: "
      )
    );
  }

  function askAndReturnPrefix() {
    const prefixes = ["Who is", "What is", "The history of"];
    const selectedPrefixIndex = readline.keyInSelect(
      prefixes,
      Log.getLogTemplate(Robot.INPUT, MessageType.INFO, "Choose one option: ")
    );
    const selectedPrefixText = prefixes[selectedPrefixIndex];

    return selectedPrefixText;
  }

  function askAndReturnKeywords() {
    return readline
      .question(
        Log.getLogTemplate(
          Robot.INPUT,
          MessageType.INFO,
          "Type Key Words (split from 'comma'): "
        )
      )
      .split(",");
  }
}
