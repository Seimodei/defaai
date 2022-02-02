import { emailRegex } from 'shared/shared.const';


export const mergeUpdateObj = (prevObj, nextObj) => {
	return {
		...prevObj,
		...nextObj
	};
};

export const validateEmail = (email: string) => {
	const emailIsCorrect = emailRegex.test(email);

	switch (true) {
		case !email.length:
			return {
				error: true,
				message: 'Email is required'
			}
		case !emailIsCorrect:
			return {
				error: true,
				message: "Email is invalid. Please check your email and try again."
			}
		default:
			return {
				error: false,
				message: ''
			}
	}
}

export const validatePassword = (password: string) => {
	switch (true) {
		case !password.length:
			return {
				error: true,
				message: 'Password is required'
			}
		case password.length < 8:
			return {
				error: true,
				message: 'Password is invalid. Please try again'
			}
		default:
			return {
				error: false,
				message: ''
			}
	}
}
