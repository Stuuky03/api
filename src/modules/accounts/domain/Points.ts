export class Points {
  private readonly points: number

  constructor(points: number) {
    this.points = points
  }

  public getPoints(): number {
    return this.points
  }
}