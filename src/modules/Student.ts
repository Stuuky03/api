import { createId } from "@paralleldrive/cuid2";

export class Student {
  private readonly _id: string;
  public username: string;
  public email: string;
  public password: string;

  get id(): string {
    return this._id;
  }

  constructor(props: Omit<Student, 'id'>) {
    const { username, email, password } = props;
    this.username = username;
    this.email = email;
    this.password = password;

    this._id = createId();
  }
}