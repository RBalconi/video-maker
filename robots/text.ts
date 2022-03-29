const sentenceBoundaryDetection = require("sbd");
import { Content } from "../models/content.model";
import { MessageType } from "../models/enumerations/message-type.enum";
import { Robot } from "../models/enumerations/robot.enum";
import { Log } from "../models/log.model";
import { State as state } from "./state";
const wikipedia = require("./wikipedia");

export async function robotText() {
  console.log(Log.getLogTemplate(Robot.TEXT, MessageType.INFO, "Starting..."));

  const content = state.load();

  await fetchContentFromWikipedia(content);
  sanitizeContent(content);
  breakContentIntoSentences(content);
  limitMaximumSentences(content);

  state.save(content);

  async function fetchContentFromWikipedia(content: Content) {
    console.log(
      Log.getLogTemplate(
        Robot.TEXT,
        MessageType.INFO,
        "Fetching content from Wikipedia"
      )
    );
    const wikipediaResponse = await wikipedia(content);

    content.sourceContentOriginal = wikipediaResponse.sourceContentOriginal;
    console.log(
      Log.getLogTemplate(Robot.TEXT, MessageType.SUCCESS, "Fetching Done!")
    );
  }

  function sanitizeContent(content: Content) {
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(
      content.sourceContentOriginal
    );
    const withoutDatesInParentheses = removeDatesInParentheses(
      withoutBlankLinesAndMarkdown
    );

    content.sourceContentSanitized = withoutDatesInParentheses;

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split("\n");

      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith("=")) {
          return false;
        }

        return true;
      });

      return withoutBlankLinesAndMarkdown.join(" ");
    }
  }

  function removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, "").replace(/  /g, " ");
  }

  function breakContentIntoSentences(content: Content) {
    // content.sentences = [];

    const sentences: Array<string> = sentenceBoundaryDetection.sentences(
      content.sourceContentSanitized
    );

    sentences.slice(0, content.maximumSentences).forEach((sentence, i) => {
      content.sentences.splice(i, 1, {
        text: sentence,
        images: [],
        keywords: content.sentences[i].keywords,
      });
    });
  }

  function limitMaximumSentences(content: Content) {
    content.sentences = content.sentences.slice(0, content.maximumSentences);
  }
}
