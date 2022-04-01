import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    let isLoggedIn = useSelector((state : RootState) => state.sessionReducer.isLoggedIn);
    return isLoggedIn ?  children : <Navigate to="/login" state={{ from: location }}/>;
}

export default PrivateRoute;