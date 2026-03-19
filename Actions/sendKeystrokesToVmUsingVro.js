/**
 * @description Sends a sequence of keystrokes to a virtual machine's console using vCenter's
 *              USB HID scan code API. Maps each character to its USB HID code and handles
 *              shift-modifier for uppercase letters and special characters.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {VC:VirtualMachine} vcVirtualMachine - The target virtual machine to send keystrokes to.
 * @param {string} keystrokeSequenceStr - The string of characters to type on the VM console.
 * @returns {void}
 */

var hidCodeLookupTable = {
    "a": "0x04", "b": "0x05", "c": "0x06", "d": "0x07", "e": "0x08", "f": "0x09",
    "g": "0x0a", "h": "0x0b", "i": "0x0c", "j": "0x0d", "k": "0x0e", "l": "0x0f",
    "m": "0x10", "n": "0x11", "o": "0x12", "p": "0x13", "q": "0x14", "r": "0x15",
    "s": "0x16", "t": "0x17", "u": "0x18", "v": "0x19", "w": "0x1a", "x": "0x1b",
    "y": "0x1c", "z": "0x1d", "1": "0x1e", "2": "0x1f", "3": "0x20", "4": "0x21",
    "5": "0x22", "6": "0x23", "7": "0x24", "8": "0x25", "9": "0x26", "0": "0x27",
    "!": "0x1e", "@": "0x1f", "#": "0x20", "$": "0x21", "%": "0x22", "^": "0x23",
    "&": "0x24", "*": "0x25", "(": "0x26", ")": "0x27", "_": "0x2d", "+": "0x2e",
    "{": "0x2f", "}": "0x30", "|": "0x31", ":": "0x33", "\"": "0x34", "~": "0x35",
    "<": "0x36", ">": "0x37", "?": "0x38", "-": "0x2d", "=": "0x2e", "[": "0x2f",
    "]": "0x30", "\\": "0x31", ";": "0x33", "'": "0x34", ",": "0x36", ".": "0x37",
    "/": "0x38", " ": "0x2c"
};

if (!keystrokeSequenceStr) {
    System.warn("Keystroke sequence is empty. No keys sent.");
    return null;
}

var charactersList = keystrokeSequenceStr.split("");
var scanCodeEventsArray = [];
var uppercasePattern = /[A-Z]/;
var shiftedSpecialPattern = /[~!@\#$%^&*()_+{}|:\"<>?]/;

System.log("Converting sequence to USB HID scan codes for VM: " + vcVirtualMachine.name);

var i;
for (i = 0; i < charactersList.length; i++) {
    var charToken = charactersList[i];
    var hidCodeHexStr = hidCodeLookupTable[charToken.toLowerCase()] || hidCodeLookupTable[charToken];
    
    if (hidCodeHexStr) {
        var keyEventObj = new VcUsbScanCodeSpecKeyEvent();
        var hidValueInt = parseInt(hidCodeHexStr, 16);
        
        // HID scan code format: (usagePage << 16) | usageID
        // USB Keyboard Usage Page is typically 7
        var formattedHidCode = (hidValueInt << 16) | 7;
        keyEventObj.UsbHidCode = formattedHidCode;

        // Apply Shift modifier for uppercase or specified special characters
        if (charToken.match(uppercasePattern) || charToken.match(shiftedSpecialPattern)) {
            var modifierSpec = new VcUsbScanCodeSpecModifierType();
            modifierSpec.leftShift = true;
            keyEventObj.modifiers = modifierSpec;
        }

        scanCodeEventsArray.push(keyEventObj);
    } else {
        System.warn("Character '" + charToken + "' could not be mapped to an HID code and will be skipped.");
    }
}

if (scanCodeEventsArray.length > 0) {
    var usbBatchSpec = new VcUsbScanCodeSpec();
    usbBatchSpec.keyEvents = scanCodeEventsArray;
    
    System.log("Dispatching " + scanCodeEventsArray.length + " HID events to VM console.");
    vcVirtualMachine.putUsbScanCodes(usbBatchSpec);
}

return null;
