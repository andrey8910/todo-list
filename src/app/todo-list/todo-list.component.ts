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
    //this.todos$ = this.todoService.todos$
  }

  ngOnInit(): void {
  //this.todoService.loadAll();
  }

  filterTodo(howTo: string){
   this.todoService.filter(howTo);
  }

  todoIsDone(todoId: number){
    this.todoService.isDone(todoId);
  }

  deleteTodo(todoId: number){
    this.todoService.remote(todoId)
  }

}
