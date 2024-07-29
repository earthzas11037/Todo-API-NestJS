import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService {
  // Use this instead databse
  private todos: Todo[] = []; // for keep data
  private idCounter = 1; // for increase id

  getAll(): Todo[] {
    return this.todos;
  }

  getById(id: number): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  create(title: string, description: string): Todo {
    const now = new Date();
    const newTodo = new Todo(
      this.idCounter++,
      title,
      description,
      false,
      now,
      now, 
    );
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, title: string, description: string, isDone: boolean): Todo {
    const todo = this.getById(id);
    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    todo.isDone = isDone;
    todo.updatedAt = new Date(); // Update the updatedAt timestamp
    return todo;
  }

  delete(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(index, 1);
  }
}
