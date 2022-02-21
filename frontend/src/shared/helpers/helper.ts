import { tokenKey } from '../constants'

export const validatePattern = (value: string, patterns: RegExp[]) => {
	return patterns.reduce((isValid, item) => {
		isValid = isValid ? isValid : item.test(value);
		return isValid;
	}, false);
}

export const validateForm = (formData: any): {formData: any, isFormValid: boolean} => {
	let isFormValid = true;

	const validatedFormData = Object.keys(formData).reduce((acc, key) => {
		if(formData[key] && formData[key].pattern) {
		acc[key].valid = validatePattern(formData[key].value, formData[key].pattern);
				if(!acc[key].valid) isFormValid = false
		}
		return formData;
  	}, formData);

	return {formData: validatedFormData, isFormValid}
}

export const storeToken = (token: string) => {
	localStorage.setItem(tokenKey, token);
}

export const getToken = () => {
	return localStorage.getItem(tokenKey);
}

export const removeToken = () => {
	localStorage.removeItem(tokenKey);
}