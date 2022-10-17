import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoLocalStorageService {

  constructor() { }

  public todoGetLocalStorage(key: string):any{
    const todoLS: any = localStorage.getItem(key);
    return JSON.parse(todoLS);
  }
  public todoSetLocalStorage(key: string, value: Todo[]){
    localStorage.setItem(key, JSON.stringify(value));
  }
  public todoRemoveLocalStorage(key: string): void{
    localStorage.removeItem(key);
  }
  public clearLocalStorage(): void{
    localStorage.clear();
  }
}
