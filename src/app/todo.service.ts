import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs";
import { TodoLocalStorageService } from "./todo-local-storage.service";
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoSubject = new BehaviorSubject<Todo[]>([]);
  readonly  todos$ = this.todoSubject.asObservable();
  private todos: Todo[] = [];
  public todosFiltered : Todo[] = [];
  private nextId: number = 0;

  constructor(private localStorageService: TodoLocalStorageService) { }

  loadAll(){
    if(localStorage.getItem('todos') !== null){
      this.todos = this.localStorageService.todoGetLocalStorage('todos');
      this.nextId = this.todos.reduce((prev:Todo, cur: Todo) => {
        if(prev.id > cur.id){
          return prev
        }
          return cur
      }).id
    }else {
      this.todos =[];
    }
    this.todoSubject.next(this.todos);
  }
  create(item:Todo){
    if(item.valueTodo.length > 0){
      item.id = ++this.nextId;
      item.done = false;
      this.todos.push(item);
      this.todoSubject.next(Object.assign([],this.todos))
      this.localStorageService.todoSetLocalStorage('todos', this.todos)
    }else{
      alert('enter text !')
    }

  }
  isDone(id:number){
    this.todos.forEach((t:Todo) => {
      if(t.id === id){
        t.done = !t.done;
      }
      this.localStorageService.todoSetLocalStorage('todos', this.todos);
      this.todoSubject.next(Object.assign([], this.todos));
    })
  }
  edit(todoValue:string, id:number){

    this.todos.forEach((t:Todo) => {
      if(t.id === id){
        t.valueTodo = todoValue;
      }
      this.todoSubject.next(Object.assign([], this.todos));
    })
  }
  remote(id:number){
    this.todos.forEach((t,i) => {
      if (t.id === id){
        this.todos.splice(i, 1);
        this.nextId = this.todos.reduce((prev:Todo, cur: Todo) => {
          if(prev.id > cur.id){
            return prev
          }
          return cur
        }).id
      }
      this.todoSubject.next(Object.assign([], this.todos));
      this.localStorageService.todoSetLocalStorage('todos', this.todos)
    })
  }

  filter(howTo: string){

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
