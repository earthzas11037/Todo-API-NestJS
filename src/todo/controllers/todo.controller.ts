import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.todoService.getAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getById(+id);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
  ): Todo {
    const { title, description } = createTodoDto;
    return this.todoService.create(title, description);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Todo {
    const { title, description, isDone } = updateTodoDto;
    return this.todoService.update(+id, title, description, isDone);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string,
  ): void {
    return this.todoService.delete(+id);
  }
}
