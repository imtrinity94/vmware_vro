var charSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var passWord = "";
var charPos = "";

for (i = 0; i < passLength; i++) {
	charPos = Math.floor(Math.random() * charSet.length);
	var passChar = charSet.charAt(charPos);
	passWord += passChar;
}

return passWord;
