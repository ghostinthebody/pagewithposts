import About from "../Pages/About";
import { Posts } from "../Pages/Posts/Posts";
import { PostIdPage } from "../Pages/PostIdPage/PostIdPage";


export const routes = [
    {path: '/about', component: About, exact: true},
    {path: '/posts', component: Posts, exact: true},
    {path: '/about/:id', component: PostIdPage, exact: true}
]