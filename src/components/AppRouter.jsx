import React, { useContext } from 'react';
import About from "../Pages/About"
import Posts from "../Pages/Posts"
import Error from "../Pages/Error"
import PostIdPage from '../Pages/PostIdPage';
import Login from '../Pages/Login';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AuthContext } from '../context';

import { routes } from '../router/routes';


const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    console.log(isAuth)
    return (
        isAuth
            ?
            <Routes>
                {/* тут он хочет оптемизировать код. И перенести всё что находится в Routes в отдельный компонент routes.js и от туда массивом это сюда подгружать. У меня это сделать не вышло(( */}
                {/* {routes.map(route => 
                    <Route 
                        component={route.component} 
                        path={route.path} 
                        exact={route.exact}
                    />
                )} */}
                <Route path="about" element={<About />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/:id" element={<PostIdPage />} />
                <Route path="error" element={<Error />} /> 
                <Route path="*" element={<Error />}/>
            </Routes>
            :
            <Routes>
                <Route path="login" element={<Login />} /> 
                <Route path="*" element={<Login />}/>
            </Routes>
        // он ещё прописывал key всем путям. У меня ошибок таких - нет. Видимо из за Routes
    );
};

export default AppRouter;