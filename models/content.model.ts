import { Sentence } from "./sentence.model";

export class Content {
  maximumSentences: number;
  searchTerm: string;
  prefix: string;
  sentences: Array<Sentence>;
  sourceContentOriginal: string;
  sourceContentSanitized: string;
}
