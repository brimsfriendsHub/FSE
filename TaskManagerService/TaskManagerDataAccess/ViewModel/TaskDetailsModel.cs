using System;
using System.Runtime.Serialization;

namespace TaskManagerService.ViewModel
{
    public class TaskDetailsModel
    {
        [DataMember]
        public int TaskId { get; set; } = 0;
        [DataMember]
        public string TaskName { get; set; }
        [DataMember]
        public int ParentTaskId { get; set; } = 0;
        [DataMember]
        public string ParentTaskName { get; set; }
        [DataMember]
        public int Priority { get; set; } = 0;
        [DataMember]
        public int PriorityTo { get; set; } = 0;
        [DataMember]
        public DateTime StartDate { get; set; }
        [DataMember]
        public DateTime EndDate { get; set; }
        [DataMember]//(IsRequired = false)
        public bool IsEnded { get; set; } = false;
    }
}