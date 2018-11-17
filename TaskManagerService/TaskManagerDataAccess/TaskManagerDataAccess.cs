using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using TaskManagerService.ViewModel;

namespace TaskManagerDataAccess
{
    public class TaskManagerDataAccess
    {
        private string m_connectionString = ConfigurationManager.ConnectionStrings["FSD"].ConnectionString;
        private const string c_EndTask = "dbo.EndTask";
        private const string c_UpdateTask = "dbo.UpdateTaskDetails";
        private const string c_GetTask = "dbo.GetTaskDetails";
        private const string c_AddTask = "dbo.AddTaskDetails";


        public void AddTask(TaskDetailsModel task)
        {
            using (SqlConnection sqlconn = new SqlConnection(m_connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(c_AddTask, sqlconn))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@taskname", task.TaskName);
                    sqlCommand.Parameters.AddWithValue("@parenttaskname", task.ParentTaskName);
                    sqlCommand.Parameters.AddWithValue("@startdate", task.StartDate);
                    sqlCommand.Parameters.AddWithValue("@Enddate", task.EndDate);
                    sqlCommand.Parameters.AddWithValue("@priority", task.Priority);
                    sqlconn.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public void UpdateTask(TaskDetailsModel task)
        {
            using (SqlConnection sqlconn = new SqlConnection(m_connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(c_UpdateTask, sqlconn))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@taskid", task.TaskId);
                    sqlCommand.Parameters.AddWithValue("@taskname", task.TaskName);
                    sqlCommand.Parameters.AddWithValue("@parenttaskname", task.ParentTaskName);
                    sqlCommand.Parameters.AddWithValue("@startdate", task.StartDate);
                    sqlCommand.Parameters.AddWithValue("@Enddate", task.EndDate);
                    sqlCommand.Parameters.AddWithValue("@priority", task.Priority);
                    sqlconn.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public List<TaskDetailsModel> ViewTask(TaskDetailsModel task = null)
        {
            List<TaskDetailsModel> objTaskDetailslist = new List<TaskDetailsModel>();
            using (SqlConnection sqlconn = new SqlConnection(m_connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(c_GetTask, sqlconn))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlconn.Open();
                    using (SqlDataReader dr = sqlCommand.ExecuteReader())
                    {
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                TaskDetailsModel objTask = new TaskDetailsModel
                                {
                                    TaskId = Convert.ToInt32(dr["TaskID"]),
                                    TaskName = Convert.ToString(dr["TaskName"]),
                                    StartDate = Convert.ToDateTime(dr["StartDate"]),
                                    EndDate = Convert.ToDateTime(dr["EndDate"]),
                                    Priority = Convert.ToInt32(dr["Priority"]),
                                    IsEnded = Convert.ToBoolean(dr["IsEnded"]),
                                    ParentTaskName = Convert.ToString(dr["ParentTaskName"])
                                };
                                objTaskDetailslist.Add(objTask);
                            }
                        }
                    }
                }
            }
            return objTaskDetailslist;
        }

        public void EndTask(int taskId)
        {
            using (SqlConnection sqlconn = new SqlConnection(m_connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(c_EndTask, sqlconn))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    sqlCommand.Parameters.AddWithValue("@taskid", taskId);
                    sqlconn.Open();
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }
    }
}
