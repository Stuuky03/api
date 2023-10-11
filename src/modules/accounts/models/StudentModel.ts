export type StudentModel = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  points: number | undefined;
  stuukesCount: number | undefined;
  questionsCount: number | undefined;
}