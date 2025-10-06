import { useState, createContext } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState()

    return(
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    );
}