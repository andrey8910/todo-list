import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TodoService } from "../todo.service";
import { ElementRef, Renderer2 } from "@angular/core";
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
  constructor(private todoService: TodoService,
              private el: ElementRef,
              private renderer: Renderer2,) {

  }

  ngOnInit(): void {

  }
  isDoneItem(todoId: number){
    this.isDoneTodoItem.emit(todoId);
  }

  editItem(todoTextValue:HTMLElement, todoId: number){

    const inputTodoText = this.renderer.createElement('input')
    const buttonSaveTodoText: HTMLElement = this.renderer.createElement('button');

    inputTodoText.setAttribute('type', 'text');
    inputTodoText.setAttribute('autofocus', true);
    inputTodoText.setAttribute('value', todoTextValue.innerText);

    todoTextValue.textContent = '';
    buttonSaveTodoText.innerText = 'save';
    buttonSaveTodoText.innerText = 'save';



    buttonSaveTodoText.addEventListener('click', () => {
      todoTextValue.textContent = inputTodoText.value;
      this.todoService.edit(inputTodoText.value, todoId)

      })
    this.renderer.appendChild(todoTextValue, inputTodoText);
    this.renderer.appendChild(todoTextValue, buttonSaveTodoText)
    //todoTextValue.append(inputTodoText);
   // todoTextValue.append(buttonSaveTodoText);
   // todoTextValue.append(buttonSaveTodoText);

  }
  deleteItem(todoId: number){
    this.deleteTodoItem.emit(todoId);
  }



}
