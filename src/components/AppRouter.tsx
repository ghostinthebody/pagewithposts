import React, { useContext } from 'react';
import { Login } from '../Pages/Login/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppSelector } from './hooks/useAppSelector';

import { routes } from './UI/Routes/routes';

const AppRouter = () => {
    // С дефолтным useSelector -- не работало
    const isAuth = useAppSelector((state) => state.login.isAuth);
    console.log(isAuth);
    return isAuth ? (
        <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
        </Routes>
    ) : (
        <Routes>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Login />} />
        </Routes>
    );
    // он ещё прописывал key всем путям. У меня ошибок таких - нет. Видимо из за Routes
};

export { AppRouter };
