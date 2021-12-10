
/****** Object:  StoredProcedure [dbo].[usp_CleanVirtualMachineReconfigure] ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_CleanVirtualMachineReconfigure]
	@VirtualMachineName NVARCHAR(512) = NULL
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE @VirtualMachineId uniqueidentifier
	DECLARE @StateOperationId int
	
	PRINT 'Virtual Machine Name: ' + @VirtualMachineName
	
	-- Get the machine
	Select @VirtualMachineId = VirtualMachineID 
	from VirtualMachine Where VirtualMachineName = @VirtualMachineName
	
	Update VirtualMachine
	Set CurrentTask = 'Reconfigure failed, waiting to retry'
	Where VirtualMachineID = @VirtualMachineId
	
	-- Get the state operation
	Select @StateOperationId = StateOperationId
	From StateOperationVirtualMachines Where VirtualMachineId = @VirtualMachineId
	
	DECLARE @ExecutionStateId int
	
	Select @ExecutionStateId = Id
	FROM StateOperationExecutionStates
	Where Name = 'ReconfigureVM.FailedWaitingForRetry'
	
	-- Set the state operation to 'WaitingForRetry'
	Update StateOperations
	Set ExecutionStateId = @ExecutionStateId
	Where Id = @StateOperationId
END

GO


