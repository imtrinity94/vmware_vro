var hosts = VclHostManager.getHostList();
if (hosts != null) {
	for (var i = 0; i < hosts.length; i++) {
		hosts[i].login();
	}
}
return hosts;
