import {Component, OnInit} from '@angular/core';
import { Observable } from "rxjs";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<Todo[]> = this.todoService.todos$;

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {

  }

  filterTodo(howTo: string){
   this.todoService.filter(howTo);
  }

  todoIsDone(todoId: number){
    this.todoService.isDone(todoId);
  }

  editTodo( value: {inputValue: string, todoId: number} ){
    this.todoService.edit(value)

  }

  deleteTodo(todoId: number){
    this.todoService.remote(todoId)
  }

}
