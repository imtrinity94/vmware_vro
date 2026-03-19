/**
 * Get remote lookup service URL
 *
 * @param {SRM:Site} Site
 * @return {string} LsUrl
 * @return {string} UrlError
 */
/* Copyright (c) 2015-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */
LsUrl = Site.getRemoteLsUrl();
if(LsUrl == null || LsUrl == "") {
	UrlError = "Unable to get remote LS URL. The remote site is not available or is not paired.";
}