import * as actionTypes from './authActionTypes';
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { authErrorMessages } from 'shared/shared.const';

//Route History
import { UserModel } from './authStateModel';





//Default
export const authenticating = (status: boolean) => {
    return {
        type: actionTypes.AUTHENTICATING,
        payload: status
    }
};

export const setAuthenticated = (status: boolean) => {
    return {
        type: actionTypes.SET_AUTHENTICATED,
        payload: status
    }
};



//Success
export const loginSuccess = (status: boolean) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: status
    }
}

export const getUserSuccess = (user: UserModel) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        payload: user
    }
}


//Failure
export const signupFailure = (signupErrorMessage: string) => {
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload: signupErrorMessage
    }
}

export const loginFailure = (loginErrorMessage: string) => {
    return {
        type: actionTypes.LOGIN_FAILURE,
        payload: loginErrorMessage
    }
}




//Triggers
export const signupAsync = (
    firstName: string,
    lastName: string,
    email: string, 
    password: string
) => {
    return dispatch => {
        const auth = getAuth();

        dispatch(authenticating(true));
        dispatch(signupFailure(""));

        createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            const userId = auth.currentUser.uid;
            const profiles = firebase.firestore().collection("profiles").doc(userId);

            updateProfile(auth.currentUser, {
                displayName: firstName
            });

            if (userId) {
                profiles.set({
                    firstName, lastName, email
                })
                .then(() => { dispatch(authenticating(false)); })
            }
        })
        .catch((error) => {
            dispatch(authenticating(false));
            dispatch(signupFailure(authErrorMessages[error.code]));
        })
    }
}

export const loginAsync = (email: string, password: string) => {
    return dispatch => {
        const auth = getAuth();

        dispatch(authenticating(true));
        dispatch(loginFailure(""));


        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            dispatch(authenticating(false));
        })
        .catch(error => {
            dispatch(authenticating(false));
            dispatch(loginFailure(authErrorMessages[error.code]));
        })
    }
}


export const signoutAsync = () => {
    return (dispatch) => {
        const auth = getAuth();

        signOut(auth)
        .then(() => {})
        .catch(error => {
            
        })
    }
}

export const getUserAsync = () => {
    return dispatch => {  
        const auth = getAuth();
        
        auth.onAuthStateChanged((user) => {
            if(user) {
              firebase.firestore().collection('profiles').doc(user.uid)
              .onSnapshot(snapshot => {

                //Check if user already exists in db
                if(snapshot.exists) {
                    let currentuserDetails = snapshot.data() as UserModel;
                    dispatch(getUserSuccess(currentuserDetails));
                } else {}

              }, (error) => {})
            } else {
              //No user profile found
            }
        })

    }
}


//Bundle and export all auth actions
export const authActionTriggers = {
    setAuthenticated: (status: boolean) => setAuthenticated(status),
    loginAsync: (email: string, password: string) => loginAsync(email, password),
    signupAsync: (firstName: string, lastName: string, email: string, password: string) => signupAsync(firstName, lastName, email, password),
    getUserAsync: () => getUserAsync(),
    signoutAsync: () => signoutAsync(),
    signupFailure: (signupErrorMessage: string) => signupFailure(signupErrorMessage),
    loginFailure: (loginErrorMessage: string) => loginFailure(loginErrorMessage)
};