IF EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_RemoveVMFromVRA]') AND type in (N'P', N'PC'))
   DROP PROCEDURE [dbo].[usp_RemoveVMFromVRA]
GO
CREATE PROCEDURE [dbo].[usp_RemoveVMFromVRA] 
	@MachineName nvarchar(128)
AS
BEGIN
  DECLARE @MachineID uniqueidentifier
  DECLARE @ApprovalWorkflowID uniqueidentifier
  DECLARE @MachineWorkflowDeleted bit
  DECLARE @ApprovalWorkflowDeleted bit
  DECLARE @RequestDeleted bit
  DECLARE @StaticAddressStateDestroyed int
  SET @StaticAddressStateDestroyed = 2
  SET NOCOUNT OFF;

  -- Get Machine ID
  SELECT TOP 1 @MachineID=VirtualMachineID FROM VirtualMachine WHERE VirtualMachineName = @MachineName
  IF @MachineID IS NOT NULL
  BEGIN
    BEGIN TRANSACTION
	BEGIN TRY
	  -- Delete workflow for this virtual machine if exists, and force VRM workflow upgrade with new state
	  DELETE InstanceState WHERE uidInstanceID = @MachineID
	  PRINT('Remove workflow of the virtual machine')
	  SET @MachineWorkflowDeleted = @@ROWCOUNT
	  -- Find approval workflow ID and delete this approval workflow if there is any
	  SELECT @ApprovalWorkflowID=WorkflowID FROM Request WHERE RequestID = @MachineID
	  IF @@ROWCOUNT <> 0
	  BEGIN
	    DELETE InstanceState WHERE uidInstanceID = @ApprovalWorkflowID
	    PRINT('Remove approval workflow of the virtual machine')
	  END
	  SET @ApprovalWorkflowDeleted = @@ROWCOUNT
	  -- Delete approval requests for virutal machine
	  DELETE Request WHERE RequestID = @MachineID
	  PRINT('Remove approval request of the virtual machine')
	  SET @RequestDeleted = @@ROWCOUNT
	  -- Delete all workflow maps
	  DELETE FROM WorkflowMap WHERE VirtualMachineID = @MachineID
	  DELETE FROM ExternalWorkflowMap WHERE PrimaryWorkflowId = @MachineID
	  PRINT('Remove all workflow maps of the virtual machine')
	  -- Delete all static ip addresses
	  EXEC usp_DestroyStaticIPsForVirtualMachine @MachineID, @StaticAddressStateDestroyed
	  PRINT('Remove all static IP addresses of the virtual machine')
	  -- Delete AppServiceComponents (VirtualMachineId foreign key is delete cascade)
	  -- AppServiceComponentTemplates (nullable virtual machine ID)
	  DELETE FROM AppServiceComponents WHERE AppServiceId=@MachineID
	  PRINT('Remove app service components of the virtual machine')
	  -- Delete StateOperationVirtualMachines (StateOperations)
	  DELETE FROM StateOperationVirtualMachines WHERE VirtualMachineId=@MachineID
	  PRINT('Remove state operations of the virtual machine')
	  -- Delete from Memebers in [DynamicOps.VCNSModel]
	  DELETE FROM [DynamicOps.VCNSModel].Members WHERE VirtualMachineId=@MachineID 
	  PRINT('Remove member of the Virtual Machine from vCNS')
	  -- delete virtual machine object
	  DELETE FROM VirtualMachine WHERE VirtualMachineID = @MachineID
	  PRINT('Remove virtual machine '+@MachineName)
	  -- select/print results
	  SELECT 
        @MachineName as MachineName,
        @MachineID as VirtualMachineID,
        @MachineWorkflowDeleted as MachineWorkflowDeleted,
        @RequestDeleted as RequestDeleted,
        @ApprovalWorkflowID as ApprovalWorkflowID,
        @ApprovalWorkflowDeleted as ApprovalWorkflowDeleted
	  COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
	  ROLLBACK TRANSACTION
	  PRINT 'Unexpected error occurred!'
      SELECT ERROR_NUMBER() AS ErrorNumber,
             ERROR_SEVERITY() AS ErrorSeverity,
             ERROR_STATE() AS ErrorState,
	         ERROR_PROCEDURE() AS ErrorProcedure,
	         ERROR_LINE() AS ErrorLine,
             ERROR_MESSAGE() AS ErrorMessage;
	END CATCH
  END
  ELSE
  BEGIN
    PRINT('Cannot find virtual machine '+@MachineName)
  END
END
GO
GRANT EXEC ON [dbo].[usp_RemoveVMFromVRA] TO Vrm_Manager
GO