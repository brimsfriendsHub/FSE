import { Component, NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskModel} from './TaskModel/addtask.model';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './taskservice.service';

@Component({
    selector: 'app-viewtask-component',
    templateUrl: './viewtask.component.html'
  })

  export class ViewTaskComponent {
      taskDetails = new Array<TaskModel>();
      viewtaskForm: FormGroup;
      taskSearch = new TaskModel();

      @Output() editTask = new EventEmitter<TaskModel>();

      constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe, private _service: SharedServiceService) {
        this.addTaskForm();
        // this.loadTaskDetails();
    }

    addTaskForm() {
      this.viewtaskForm = this._formBuilder.group({
          taskName: [''],
          priorityFrom: [''],
          priorityTo: [''],
          parenttaskName: [''],
          startDate: [''],
          endDate: ['']
      });
    }

    onSubmit() {
      // stop here if form is invalid
      if (!this.viewtaskForm.invalid) {
               const val = this.viewtaskForm.value;
               this.taskSearch.taskName = val.taskName;
               this.taskSearch.priority = val.priorityFrom;
               this.taskSearch.priorityTo = val.priorityTo;
               this.taskSearch.parentTaskName = val.parentTaskName;
               this.taskSearch.startDate = val.startDate;
               this.taskSearch.endDate = val.endDate;

              this.loadTaskDetails(this.taskSearch);
      }

  }
      // tslint:disable-next-line:use-life-cycle-interface
      ngOnInit() { }

      loadTaskDetails(val) {

        // for (let i = 1; i < 10; i++) {
        //   const tsk = new TaskModel();

        //   tsk.taskId = i;
        //   tsk.taskName = 'Task Name ' + i;
        //   if (i % 2 === 1) {
        //     tsk.parentTaskId = i;
        //     tsk.parentTaskName = 'Parent Task' + i;
        //   } else {
        //     tsk.parentTaskId = i;
        //     tsk.parentTaskName = 'this has no Parent Task' + i;
        //   }

        //   tsk.priority = i;
        //   tsk.startDate = new Date().toDateString();
        //   tsk.endDate = new Date().toDateString();

        //   this.taskDetails.push(tsk);
        // }
        this._service.getTask(val).subscribe(data => {
          this.taskDetails = data;
        }) ;

       }

       editSingleTask(e) {
        // tslint:disable-next-line:prefer-const
        let items = new TaskModel();
        items.taskId = e.taskId;
        items.taskName = e.taskName;
        items.parentTaskId =   e.parentTaskId;
        items.parentTaskName = e.parentTaskName;
        items.priority = e.priority;
        items.startDate = this._datePipe.transform(e.startDate, 'yyyy-MM-dd');
        items.endDate = this._datePipe.transform(e.endDate, 'yyyy-MM-dd');
          this.editTask.emit(items);
    }

       endSingleTask(e) {
      // tslint:disable-next-line:no-debugger
      this._service.deleteTask(e).subscribe(data => {
        this.loadTaskDetails(this.taskSearch);
    }) ;
    }

    trackTask(index, task) {
      return task ? task.id : undefined;  }
  }
