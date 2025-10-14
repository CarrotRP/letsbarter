import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
//socket
import { io } from 'socket.io-client';
import { SocketContext } from "../context/SocketContext";
import Ads from "../component/Ads";

export default function MainLayout(props) {
    const { language, setLanguage } = props;
    const chatRef = useRef();
    const filterRef = useRef();
    const langRef = useRef();
    const viewImgRef = useRef();
    const viewImgBgRef = useRef();
    const donoRef = useRef();
    const donoBgRef = useRef();
    const { user, dispatch } = useContext(UserContext);
    const { socket, setSocket } = useContext(SocketContext);
    const [isLoading, setIsLoading] = useState(true);
    const [viewImg, setViewImg] = useState(); //in chat view image
    const [chat, setChat] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    dispatch({ type: "SET_USER", payload: data.user });
                    setSocket(io.connect('http://localhost:3000', { withCredentials: true }));
                }
            }).finally(() => {
                setIsLoading(false);
            })

        // outside click
        const handleOutsideClick = (e) => {
            // if(viewImgBgRef.current?.classList.contains('view-img-active')){
            if (viewImgBgRef.current && viewImgBgRef.current?.classList.contains('view-img-active') && !viewImgRef.current?.contains(e.target)) {
                setViewImg(null);
                viewImgBgRef.current?.classList.remove('view-img-active');
                document.body.style.overflow = null;
                return;
            }
            // }
            if (chatRef && !chatRef.current?.contains(e.target) && chatRef.current?.classList?.contains('chat-active')) {
                chatRef.current?.classList.remove('chat-active');
            }
            if (filterRef && !filterRef.current?.contains(e.target) && filterRef.current?.classList?.contains('filter-popup-active')) {
                filterRef.current?.classList.remove('filter-popup-active');
            }
            if (langRef && !langRef.current?.contains(e.target) && langRef.current?.classList?.contains('lang-dropdown-active')) {
                langRef.current?.classList.remove('lang-dropdown-active');
            }

            if (donoBgRef && !donoRef.current?.contains(e.target) && donoBgRef.current?.classList?.contains('dono-popup-active')) {
                donoBgRef.current?.classList.remove('dono-popup-active');
                document.body.style.overflow = null;
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
            <Header chatRef={chatRef} user={user} chat={chat} setChat={setChat} viewImgRef={viewImgRef} viewImgBgRef={viewImgBgRef} viewImg={viewImg} setViewImg={setViewImg} />
            <Outlet context={{ chatRef, user, dispatch, isLoading, filterRef, handleFilterDropdown, chat, setChat }} />
            <Footer langRef={langRef} language={language} setLanguage={setLanguage} donoRef={donoRef} donoBgRef={donoBgRef} />
        </>
    );
}