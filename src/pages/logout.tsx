import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { sessionActions } from "../redux/actions/sessionActions";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => sessionActions.logout(dispatch);
    
    useEffect(() => {
        logout();
        navigate('/');
    });

    return(
        null
    );
};

export default LogoutPage;