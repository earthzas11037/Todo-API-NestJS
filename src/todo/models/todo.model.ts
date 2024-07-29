export class Todo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public isDone: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
