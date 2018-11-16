export class TaskModel {
taskId: number;
taskName: string;
parentTaskId: number;
parentTaskName: string;
priority: number;
priorityTo?: number;
startDate: string;
endDate: string;
IsEnded: boolean;
}
