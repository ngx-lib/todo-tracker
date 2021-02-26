import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 'Pay Credit Card Bill';
  tasks: string[] = [];

  addNew() {
    if (this.value != '') {
      this.tasks.push(this.value);
      console.log(this.tasks);
      this.value = ''
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log(typeof (data));
    console.log(data);
    if (this.tasks.length == 0) {
      this.tasks = data;
    }
  }
}
