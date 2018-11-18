import { Component, NgModule, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskModel} from '../app/TaskModel/addtask.model';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './taskservice.service';

@Component({
    selector: 'app-addtask-component',
    templateUrl: './addtask.component.html'
  })

  export class AddTaskComponent {
    addtaskForm: FormGroup;
    submitted = false;
    addtaskModel = new TaskModel();
    taskId = 0;
    priorityValue = 0;
    validationError = '';
    pTaskName = 'No Parent Task Mapped';

    constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe, private _service: SharedServiceService) {
            this.addTaskForm();
        }

        // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {this.onReset(); }

    addTaskForm() {
        this.addtaskForm = this._formBuilder.group({
            taskName: ['', Validators.required],
            priority: ['', Validators.required],
            parentTask: [''],
            startDate: ['', [Validators.required]], // , this.isValiddate('startDate')
            endDate: ['', [Validators.required]] // , this.isValiddate('endDate')
        });
    }
    onSubmit() {
        this.submitted = true;
        this.validationError = '';
        // stop here if form is invalid
        if (!this.addtaskForm.invalid) {
                 const val = this.addtaskForm.value;
                  if (this.validationDt(val).length < 1) {
                    if (this.taskId === 0) {
                        this._service.addTask(this.assignTaskValues(val)).subscribe(data => {
                            // tslint:disable-n debugger;
                            this.onReset();
                        }) ;
                     } else {
                        this._service.updateTask(this.assignTaskValues(val)).subscribe(data => {
                            this.onReset();
                        }) ;
                     }
                  }
        }

    }

    assignTaskValues(val: any) {
        const ptsk = (val.parentTask == null || val.parentTask === undefined) ? this.pTaskName : val.parentTask;
        this.addtaskModel.taskId = this.taskId;
                  this.addtaskModel.taskName = val.taskName;
                  this.addtaskModel.parentTaskName = ptsk;
                  this.addtaskModel.priority = val.priority;
                  this.addtaskModel.startDate = this._datePipe.transform(val.startDate, 'yyyy-MM-dd');
                  this.addtaskModel.endDate = this._datePipe.transform(val.endDate, 'yyyy-MM-dd');

                  return this.addtaskModel;
    }

    validationDt(valIn) {

        // tslint:disable-next-line:max-line-length
        this.validationError = (valIn.endDate < valIn.startDate) ? 'End Date should greater than start date' : (valIn.priority < 1) ? 'Please mark priority greater than 0' : '';
        // if (valIn.endDate < valIn.startDate) {
        //     this.validationError = 'End Date should greater than start date';
        // } else if (valIn.priority < 1) {
        //     this.validationError = 'Please mark priority greater than 0';
        // }
        return this.validationError;
    }

    assignTaskValue(val: TaskModel) {
        // tslint:disable-next-line:no-debugger
        debugger;
        if (val != null && val !== undefined) {
            this.addtaskForm.setValue({
                taskName: val.taskName,
                priority: val.priority,
                parentTask: val.parentTaskName,
                startDate: val.startDate, // this._datePipe.transform(val.startDate, 'yyyy-MM-dd'),
                endDate: val.endDate // this._datePipe.transform(val.endDate, 'yyyy-MM-dd')
              });
        }
        this.taskId = val.taskId;
    }

    onReset() {
        this.addtaskForm.setValue({
            taskName: null,
            priority: 0,
            parentTask: null,
            startDate: this._datePipe.transform(new Date(), 'yyyy-MM-dd'),
            endDate: this._datePipe.transform(new Date(), 'yyyy-MM-dd')
          });
          this.taskId = 0;
          this.validationError = '';
    }
  }
