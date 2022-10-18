import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ElementRef, ViewChild } from "@angular/core";
import { Todo } from "../todo";


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: any;
  @Output() deleteTodoItem = new EventEmitter<number>();
  @Output() isDoneTodoItem = new EventEmitter<number>();
  @Output() editTodoItem = new EventEmitter<{inputValue: string, todoId: number }>();

  public showBlockEditTodo: boolean = false;

  @ViewChild("editTodoInput") editTodoInput: ElementRef|undefined;

  constructor() {
  }

  ngOnInit(): void {

  }

  isDoneItem(todoId: number){
    this.isDoneTodoItem.emit(todoId);
  }

  showEditTodo(){
    console.log(this.todo)
    this.showBlockEditTodo = !this.showBlockEditTodo;
    if(this.showBlockEditTodo){
      setTimeout(() => {
        this.editTodoInput?.nativeElement.focus()
      }, 300)
    }
  }

  editItem(inputValue: string, todoId: number){
    this.editTodoItem.emit({inputValue,todoId});
    this.showBlockEditTodo = !this.showBlockEditTodo
  }

  deleteItem(todoId: number){
    this.deleteTodoItem.emit(todoId);
  }



}
