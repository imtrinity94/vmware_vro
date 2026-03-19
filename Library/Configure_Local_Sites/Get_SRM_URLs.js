/**
 * Get SRM URLs
 *
 * @param {string} PSC
 * @param {number} Port
 * @param {string} Path
 * @return {Array/string} SrmUrls
 * @return {string} UrlError
 */
/* Copyright (c) 2015-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */
SrmUrls = SRMPluginConfig.getSrmUrls(PSC, Port, Path);
if(SrmUrls == null || SrmUrls.length < 1) {
	UrlError = "Unable to get SRM URL"
}