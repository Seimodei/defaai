import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import './login.scss';
import Logo from 'assets/logo.svg';





const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Selectors
    const authenticating = useSelector((state: StateModel) => state.authState.authenticating);
    const authenticated = useSelector((state: StateModel) => state.authState.isAuthenticated);
    const loginErrorMessage = useSelector((state: StateModel) => state.authState.loginErrorMessage);

    const login = () => {
        dispatch(actions.auth.loginAsync(email, password));
    };

    useEffect(() => {
        //Check if user is authenticated to prevent re-login
        if (authenticated) {
            navigate(AppLinks.VideoCreation, { replace: true });
        }
    }, [navigate, authenticated]);

    useEffect(() => {
        dispatch(actions.auth.loginFailure(""));
    }, [dispatch]);

    return (
        <div className="auth-page">
            <h1>Sign In</h1>
            <img src={Logo} alt="Background Logo" className="bg-image" />
            <section className='auth-page-content'>
                <div className="input-wrapper">
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
                        link={<Link to={AppLinks.Landing}>Forgot?</Link>}
                        value={password}
                        onChange={(val) => setPassword(val)}
                    />
                </div>
                <div className="action">
                    <Button 
                        text='Login' 
                        loading={authenticating}
                        disabled={validateEmail(email).error || validatePassword(password).error}
                        onClick={login}
                    />
                </div>
                {!_.isEmpty(loginErrorMessage) ?
                    <div className="error">
                        { loginErrorMessage }
                    </div> : null
                }
                <div className="prompt">
                    New here? <Link to={AppLinks.Signup}> Sign Up</Link>
                </div>
            </section>
        </div>
    )
}



export default LoginPage;