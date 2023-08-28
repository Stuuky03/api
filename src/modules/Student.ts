import { createId } from "@paralleldrive/cuid2";

export class Student {
  private readonly _id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public profileImg: string;
  public description: string;

  get id(): string {
    return this._id;
  }

  constructor(props: Omit<Student, 'id'>) {
    const { firstName, lastName, username, email, password, profileImg, description } = props;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.profileImg = profileImg;
    this.description = description;

    this._id = createId();
  }
}