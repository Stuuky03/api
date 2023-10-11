import { WatchedList } from "@/core/domain/WatchedList";
import { QuestionTag } from "./QuestionTag";

export class QuestionTags extends WatchedList<QuestionTag> {
  private constructor(tags: QuestionTag[]) {
    super(tags)
  }

  public compareItems(a: QuestionTag, b: QuestionTag): boolean {
    return a.equals(b)
  }

  static create(tags: QuestionTag[]): QuestionTags {
    const questionTags = new QuestionTags(tags)
    return questionTags
  }
}