use FSD

Create table dbo.Task_Table
(
	Task_ID int identity(1,1),
	Parent_ID int,
	Task_Name varchar(500),
	[Start_Date] datetime,
	End_Date Datetime,
	[Priority] int,
	IsEnded bit
)

Create table dbo.Parent_Task_Table
(
	Parent_ID int identity(1,1),
	Parent_Task_Name varchar(500)
)



--Insert into dbo.Parent_Task_Table values('ParentTask1'),('ParentTask2'),('ParentTask3')
--Insert into dbo.Task_Table values(1,'Task1',GETDATE(),Getdate()+30,1,0)

CREATE PROCEDURE dbo.AddTaskDetails
@taskname varchar(500),
@parenttaskname varchar(500),
@startdate datetime,
@Enddate datetime,
@priority int,
@isended bit=0
AS
BEGIN

	Declare @parentTaskID int=(select Parent_ID from dbo.Parent_Task_Table where Parent_Task_Name=@parenttaskname)

	IF(@parentTaskID is not null)
		BEGIN
			Insert into dbo.Task_Table 
			values (@parentTaskID,@taskname,@startdate,@Enddate,@priority,@isended)
		END
	ELSE
		BEGIN
			IF @parenttaskname is not null
				BEGIN
					Insert into dbo.Parent_Task_Table 
					values (@parenttaskname)
			
					SEt @parentTaskID =(select Parent_ID from dbo.Parent_Task_Table where Parent_Task_Name=@parenttaskname)

					Insert into dbo.Task_Table 
					values (@parentTaskID,@taskname,@startdate,@Enddate,@priority,@isended)
				END
			ELSE
				BEGIN
					Insert into dbo.Task_Table 
					values (null,@taskname,@startdate,@Enddate,@priority,@isended)
				END
		END
END


Create PROCEDURE dbo.GetTaskDetails
AS
BEGIN
	Select 
		T1.Task_ID as TaskID,
		T1.Task_Name as TaskName,
		T2.Parent_Task_Name as ParentTaskName,
		T1.Start_Date as StartDate,
		T1.End_Date as EndDate,
		T1.Priority,
		T1.IsEnded
	 from dbo.Task_Table T1 left join dbo.Parent_Task_Table T2 on T1.Parent_ID= t2.Parent_ID
END

CREATE PROCEDURE dbo.UpdateTaskDetails
@taskid Int,
@taskname varchar(500),
@parenttaskname varchar(500),
@startdate datetime,
@Enddate datetime,
@priority int,
@isended bit=0
AS
BEGIN

	Declare @parentTaskID int=(select Parent_ID from dbo.Parent_Task_Table where Parent_Task_Name=@parenttaskname)

	IF(@parentTaskID is not null)
		BEGIN
			Update T 
				set t.Task_Name=@taskname,
				t.Parent_ID=@parentTaskID,
				t.Start_Date=@startdate,
				t.End_Date=@Enddate,
				t.Priority=@priority,
				t.IsEnded=@isended from dbo.Task_Table T where Task_ID=@taskid
		END
	ELSE
		BEGIN
			IF @parenttaskname is not null
				BEGIN
					Insert into dbo.Parent_Task_Table 
					values (@parenttaskname)
			
					SEt @parentTaskID =(select Parent_ID from dbo.Parent_Task_Table where Parent_Task_Name=@parenttaskname)

					Update T 
						set t.Task_Name=@taskname,
						t.Parent_ID=@parentTaskID,
						t.Start_Date=@startdate,
						t.End_Date=@Enddate,
						t.Priority=@priority,
						t.IsEnded=@isended from dbo.Task_Table T where Task_ID=@taskid
				END
			ELSE
				BEGIN
					Update T 
						set t.Task_Name=@taskname,
						t.Parent_ID=null,
						t.Start_Date=@startdate,
						t.End_Date=@Enddate,
						t.Priority=@priority,
						t.IsEnded=@isended from dbo.Task_Table T where Task_ID=@taskid
				END
		END
END

Create Procedure dbo.EndTask
@taskid int
AS
BEGIN
	Update T set t.IsEnded=1 from dbo.Task_Table T where Task_ID=@taskid
END

select * from dbo.Parent_Task_Table
select * from dbo.Task_Table