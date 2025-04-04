import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { MyButton } from '../button/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import { LoginActions } from '../../../Pages/Login/slice/LoginSlice';
import classes from './Navbar.module.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const { setIsAuth } = LoginActions;


    const logout = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link to="/about" className={classes.navLink}>О сайте</Link>
                <Link to="/posts" className={classes.navLink}>Посты</Link>
                <Link to="/OLDposts" className={classes.navLink}>К старым постам</Link>
                <Link to="/todoList" className={classes.navLink}>Список дел</Link>
            </div>
        </div>
    );
};

export { Navbar };