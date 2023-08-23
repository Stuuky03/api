import { createId } from "@paralleldrive/cuid2";

export class Student {
  private readonly _id: string;
  public username: string;
  public email: string;
  public password: string;
  public avatarUrl: string;

  get id(): string {
    return this._id;
  }

  constructor(props: Omit<Student, 'id'>) {
    const { username, email, password, avatarUrl } = props;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;

    this._id = createId();
  }
}