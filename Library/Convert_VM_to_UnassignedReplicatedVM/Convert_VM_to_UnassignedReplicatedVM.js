/**
 * Convert VM to UnassignedReplicatedVM
 *
 * @param {VC:VirtualMachine} VM
 * @param {SRM:Site} Site
 * @return {SRM:UnassignedReplicatedVm} UnassignedReplicatedVM
 */
/* Copyright (c) 2015-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */
UnassignedReplicatedVM = Server.findForType("SRM:UnassignedReplicatedVm", Site.getDeploymentId() + "_" + VM.id);
