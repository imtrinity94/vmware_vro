profile=hostProfileManager.findAssociatedProfile(host)[0];

exec=profile.executeHostProfile(host);

taskID=hostProfileManager.applyHostConfig_Task(host,exec.configSpec);

stuff=System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(taskID,false,2);
