import * as actionTypes from './authActionTypes';
import { AuthStateModel } from './authStateModel';
import { mergeUpdateObj } from 'shared/shared.utilities';



export const initialCostsState: AuthStateModel = {};


const authReducer = (state: AuthStateModel = initialCostsState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATING:
            return mergeUpdateObj(state, { authenticating: action.payload });
        case actionTypes.LOGIN_SUCCESS:
            return mergeUpdateObj(state, { loggedIn: action.payload });
        case actionTypes.LOGIN_FAILURE:
            return mergeUpdateObj(state, { loginErrorMessage: action.payload });
        case actionTypes.SIGNUP_FAILURE:
            return mergeUpdateObj(state, { signupErrorMessage: action.payload });
        case actionTypes.SET_AUTHENTICATED:
            return mergeUpdateObj(state, { isAuthenticated: action.payload });
        case actionTypes.GET_USER_SUCCESS:
            return mergeUpdateObj(state, { user: action.payload });
    }

    return state;
}



export default authReducer;