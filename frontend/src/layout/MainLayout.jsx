import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

export default function MainLayout(){
    const chatRef = useRef();
    const {user, dispatch} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            if(data.authenticated){
                dispatch({type: "SET_USER", payload: data.user});
            }
        })
    }, []);

    return(
        <>
            <Header chatRef={chatRef} user={user}/>
            <Outlet context={{chatRef, user, dispatch}}/>
            <Footer/>
        </>
    );
}