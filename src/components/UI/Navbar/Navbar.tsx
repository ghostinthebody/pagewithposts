import { Link } from "react-router-dom"
import { MyButton } from '../button/MyButton';
import { useSelector, useDispatch } from 'react-redux';
import { LoginActions } from '../../../Pages/Login/slice/LoginSlice';
import classes from './Navbar.module.css'

// Типизация состояния Redux
interface RootState {
    // в моём случае состояние имеет поле login с полем isAuth: boolean
    login: {
      isAuth: boolean;
    };
}

// зачем React.FC я думал он нужен только что бы могли прописать что то в <>?
const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const { setIsAuth } = LoginActions;
    const isAuth = useSelector((state: RootState) => state.login.isAuth);

    const logout = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem('auth')
    }
    
    return isAuth && (
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