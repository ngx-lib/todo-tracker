import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
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

  readonly VAPID_PUBLIC_KEY = "BEyoOxHmtSLqnkOMQN9_YLAMX6suCSpBJWAS0pJJ0AjjzGhYR55HL07e8PBO3ckP4IaPkUN64b3onn_TqaYaj58";

  constructor(
    private data: DataService,
    private swPush: SwPush
  ) { }

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
    this.checkNotificationPermission();
    this.tasks.forEach(task => {
      if (!task.status) {
        this.sendNotification(task.taskDesc, '');
      }
    });
  }

  sendNotification(text: any, img: any) {
    if (Notification.permission === 'granted') {
      let notification = new Notification('To do list', { body: text, icon: img });
      let notification1 = new Notification('To do list', { body: text, icon: img });
    }
  }

  checkNotificationPermission() {
    let promise = null;
    if (Notification.permission !== 'granted') {
      promise = Notification.requestPermission();
    }
    return promise;
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

  schedule() {
    let timer = ['11:59', '12:02']
  }
}
