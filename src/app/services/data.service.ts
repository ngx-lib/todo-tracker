import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  get(){
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  update(tasks:any){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  clear(){
    localStorage.setItem('tasks', JSON.stringify([]));
  }
}
