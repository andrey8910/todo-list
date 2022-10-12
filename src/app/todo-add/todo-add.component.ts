import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {



  constructor(private todoService: TodoService,
              private todos$: Observable<Todo[]>,
              public todoForm: FormGroup) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos$;
    this.todoForm = new FormGroup({
      id: new FormControl(''),
      valueTodo: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.todoService.create(this.todoForm.value);
    this.todoForm.get('value')?.setValue('');
  }

}
