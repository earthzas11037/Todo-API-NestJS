import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all todos', () => {
    controller.getAllTodos();
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should get a todo by id', () => {
    const id = '1';
    controller.getTodoById(id);
    expect(service.getById).toHaveBeenCalledWith(+id);
  });

  it('should create a todo', () => {
    const createTodoDto: CreateTodoDto = { title: 'Test Todo', description: 'Test Description' };
    controller.createTodo(createTodoDto);
    expect(service.create).toHaveBeenCalledWith(createTodoDto.title, createTodoDto.description);
  });

  it('should update a todo', () => {
    const id = '1';
    const updateTodoDto: UpdateTodoDto = { title: 'Updated Test Todo', description: 'Updated Test Description', isDone: true };
    controller.updateTodo(id, updateTodoDto);
    expect(service.update).toHaveBeenCalledWith(+id, updateTodoDto.title, updateTodoDto.description, updateTodoDto.isDone);
  });

  it('should delete a todo', () => {
    const id = '1';
    controller.deleteTodo(id);
    expect(service.delete).toHaveBeenCalledWith(+id);
  });
});
