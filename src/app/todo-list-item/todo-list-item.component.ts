import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TodoService } from "../todo.service";

import {Todo} from "../todo";



@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todos$: Todo[] | null = []
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() isDoneTodoItem = new EventEmitter<number>();
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {

  }
  isDoneItem(todoId: number){
    this.isDoneTodoItem.emit(todoId);
  }

  editItem(todoTextValue:HTMLElement, todoId: number){
    todoTextValue.textContent = '';

    const inputTodoText = document.createElement('input');
    const buttonSaveTodoText = document.createElement('button');

    inputTodoText.type = 'text';
    inputTodoText.classList.add('focused');
    buttonSaveTodoText.innerText = 'save';


    buttonSaveTodoText.addEventListener('click', () => {
      todoTextValue.textContent = inputTodoText.value;
      this.todoService.edit(inputTodoText.value, todoId)

    })

    todoTextValue.append(inputTodoText);
    todoTextValue.append(buttonSaveTodoText);

  }
  deleteItem(todoId: number){
    this.deleteTodoItem.emit(todoId);
  }



}
