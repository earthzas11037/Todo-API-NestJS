import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new todo', () => {
    const title = 'Test Todo';
    const description = 'Test Description';
    const todo = service.create(title, description);

    expect(todo).toBeDefined();
    expect(todo.title).toBe(title);
    expect(todo.description).toBe(description);
    expect(todo.isDone).toBe(false);
    expect(todo.createdAt).toBeInstanceOf(Date);
    expect(todo.updatedAt).toBeInstanceOf(Date);
  });

  it('should get all todos', () => {
    const todos = service.getAll();
    expect(todos).toBeInstanceOf(Array);
  });

  it('should update a todo', () => {
    const title = 'Test Todo';
    const description = 'Test Description';
    const todo = service.create(title, description);

    const updatedTitle = 'Updated Test Todo';
    const updatedDescription = 'Updated Test Description';
    const updatedTodo = service.update(todo.id, updatedTitle, updatedDescription, true);

    expect(updatedTodo.title).toBe(updatedTitle);
    expect(updatedTodo.description).toBe(updatedDescription);
    expect(updatedTodo.isDone).toBe(true);
    expect(updatedTodo.updatedAt).toBeInstanceOf(Date);
    // expect(updatedTodo.updatedAt).not.toBe(todo.updatedAt);
  });

  it('should delete a todo', () => {
    const title = 'Test Todo';
    const description = 'Test Description';
    const todo = service.create(title, description);

    service.delete(todo.id);
    expect(() => service.getById(todo.id)).toThrow();
  });
});
