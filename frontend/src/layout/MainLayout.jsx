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
    const [chat, setChat] = useState();

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
            if (chatRef && !chatRef.current?.contains(e.target) && chatRef.current.classList?.contains('chat-active')) {
                chatRef.current?.classList.remove('chat-active');
            }
            if(filterRef && !filterRef.current?.contains(e.target) && filterRef.current?.classList.contains('filter-popup-active')){
                filterRef.current?.classList.remove('filter-popup-active');
                console.log('filter');
            }
            if(langRef && !langRef.current?.contains(e.target) && langRef.current?.classList.contains('lang-dropdown-active')){
                langRef.current?.classList.remove('lang-dropdown-active');
                console.log('lang');
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
            <Header chatRef={chatRef} user={user} chat={chat} setChat={setChat}/>
            <Outlet context={{ chatRef, user, dispatch, isLoading, filterRef, handleFilterDropdown, chat, setChat}}/>
            <Footer langRef={langRef} language={language} setLanguage={setLanguage}/>
        </>
    );
}