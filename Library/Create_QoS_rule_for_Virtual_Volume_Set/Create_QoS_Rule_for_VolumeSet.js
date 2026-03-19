/**
 * Create QoS Rule for VolumeSet
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} qosVvSetNme
 * @param {number} priority
 * @param {number} bwMinGoalKB
 * @param {number} bwMaxLimitKB
 * @param {number} ioMinGoal
 * @param {number} ioMinGoalOP
 * @param {number} ioMaxLimitOP
 * @param {number} latencyGoal
 * @param {boolean} defaultLatency
 * @param {boolean} enable
 * @param {number} ioMaxLimit
 * @param {number} bwMinGoalOP
 * @param {number} bwMaxLimitOP
 * @param {number} latencyGoaluSecs
 * @return {string} qosRule
 */

qosRule = connection.createQoSRuleforVVSet(qosVvSetNme,priority,bwMinGoalKB,bwMaxLimitKB,ioMinGoal,ioMaxLimit,bwMinGoalOP,
                                                bwMaxLimitOP ,ioMinGoalOP,ioMaxLimitOP,latencyGoal,defaultLatency,enable,latencyGoaluSecs) ;

if(qosRule!=null && qosRule!=undefined) {

	System.log("QoS rule for Virtual Volume Set \""+qosVvSetNme.name +"\" created successfully!");
    System.debug("QoS rule Created: " + qosRule);

}