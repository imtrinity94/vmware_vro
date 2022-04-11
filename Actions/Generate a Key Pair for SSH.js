try
{
	var strFingerPrint;
		strFingerPrint = KeyPairManager.generateKeyPair("dsa", "../server/vmo/conf/vco_key_for_ssh", "P@ssw0rd1!", 2048, "");

	Server.log(strFingerPrint);
}
catch (e)
{
	Server.error("Failed to generate key pair", e);
}
