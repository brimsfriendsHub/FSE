using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskManagerService.ViewModel;
using TaskManagerDataAccess;

namespace TaskManagerService.Controllers
{
    [RoutePrefix("api/taskmanager")]
    public class TaskManagerController : ApiController
    {
        private TaskManagerDataAccess.TaskManagerDataAccess _taskManagerDataAccess = null;
        public TaskManagerController()
        {
            _taskManagerDataAccess = new TaskManagerDataAccess.TaskManagerDataAccess();
        }

        [HttpPost]
        [Route("addTask")]
        public IHttpActionResult AddTask(TaskDetailsModel task)
        {
            _taskManagerDataAccess.AddTask(task);
            return Ok();
        }

        [HttpPost]
        [Route("updateTask")]
        public IHttpActionResult UpdateTask(TaskDetailsModel task)
        {
            _taskManagerDataAccess.UpdateTask(task);
            return Ok();
        }

        [HttpPost]
        [Route("viewTask")]
        public IHttpActionResult ViewTask(TaskDetailsModel task)
        {
            var result = _taskManagerDataAccess.ViewTask(task);
            return Ok(result);
        }

        [HttpGet]
        [Route("endTask/{taskId}")]
        public IHttpActionResult EndTask(int taskId)
        {
            _taskManagerDataAccess.EndTask(taskId);
            return Ok();
        }

    }

}