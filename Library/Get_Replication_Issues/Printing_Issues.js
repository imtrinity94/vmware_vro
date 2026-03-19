/**
 * Printing Issues
 *
 * @param {Array/VR:ReplicationIssue} replicationIssue
 * @return {Array/VR:ReplicationIssue} replicationIssue
 */
System.log(replicationIssue.length + " Replication issues found.");
if (replicationIssue.length > 0) {
   for (i = 0; i < replicationIssue.length; i++) {
      var issue = replicationIssue[i];
      System.log("VM with issues: " + issue.getTargetObjectName());
      System.log("               Issue type: " + issue.getIssueType());
      System.log("               Severity: " + issue.getSeverity());
      System.log("               Occured on: " + issue.getTriggeredTime());
      var errorMessage = "N/A";
      if (issue.getFault() &&
          issue.getFault() != null &&
          issue.getFault() != "") {
         errorMessage = issue.getFault().getMessage();
      }
      System.log("               Error message: " + errorMessage);
      System.log("               Source site Uuid: " + issue.getSourceSiteUuid());
      System.log("               Destination site Uuid: " + issue.getDestinationSiteUuid());
   }
}