import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRouter = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

PrivateRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
