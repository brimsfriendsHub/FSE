import { AddTaskComponent } from './addtask.component';
import { ViewTaskComponent } from './viewtask.component';
import { SharedServiceService } from './taskservice.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TaskModel } from './TaskModel/addtask.model';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// describe('SharedServiceService', () => {
//     let service: SharedServiceService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [SharedServiceService]
//         });

//         service = TestBed.get(SharedServiceService);

//     it('retrive task list', () => {
//             const expectedValue: TaskModel[] =
//                 [{ taskId: 1, taskName: 'Today Task update', parentTaskId: 1 , parentTaskName: 'No Parent Task Mapped'
//                     , priority: 1, priorityTo : null, startDate : '2018-11-06 00:00:00.000',
//                     endDate : '2018-11-06 00:00:00.000' , IsEnded: false}];
//             const inputValue: TaskModel = new TaskModel();
//         service.getTask(this.inputValue).subscribe(dataItems => {
//             expect(dataItems.length).toBe(1);
//             expect(dataItems).toEqual(this.expectedValue);
//         });

//         const request = service.taskManagerUrl;

//         });
//     });
// });

describe('SharedServiceService', () => {
    let _component: ViewTaskComponent;
    let _fixture: ComponentFixture<ViewTaskComponent>;

    beforeEach(async()=>{
        TestBed.configureTestingModule({
            declarations: [ViewTaskComponent],
            imports:[FormsModule, ReactiveFormsModule]
        }).compileComponents();

        _fixture = TestBed.createComponent(ViewTaskComponent);
        _component = _fixture.componentInstance;

    });

    it('View Task Component', () => {
        expect(_component.viewtaskForm).toBeTruthy();
    });

});
