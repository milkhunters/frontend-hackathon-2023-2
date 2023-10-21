const NAME_REGEXP = new RegExp(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Zа-яА-Я0-9._]+(?<![_.])$/);
const PASSWORD_REGEXP = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/);
const EMAIL_REGEXP = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
const CONFIRM_CODE_REGEXP = new RegExp(/^\d{6}$/);

export default {
	isNameValid(name) {
		return NAME_REGEXP.test(name);
	},

	isPasswordValid(password) {
		return PASSWORD_REGEXP.test(password);
	},

	isEmailValid(email) {
		return EMAIL_REGEXP.test(email);
	},

	isConfirmCodeValid(code) {
		return CONFIRM_CODE_REGEXP.test(code);
	},
};
