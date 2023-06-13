/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'

export const PrivateRoute = ({children}) => {
    const { isAuthenticated }=useAuthContext();

    let location = useLocation();

  return isAuthenticated ? children : <Navigate to="/signin" state={{ from: location }} />
}
