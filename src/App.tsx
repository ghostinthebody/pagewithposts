import React, {useEffect, useMemo, useState} from "react"
import './styles/App.css'
import { AppRouter } from "./components/AppRouter"
import { useSelector, useDispatch } from 'react-redux';
import { LoginActions } from './Pages/Login/slice/LoginSlice'; 
import { Navbar } from "./components/UI/Navbar/Navbar"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"


export const App = () => {
    const dispatch = useDispatch();
    const { setIsAuth } = LoginActions;
  
    useEffect(() => {
      if (localStorage.getItem('auth')) {
        dispatch(setIsAuth(true)); 
      }
    }, [dispatch]);
  
    return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    );
  };