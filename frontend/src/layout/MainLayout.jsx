import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";

export default function MainLayout(props) {
    const { language, setLanguage} = props;
    const chatRef = useRef();
    const filterRef = useRef();
    const langRef = useRef();
    const { user, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    dispatch({ type: "SET_USER", payload: data.user });
                }
            }).finally(() => {
                setIsLoading(false);
            })

        // outside click
        const handleOutsideClick = (e) => {
            if (chatRef && !chatRef.current.contains(e.target)) {
                chatRef.current.classList.remove('chat-active');
            }
            if(filterRef && !filterRef.current?.contains(e.target)){
                filterRef.current?.classList.remove('filter-popup-active');
            }
            if(langRef && !langRef.current?.contains(e.target)){
                langRef.current?.classList.remove('lang-dropdown-active');
            }
        }
        const handleScroll = () => {
            chatRef.current.classList.remove('chat-active');
            filterRef.current?.classList.remove('filter-popup-active');
        }

        //listeners
        document.addEventListener('click', handleOutsideClick);

        window.addEventListener('scroll', handleScroll);

        //cleaners
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    const handleFilterDropdown = (e) => {
        e.stopPropagation();
        filterRef.current.classList.toggle('filter-popup-active')
    }

    return (
        <>
            <Header chatRef={chatRef} user={user} />
            <Outlet context={{ chatRef, user, dispatch, isLoading, filterRef, handleFilterDropdown }} />
            <Footer langRef={langRef} language={language} setLanguage={setLanguage}/>
        </>
    );
}