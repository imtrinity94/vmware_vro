/**
 * Refreshes internal SRM plugin cache after the following changes in configuration: add, change or remove local VC; change in the credentials for local VC for which SRM is configured; change in the cerificates for local VC, local Lookup Service, local SRM or remote Lookup Service
 *
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.srm").refreshCache() ;