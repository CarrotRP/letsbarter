import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";

export default function MainLayout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}