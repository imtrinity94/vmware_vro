/**
 * Get remote VC URL
 *
 * @param {SRM:Site} Site
 * @return {string} VcUrl
 * @return {string} UrlError
 */
/* Copyright (c) 2015-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */
VcUrl = Site.getRemoteVcUrl();
if(VcUrl == null || VcUrl == "") {
	UrlError = "Unable to get remote VC URL";
}