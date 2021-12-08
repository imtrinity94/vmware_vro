//input Vc:SDkConnection
customizationSpecManager = sdkConnection.customizationSpecManager;
System.warn ("customizationSpecManager found : " + customizationSpecManager);

customizationSpec = customizationSpecManager.getCustomizationSpec(customizationSpecName);
customSpecInfo = customizationSpec.info;
customSpecName = customSpecInfo.name;
System.warn ("customSpecName found to use : " + customSpecName);
