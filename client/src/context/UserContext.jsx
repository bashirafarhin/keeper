import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [ details, setDetails ] = useState({
        notes : [],
        backgroundImage : "",
});
    return (
        <UserContext.Provider value={{ details, setDetails }}>
            {children}
        </UserContext.Provider>
    )
}