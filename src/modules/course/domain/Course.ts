import { Entity } from "@/core/domain/Entity";

interface ICourseProps {
  title: string
  description: string
}

export class Course extends Entity<ICourseProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  private constructor(props: ICourseProps) {
    super(props)
  }

  static create(props: ICourseProps): Course {
    const course = new Course(props)

    return course
  }
}