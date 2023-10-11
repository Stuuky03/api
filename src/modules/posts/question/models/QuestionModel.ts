export type QuestionModel = {
  id: string
  title: string;
  content: string
  createdAt: Date
  studentId: string
  isDraft: boolean
  courseId: string
}