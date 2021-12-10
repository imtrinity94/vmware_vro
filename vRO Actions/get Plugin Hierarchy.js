var defId = ConfigurationManager.getPluginOptions().defaultAdServerId;
if (defId != null) {
   var hosts = Server.findAllForType("AD:AdHost")
   for (idx in hosts) {
      var host = hosts[idx]
      if (defId == host.hostConfiguration.id){
		return host;
      }
   }
}
