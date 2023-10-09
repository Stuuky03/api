import { Entity } from "@/core/domain/Entity";

interface ITagProps {
  title: string
  description: string
}

export class Tag extends Entity<ITagProps> {
  private constructor(props: ITagProps) {
    super(props)
  }

  static create(props: ITagProps): Tag {
    const tag = new Tag(props)

    return tag
  }
}