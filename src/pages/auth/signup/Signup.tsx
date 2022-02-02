import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { passwordStrength as ps } from 'check-password-strength';
import _ from 'lodash';


//Redux
import { StateModel, actions } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

//Components
import Input from 'components/input/Input';
import Button from 'components/button/Button';

//Helpers
import { validateEmail, validatePassword } from 'shared/shared.utilities';
import { AppLinks } from 'shared/shared.models';

//Styles
import './signup.scss';
import Logo from 'assets/logo.svg';




const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Selectors
    const authenticating = useSelector((state: StateModel) => state.authState.authenticating);
    const authenticated = useSelector((state: StateModel) => state.authState.isAuthenticated);
    const signupErrorMessage = useSelector((state: StateModel) => state.authState.signupErrorMessage);

    const signup = () => {
        dispatch(actions.auth.signupAsync(firstName, lastName, email, password));
    };

    useEffect(() => {
        if (authenticated) {
            navigate(AppLinks.VideoCreation, { replace: true });
        }
    }, [navigate, authenticated]);

    useEffect(() => {
        dispatch(actions.auth.signupFailure(""));
    }, [dispatch]);

    const pc = {
        "Too weak": '#fff',
        "Weak": '#eb3b5a',
        "Medium": '#f7b731',
        "Strong": '#42af69',
    };

    return (
        <div className="auth-page">
            <h1>Create an account</h1>
            <img src={Logo} alt="Background Logo" className="bg-image" />
            <section className='auth-page-content'>
                <div className="input-wrapper">
                    <Input 
                        label='First name'
                        type='firstName'
                        value={firstName}
                        onChange={(val) => setFirstName(val)}
                    />
                </div>
                <div className="input-wrapper" style={{ marginTop: '30px' }}>
                    <Input 
                        label='Last name'
                        type='lastName'
                        value={lastName}
                        onChange={(val) => setLastName(val)}
                    />
                </div>
                <div className="input-wrapper" style={{ marginTop: '30px' }}>
                    <Input 
                        label='Email Address'
                        type='email'
                        value={email}
                        onChange={(val) => setEmail(val)}
                    />
                </div>
                <div className="input-wrapper" style={{ marginTop: '30px' }}>
                    <Input 
                        label='Password'
                        type='password'
                        link={<span style={{ color: pc[ps(password).value] }}>{ps(password).value}</span>}
                        value={password}
                        onChange={(val) => setPassword(val)}
                    />
                </div>
                <div className="action">
                    <Button 
                        text='Sign Up'  
                        loading={authenticating}
                        disabled={!firstName || !lastName || validateEmail(email).error || validatePassword(password).error}
                        onClick={signup}
                    />
                </div>
                {!_.isEmpty(signupErrorMessage) ?
                    <div className="error">
                        { signupErrorMessage }
                    </div> : null
                }
                <div className="prompt">
                    Already a user? <Link to={AppLinks.Login}> Login</Link>
                </div>
            </section>
        </div>
    )
}



export default SignupPage;