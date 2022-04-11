var strEncoded;
	strEncoded = "";

var arrBytes;

try
{
	arrBytes = strInputText.getBytes("UTF-8");
}
catch (objException)
{
	arrBytes = strInputText.getBytes();
}

var intPaddingCount;
	intPaddingCount = (3 - (arrBytes.length % 3)) % 3;

var bytPadded;
	bytPadded = new Byte[arrBytes.length + intPaddingCount];

arrBytes = System.arraycopy(arrBytes, 0, bytPadded, 0, arrBytes.length);

for ( var i = 0; i < arrBytes.length; i += 3 )
{
	var strChar;
		strChar = ((arrBytes[i] & 0xff) << 16) + ((arrBytes[i + 1] & 0xff) << 8) + (arrBytes[i + 2] & 0xff);

	var strEncoded;
		strEncoded = strEncoded + strCharactersBase64.charAt((strChar >> 18) & 0x3f) + strCharactersBase64.charAt((strChar >> 12) & 0x3f) + strCharactersBase64.charAt((strChar >> 6) & 0x3f) + strCharactersBase64.charAt(strChar & 0x3f);
}

var strTextToEncode;
	strTextToEncode = strEncoded.substring(0, strEncoded.length() - intPaddingCount) + "==".substring(0, intPaddingCount);

var strLines;
	strLines = "";

for ( var i = 0; i < strTextToEncode.length(); i += 76 )
{
	strLines += strTextToEncode.substring(i, Math.min(strTextToEncode.length(), i + 76));
	strLines += "\r\n";
}
