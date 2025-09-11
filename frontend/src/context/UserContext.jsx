import { useReducer, createContext } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {user: action.payload}
        case 'LOGOUT_USER':
            return {user: null};
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {user: null})
    
    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}