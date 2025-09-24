import type {Route} from './+types/index';
import type {PostMeta} from '~/types';
import PostCard from '~/components/PostCard';

export async function loader({request}:Route.LoaderArgs):Promise<{posts: PostMeta[]}> {

    const url = new URL('/posts-meta.json', request.url);
    const response = await fetch(url.href);

    if(!response.ok){
        throw new Response('Failed to fetch posts metadata', {status: 500});
    }
    const data = await response.json();

    return {posts: data};
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {

    const {posts} = loaderData;

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">
                My Blog
            </h2>
            {posts.map(post => (
                <PostCard post={post} key={post.slug} />
            ))}
        </div>
    );
}

export default BlogPage;
