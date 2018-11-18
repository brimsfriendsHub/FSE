import { Component, NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
      validationMessage = '';


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
      this.validationMessage = '';
      if (!this.viewtaskForm.invalid) {
               const val = this.viewtaskForm.value;
               this.taskSearch.taskName = val.taskName;
               this.taskSearch.priority = val.priorityFrom;
               this.taskSearch.priorityTo = val.priorityTo;
               this.taskSearch.parentTaskName = val.parenttaskName;
               this.taskSearch.startDate = val.startDate;
               this.taskSearch.endDate = val.endDate;
               this.validateFields(val);

               if (this.validationMessage.trim().length < 1) {
                this.loadTaskDetails(this.taskSearch);
               }
          }

  }
  validateFields(val: any) {
    if (val.priorityFrom != null && val.priorityTo != null && val.priorityFrom !== '' && val.priorityTo !== '') {
      this.validationMessage = val.priorityFrom > val.priorityTo ? 'PriorityTo field should be greater than priority from' : '';
      return;
    }
    if (val.startDate != null && val.endDate != null && val.endDate !== '' && val.startDate !== '') {
      this.validationMessage = val.startDate > val.endDate ? 'End date should be greater than Start Date' : '';
      return;
    }
  }

  filterResult(val: any) {

    if (val.taskName !== undefined && val.taskName != null && val.taskName !== '') {
      this.taskDetails = this.taskDetails.filter(x => x.taskName.toUpperCase().indexOf(val.taskName.toUpperCase().trim()) > -1);
    }

    if (val.priority != null && val.priority !== undefined && val.priority !== '') {
      this.taskDetails = this.taskDetails.filter(x => x.priority >= val.priority);
    }

    if (val.priorityTo != null && val.priorityTo !== undefined && val.priorityTo !== '') {
      this.taskDetails = this.taskDetails.filter(x => x.priority <= val.priorityTo);
    }

    if (val.parentTaskName != null && val.parentTaskName !== undefined && val.parentTaskName !== '') {
      this.taskDetails = this.taskDetails.filter(x => x.parentTaskName.toUpperCase().indexOf(val.parentTaskName.toUpperCase().trim()) > -1);
    }

    if (val.startDate != null && val.startDate !== '') {
      // tslint:disable-next-line:prefer-const
      let stDate = new Date(val.startDate);
      stDate.setHours(0, 0, 0, 0);
      this.taskDetails = this.taskDetails.filter(x => new Date(x.startDate) >= stDate);
    }

    if (val.endDate != null && val.endDate !== '') {
      // tslint:disable-next-line:prefer-const
      let etDate = new Date(val.endDate);
      etDate.setHours(0, 0, 0, 0);
      this.taskDetails = this.taskDetails.filter(x => new Date(x.endDate) <= etDate);
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
          this.filterResult(val);
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
