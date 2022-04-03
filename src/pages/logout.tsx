import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { sessionActions } from "../redux/actions/sessionActions";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(sessionActions.logout());
        navigate('/');
    });

    return(
        null
    );
};

export default LogoutPage;