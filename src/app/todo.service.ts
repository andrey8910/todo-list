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
  public todosFiltered : Todo[] = [];
  private nextId = 0;

  constructor() { }

  loadAll(){
    this.todos = [

    ];
    this.todoSubject.next(this.todos);
  }
  create(item:Todo){
    item.id = ++this.nextId;
    item.done = false;
    this.todos.push(item);
    this.todoSubject.next(Object.assign([],this.todos))
  }
  isDone(id:number){
    this.todos.forEach((t) => {
      if(t.id === id){
        t.done = !t.done;
      }
      this.todoSubject.next(Object.assign([], this.todos));
    })
  }
  remote(id:number){
    this.todos.forEach((t,i) => {
      if (t.id === id){
        this.todos.splice(i, 1);
      }
      this.todoSubject.next(Object.assign([], this.todos));
    })
  }

  filter(howTo: string): any{

    if(howTo == 'todo'){
      this.todosFiltered = this.todos.filter((el:Todo) => {
       return !el.done
      })
      this.todoSubject.next(Object.assign([], this.todosFiltered));
    }else if(howTo == 'done'){
      this.todosFiltered = this.todos.filter((el:Todo) => {
        return el.done
      })
      this.todoSubject.next(Object.assign([], this.todosFiltered));
    }else if(howTo == 'all'){
      this.todoSubject.next(Object.assign([], this.todos));
    }
  }
}
