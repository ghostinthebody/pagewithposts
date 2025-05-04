export interface Filter {
    sort: string;
    query: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string
}

export interface UseSortedPostsProps {
    posts: Post[];
    sort: keyof Post | Filter['sort'];
    query?: keyof Post | Filter['query'];
}

export interface PostsState {
    posts: Post[];
    filter: Filter;
    modal: boolean;
    totalPages: number;
    limit: number;
    page: number;
    isPostsLoading: boolean;
    postError: string | null;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface PostIdPageState {
    post: Post | null; 
    comments: Comment[];
    isPostLoading: boolean;
    postError: string | undefined;
    isCommentsLoading: boolean;
    commentsError: string | undefined;
}

export interface RootState {
    post: PostsState;
    postIdPage: PostIdPageState;
}

// отдельно написал для PostItem.tsx интерфейс. Потому что никакой другой не подходил. Вроде работает. 
export interface PostItemProps {
    post: Post;
    remove: (post: Post) => void;
    number: number;
}

// отдельно написал для PostList.tsx
export interface PostListProps {
    posts: Post[];
    title: string;
    remove: (post: Post) => void; // Функция удаления принимает пост
}
