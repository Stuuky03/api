import { Student } from "../domain/Student";

export interface IStudentRepository {
  save(Student: Student): Promise<void>;
  create(Student: Student): Promise<void>;
  findByEmail(email: string): Promise<boolean>;
  findByUser(username: string): Promise<boolean>;
}