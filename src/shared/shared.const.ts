export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const authErrorMessages = {
    'auth/weak-password': 'Password must be 8 characters or more',
    'auth/email-already-in-use': 'This email is already in use',
    'auth/invalid-email': 'Email is invalid',
    'auth/wrong-password': 'Password is wrong. Please try again',
    'auth/user-not-found': 'This account does not exist. Please create a new account'
};