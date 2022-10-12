import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs";
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoSubject = new BehaviorSubject<Todo[]>([]);
  readonly  todos$ = this.todoSubject.asObservable();
  private todos: Todo[] = [];
  private nextId = 0;

  constructor() { }

  loadAll(){
    this.todos = [];
    this.todoSubject.next(this.todos);
  }

  create(item:Todo){
    item.id = ++this.nextId;
    this.todos.push(item);
    this.todoSubject.next(Object.assign([],this.todos))
  }

  remote(id:number){
    this.todos.forEach((t,i) => {
      if (t.id === id){
        this.todos.splice(i, 1);
      }
      this.todoSubject.next(Object.assign([], this.todos));
    })
  }
}
