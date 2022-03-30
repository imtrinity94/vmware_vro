// Input#1 ‘vm’ Type: VC:VirtualMachine
// Input#2 ‘string’ Type: String

var hidCharacterMap = {
		"a" : "0x04",
		"b" : "0x05",
		"c" : "0x06",
		"d" : "0x07",
		"e" : "0x08",
		"f" : "0x09",
		"g" : "0x0a",
		"h" : "0x0b",
		"i" : "0x0c",
		"j" : "0x0d",
		"k" : "0x0e",
		"l" : "0x0f",
		"m" : "0x10",
		"n" : "0x11",
		"o" : "0x12",
		"p" : "0x13",
		"q" : "0x14",
		"r" : "0x15",
		"s" : "0x16",
		"t" : "0x17",
		"u" : "0x18",
		"v" : "0x19",
		"w" : "0x1a",
		"x" : "0x1b",
		"y" : "0x1c",
		"z" : "0x1d",
		"1" : "0x1e",
		"2" : "0x1f",
		"3" : "0x20",
		"4" : "0x21",
		"5" : "0x22",
		"6" : "0x23",
		"7" : "0x24",
		"8" : "0x25",
		"9" : "0x26",
		"0" : "0x27",
		"!" : "0x1e",
		"@" : "0x1f",
		"#" : "0x20",
		"$" : "0x21",
		"%" : "0x22",
		"^" : "0x23",
		"&" : "0x24",
		"*" : "0x25",
		"(" : "0x26",
		")" : "0x27",
		"_" : "0x2d",
		"+" : "0x2e",
		"{" : "0x2f",
		"}" : "0x30",
		"|" : "0x31",
		":" : "0x33",
		"\"" : "0x34",
		"~" : "0x35",
		"<" : "0x36",
		">" : "0x37",
		"?" : "0x38",
		"-" : "0x2d",
		"=" : "0x2e",
		"[" : "0x2f",
		"]" : "0x30",
		"\\" : "0x31",
		";" : "0x33",
		"'" : "0x34",
		"," : "0x36",
		"." : "0x37",
		"/" : "0x38",
		" " : "0x2c"
		}

var charArray = string.split("");
var hidCodesEvents = [];
var upperMatch = /[A-Z]/;
var specialMatch = /[~!@\#$%^&*()_+{}|:\"<>?]/;

for each (character in charArray) {

	if (hidCharacterMap[character]){
		var keyEvent = new VcUsbScanCodeSpecKeyEvent();
		var hidCode = hidCharacterMap[character];
		var hidCodeHexToInt = parseInt(hidCode, "16");
		var hidCodeValue = (hidCodeHexToInt << 16) | 0007;
		keyEvent.UsbHidCode = hidCodeValue;
		
		if (character.match(upperMatch) || character.match(specialMatch)) {
			var modifier = new VcUsbScanCodeSpecModifierType();
			modifier.leftShift = true;
			keyEvent.modifiers = modifier;
		}
		
		hidCodesEvents.push(keyEvent);
	} else {
		System.log("Unable to convert character: " + character);
	}
}

var spec = new VcUsbScanCodeSpec();
spec.keyEvents = hidCodesEvents;
var results = vm.putUsbScanCodes(spec);
