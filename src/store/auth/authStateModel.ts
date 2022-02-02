export interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
}




export interface AuthStateModel {
    user?: UserModel;
    isAuthenticated?: boolean;
    authenticating?: boolean;
    loggedIn?: boolean;
    loginErrorMessage?: string;
    signupErrorMessage?: string;
}