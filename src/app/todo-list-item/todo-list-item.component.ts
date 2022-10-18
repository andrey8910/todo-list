import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { TodoService } from "../todo.service";
import { ElementRef, Renderer2, ViewChild } from "@angular/core";
import {Todo} from "../todo";



@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit ,AfterViewInit {
  @Input() todos$: Todo[] | null = []
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() isDoneTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter<number>();

  public showBlockEditTodo: boolean = false;

  @ViewChild('todoText') todoInputText: any;

  constructor(private todoService: TodoService,
              private el: ElementRef,
              private renderer: Renderer2,) {

  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    //this.todoInputText.nativeElement.focus();
  }
  isDoneItem(todoId: number){
    this.isDoneTodoItem.emit(todoId);
  }
  showEditTodo(){
    this.showBlockEditTodo = !this.showBlockEditTodo
  }
  editItem(todoId: number){
    this.editTodoItem.emit(todoId);

   // const inputTodoText = this.renderer.createElement('input')
   // const buttonSaveTodoText: HTMLElement = this.renderer.createElement('button');

   // inputTodoText.setAttribute('type', 'text');
   // inputTodoText.setAttribute('autofocus', true);
   // inputTodoText.setAttribute('value', todoTextValue.textContent);


    //console.log(this.todoInputText.nativeElement.children[0])
   // todoTextValue.textContent = '';
   // buttonSaveTodoText.innerText = 'save';




   // buttonSaveTodoText.addEventListener('click', () => {
   //   todoTextValue.textContent = inputTodoText.value;
   //   this.todoService.edit(inputTodoText.value, todoId)

  //    })
  //  this.renderer.appendChild(todoTextValue, inputTodoText);
  //  this.renderer.appendChild(todoTextValue, buttonSaveTodoText);

    //this.todoTextValue.nativeElement.children[0].focus();
    //todoTextValue.append(inputTodoText);
   // todoTextValue.append(buttonSaveTodoText);
   // todoTextValue.append(buttonSaveTodoText);

  }
  deleteItem(todoId: number){
    this.deleteTodoItem.emit(todoId);
  }



}
