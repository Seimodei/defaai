import { Link, useLocation, useNavigate } from 'react-router-dom';

//Redux
import { StateModel, actions } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

//Components
import { faVideo, faPlayCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Helpers
import { AppLinks } from 'shared/shared.models';

//Styles
import './nav.scss';
import Logo from 'assets/logo.svg';
import Profile from 'assets/profile.svg';
import { Fragment } from 'react';


const Nav = () => {
    const pathName = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Selectors
    const isAuthenticated = useSelector((state: StateModel) => state.authState.isAuthenticated);

    return (
        <div className="nav">
             <div className="nav-content">
                <Link to={isAuthenticated ? AppLinks.VideoCreation : AppLinks.Login}>
                    <img src={Logo} alt="Defaai Logo" />
                </Link>

                {isAuthenticated && (
                    <Fragment>
                        <div className="page-links">
                            <Link to={AppLinks.VideoCreation} className={`link ${pathName === AppLinks.VideoCreation ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faVideo} />
                            </Link>

                            <Link to={AppLinks.BrowseVideos} className={`link ${pathName === AppLinks.BrowseVideos ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </Link>
                        </div>

                        <div className="user-zone">
                            <div className="user">
                                <Link to={AppLinks.Account}>
                                    <img src={Profile} alt="User Profile/Account" />
                                </Link>
                            </div>
                            <div 
                                className="sign-out" 
                                onClick={() => {
                                    dispatch(actions.auth.signoutAsync());
                                    navigate(AppLinks.Login, { replace: true });
                                }}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                        </div>
                    </Fragment>
                )}
             </div>
        </div>
    )
};



export default Nav;