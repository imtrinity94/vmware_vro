/**
 * Check appliance update baseline
 *
 * @param {Array/VUM:Baseline} baselines
 * @return {boolean} virtualApplianceBaselinePresenceBool
 * @return {Array/VUM:Baselines} virtualApplianceBaselines
 */
virtualApplianceBaselinePresenceBool = false;
virtualApplianceBaselines = VumObjectManager.getVirtualApplianceBaselines(baselines);

if (virtualApplianceBaselines && virtualApplianceBaselines.length > 0) {
   virtualApplianceBaselinePresenceBool = true;
}
