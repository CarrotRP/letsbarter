import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";
import { useRef } from "react";

export default function MainLayout(){
    const chatRef = useRef();

    return(
        <>
            <Header chatRef={chatRef}/>
            <Outlet context={chatRef}/>
            <Footer/>
        </>
    );
}