import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

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
  constructor() {

  }

  ngOnInit(): void {

  }
  isDoneItem(todoId: number){
    this.isDoneTodoItem.emit(todoId);
  }
  deleteItem(todoId: number){
    this.deleteTodoItem.emit(todoId);
  }

}
