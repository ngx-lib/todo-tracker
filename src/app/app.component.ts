import { Component } from '@angular/core';
import { DataService } from './services/data.service';
interface TaskList {
  priority: string,
  taskDesc: string,
  status: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = '';
  tasks: TaskList[] = [];
  priority: string = 'low';

  constructor(private data: DataService) {
  }

  addNew() {
    if (this.value != '') {
      let taskList: TaskList = {
        priority: this.priority,
        taskDesc: this.value,
        status: false
      };
      this.tasks.push(taskList);
      this.value = ''
      this.updateStatus()
    }
  }

  getColor(value: string) {
    switch (value) {
      case 'low':
        return 'green';
      case 'medium':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'black';
    }
  }

  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    this.tasks = [];
    let tasklist = this.data.get();
    if (tasklist.length > 0) {
      this.tasks = tasklist;
    }
  }

  updateStatus() {
    this.data.update(this.tasks);
  }

  clear() {    
    this.data.clear();
    this.getTaskList();
  }
}
