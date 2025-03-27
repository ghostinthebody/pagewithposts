import React, {useEffect, useMemo, useState} from "react"
import './styles/App.css'
import AppRouter from "./components/AppRouter"
import { AuthContext } from "./context"

import Navbar from "./components/UI/Navbar/Navbar"
// это всё приколы BrowserRouter
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


export const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    // почему запись AuthContext.Provider именно такая? Почему мы должны всё вкладывать в неё. Почему нельзя как Navbar вызвать?

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth: setIsAuth
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}