import { Component, NgModule, ViewChild } from '@angular/core';
import { ViewTaskComponent } from './viewtask.component';
import { AddTaskComponent } from './addtask.component';
import { TaskModel } from './TaskModel/addtask.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAddTask = true;
@ViewChild(ViewTaskComponent) vTask: ViewTaskComponent;
@ViewChild(AddTaskComponent) aTask: AddTaskComponent;

  addTask() {
// tslint:disable-next-line:no-debugger

    this.isAddTask = true;
  }

  viewTask() {
    this.isAddTask = false;
    if (this.vTask != null && this.vTask !== undefined) {this.vTask.loadTaskDetails(this.vTask.taskSearch); }
  }

  editTaskItem(e: any): void {
    this.isAddTask = true;
    // tslint:disable-next-line:no-debugger
    if (this.aTask != null && this.aTask !== undefined) {
      this.aTask.assignTaskValue(e);
    }
  }
}
