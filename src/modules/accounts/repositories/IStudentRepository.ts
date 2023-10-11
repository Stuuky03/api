import { Student } from "../domain/Student";

export interface IStudentRepository {
  save(student: Student): Promise<void>;
  create(student: Student): Promise<void>;
  findByEmail(email: string): Promise<boolean>;
  findByUsername(username: string): Promise<boolean>;
  findById(id: string): Promise<Student | null>;
}