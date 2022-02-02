import { useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';

//Redux
import { actions, StateModel } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';

//Component

//Pages
import Nav from 'components/nav/Nav';
import SignupPage from 'pages/auth/signup/Signup';
import LoginPage from 'pages/auth/login/Login';
import AccountPage from 'pages/account/Account';
import VideoCreationPage from 'pages/videoCreation/VideoCreation';
import BrowseVideosPage from 'pages/browseVideos/BrowseVideos';

//Route History
import { AppLinks } from 'shared/shared.models';

//Styles
import 'styles/app.scss';



const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const isAuthenticated = useSelector((state: StateModel) => state.authState.isAuthenticated);


  const RequireAuth = ({ children, redirectTo }) => {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  useEffect(() => {
    //Persist user login
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(actions.auth.setAuthenticated(true));
      } else {
        dispatch(actions.auth.setAuthenticated(false));
      }
    })
  });

  useEffect(() => {
    dispatch(actions.auth.getUserAsync());
  }, [dispatch]);

  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path={AppLinks.Landing} element={ <LoginPage /> } />
        <Route path={AppLinks.Login} element={ <LoginPage /> } />
        <Route path={AppLinks.Signup} element={ <SignupPage /> } />
        <Route 
          path={AppLinks.Account} 
          element={ 
            <RequireAuth redirectTo={AppLinks.Login}>
              <AccountPage />
            </RequireAuth>
          } 
        />
        <Route 
          path={AppLinks.VideoCreation} 
          element={ 
            <RequireAuth redirectTo={AppLinks.Login}>
              <VideoCreationPage />
            </RequireAuth>
          } 
        />
        <Route 
          path={AppLinks.BrowseVideos} 
          element={ 
            <RequireAuth redirectTo={AppLinks.Login}>
              <BrowseVideosPage />
            </RequireAuth>
          } 
        />
      </Routes>
    </div>
  )
}

export default App;