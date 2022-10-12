import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$
  }

  ngOnInit(): void {

  }
  todoIsDone(ev: any, todoId: number){
    console.log(ev.target.checked)
  }
  deleteTodo(todoId: number){
    this.todoService.remote(todoId)

  }

}
