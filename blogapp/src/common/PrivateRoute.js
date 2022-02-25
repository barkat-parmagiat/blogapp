import { Route, Routes, Navigate } from 'react-router-dom';
const PrivateRoute = (props) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      render={() =>
        token ? (
          props.children
        ) : (
          <Navigate
            to={{
              path: '/timeline',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
