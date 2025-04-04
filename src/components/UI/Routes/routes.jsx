import { About } from '../../../Pages/About';
import { Posts } from '../../../Pages/Posts/Posts';
import { OLDPosts } from '../../../Pages/OLDPost/OLDPosts';
import { PostIdPage } from '../../../Pages/PostIdPage/PostIdPage';
import { Error } from '../../../Pages/Error';

export const routes = [
  { path: '/about', element: <About /> },
  { path: '/posts', element: <Posts /> },
  { path: '/OLDposts', element: <OLDPosts /> },
  { path: '/posts/:id', element: <PostIdPage /> },
  { path: '/error', element: <Error /> },
  { path: '/*', element: <Error /> },
];
