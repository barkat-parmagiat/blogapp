import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/main.css';
import 'alertifyjs/build/css/alertify.css';

const Login = lazy(() => import('./Component/Login'));
const Registration = lazy(() => import('./Component/Registration'));
const Profile = lazy(() => import('./Component/Profile'));
const AddProfile = lazy(() => import('./Component/AddProfile'));
const Timeline = lazy(() => import('./Component/Timeline'));
const Setting = lazy(() => import('./Component/Setting'));
const ChangePassword = lazy(() => import('./Component/ChangePassword'));
const Home = lazy(() => import('./Component/Home'));
const FriendsConnector = lazy(() => import('./Component/FriendsConnector'));

function App() {
  let isLogin = localStorage.getItem('Login');
  return (
    <Router>
      <Suspense fallback={<p>loading</p>}>
        <Routes>
          <Route exact path={'/'} name="home" component={<Home />} />
          <Route exact path={`/home`} name="Home" component={<Home />} />
          <Route exact path={`/login`} name="Login" component={<Login />} />
          <Route
            exact
            path={`/registration`}
            name="Registration"
            component={<Registration />}
          />
          <Route
            exact
            path={`/profile`}
            name="Profile"
            component={<Profile />}
          />
          <Route
            exact
            path={'/profile/:id'}
            name="AddProfile"
            component={<AddProfile />}
          />
          {/*  <PrivateRoute path={`/`}>{isLogin && <Profile />}</PrivateRoute> */}
          <Route
            exact
            path={`/timeline`}
            name="Timeline"
            component={<Timeline />}
          />
          <Route
            exact
            path={`/setting`}
            name="Setting"
            component={<Setting />}
          />
          <Route
            exact
            path={`/changePassword`}
            name="ChangePassword"
            component={<ChangePassword />}
          />
          <Route
            exact
            /*  path={`/friends/${u_id}`} */
            path={`/friends`}
            name="FriendsConnector"
            component={<FriendsConnector />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
