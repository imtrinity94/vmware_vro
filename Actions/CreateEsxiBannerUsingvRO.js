var configmanager = hostSystem.configManager;
var optionmanager = configmanager.advancedOption;

var bannerText = "UNAUTHORISED ACCESS TO THIS SYSTEM IS STRICTLY PROHIBITED \n\n All data and information held on or in or generated by this system is proprietary and confidential.  Any unauthorised access to, or use or disclosure of, such information is strictly prohibited, and may result in legal action against you, including but not limited to criminal or civil prosecution, to the full extent permitted by applicable law. All use of this system is subject to monitoring, retention and disclosure to the extent permitted or required by applicable law without further notice to you, and accessing the system constitutes your consent to such monitoring, retention and disclosure.";

var changedValue = new Array();
changedValue[0] = new VcOptionValue();
changedValue[0].value = SecBannerText;
changedValue[0].key = 'Annotations.WelcomeMessage';
optionmanager.updateOptions(changedValue);
