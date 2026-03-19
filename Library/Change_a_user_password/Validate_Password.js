/**
 * Validate Password
 *
 * @param {SecureString} password
 * @param {SecureString} confirmPassword
 */
if(password){
	if(password != confirmPassword){
		throw "Unable to create a new user: Password not confirmed";
	}
}