import { combineReducers } from 'redux';


import authReducer from './auth/authReducers';

import { authActionTriggers } from './auth/authActions';

import { AuthStateModel } from './auth/authStateModel';




export const reducers = combineReducers({
    authState: authReducer
});

export const actions = {
    auth: {
        ...authActionTriggers
    }
};

export interface StateModel {
    authState: AuthStateModel;
};