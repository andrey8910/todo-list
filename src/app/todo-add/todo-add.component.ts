import {Component, OnInit} from '@angular/core';
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

  private todos$: Observable<Todo[]>
  public todoForm: FormGroup

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
    this.todoForm = new FormGroup({
      valueTodo: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.todoService.loadAll()
  }

  onSubmit(){
    if(this.todoForm.value.valueTodo.length > 0){
      this.todoService.create(this.todoForm.value);
      this.todoForm.get('valueTodo')?.setValue('');
    }else{
      alert('enter todo !');
    }
  }
}
