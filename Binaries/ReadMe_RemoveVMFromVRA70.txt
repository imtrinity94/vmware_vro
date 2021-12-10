Instruction for Deploying and Executing Remove VM from vRA

This procedure is to remove a VM from vRA. 

1. Before installing and executing SQL scripts

   **** ATTENTION !!! ****
   **** Please be sure to BACKUP any related appliances and databases (Both IAAS SQL Server database and VRA database) to allow a restore if there is any problem on running these scripts!****

2. Install usp_RemoveVMFromVRA.sql to IAAS SQL Server database
   2.1) Open SQL Server Management Studio and login as VCAC/vRA database owner;
   2.2) On "Object Explorer" window, click "Databases->VCAC/vRA database" to highlight VCAC/vRA database;
   2.3) Click "File->Open->File..." menu and then select "usp_RemoveVMFromVRA.sql" file on query window;
   2.4) Click "Execute" button on menu bar or "F5" key to install the stored procedure on VCAC database; You should see "Command(s) completed successfully." in message window after stored procedure is created in VCAC database;

3. Execute usp_RemoveVMFromVRA stored procedure on IAAS SQL Server database

   3.1) In "Object Explorer" window, expand "VCAC database->Programmability->Stored Procedures" to list all stored procedures in VCAC database;
   3.2) Find "usp_RemoveVMFromVRA" stored procedure, right click the stored procedure and select "Execute Stored Procedure...";
   3.3) In "Execute Procedure" window, input the virtual machine name into "Value" column of "@MachineName" parameter;
   3.4) Click "OK" button to execute the procedure;
   3.5) On bottom "Messages" pane, you will see message similar to the following:

        (*** row(s) affected)
        Remove workflow of the virtual machine

        (*** row(s) affected)
        Remove approval request of the virtual machine

        (*** row(s) affected)
        Remove all workflow maps of the virtual machine

        (*** row(s) affected)
        Remove all static IP addresses of the virtual machine

        (*** row(s) affected)
        Remove approval workflow of the virtual machine

        (*** row(s) affected)
        Remove virtual machine [Virutal Machine Name]

   3.6) If you see any other error messages showing up in Results or Messages window, that means there is error occurred during execution of the stored procedure. Please open a support ticket with VMware.

4. Log into the vRA Appliance and navigate to /opt/vmware/vpostgres/current/bin/

5. Inorder to remove the machine from postgres database, run the following commands on vRA Appliance. Make sure that the machine record belongs to the intended tenant. There can be 2 machines with same name but belonging to different tenants. Ensure that we remove the correct record.

      Run the following commands:
	su - postgres
        
        cd /opt/vmware/vpostgres/current/bin
        
        ./psql
        
        In psql console run,

        \c vcac

       SELECT * FROM cat_resource WHERE name='<machine name>' and tenant_id='<tenant name>';

       (make sure we see the machine, then, execute)

       update cat_resource set status = 'DELETED' where name = '<machine name>’ and tenant_id='<tenant name>';

This will remove the VM from vRA management but leave the VM in vCenter, so you'll want to either import it or remove it if needed. 
This does not delete the deployment in vRA, after removing stuck machines from vRA management, we should be able to delete the deployment from UI.