export interface UserProps {
	_id?: string;
	email: string;
	password: string;
	role: string;
	fullname: string;
	address: string;
	phone: string;
	deleted?: number;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserRegister {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserChangePassword {
	password: string;
	newPassword: string;
	confirmPassword: string;
}

export interface UserResetPassword {
	newPassword: string;
	confirmPassword: string;
}

export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
	message?: string;
	success?: boolean;
}