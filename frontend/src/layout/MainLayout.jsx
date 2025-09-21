import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

export default function MainLayout(){
    const chatRef = useRef();
    const {user, dispatch} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            if(data.authenticated){
                dispatch({type: "SET_USER", payload: data.user});
            }
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    return(
        <>
            <Header chatRef={chatRef} user={user}/>
            <Outlet context={{chatRef, user, dispatch, isLoading}}/>
            <Footer/>
        </>
    );
}