import { Content } from "../models/content.model";

const fs = require("fs");
const contentFilePath = "./content.json";
const scriptFilePath = "./content/after-effects-script.js";

export class State {
  public static save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFilePath, contentString);
  }

  public static saveScript(content) {
    const contentString = JSON.stringify(content);
    const scriptString = `var content = ${contentString}`;
    return fs.writeFileSync(scriptFilePath, scriptString);
  }

  public static load(): Content {
    const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
  }
}
