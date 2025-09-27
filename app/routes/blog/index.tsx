import type {Route} from './+types/index';
import type {Post, StrapiResponse, StrapiPost} from '~/types';
import PostCard from '~/components/PostCard';
import {useState} from "react";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";



export async function loader({request}:Route.LoaderArgs):Promise<{posts: Post[]}> {

    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`);

    if(!response.ok){
        throw new Response('Failed to fetch posts metadata', {status: 500});
    }

    const json:StrapiResponse<StrapiPost> = await response.json();
    const posts = json.data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        date: post.date,
        body: post.body,
        image: post.image?.url ? `${post.image.url}`:'/images/no-image.png',
    }));

    return {posts};
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;



    const {posts} = loaderData;

    const filteredPosts = posts.filter((post: Post) => {
        return (
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        );
    })

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);



    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">
                My Blog
            </h2>
            <PostFilter searchQuery={searchQuery} onSearchChange={(query: string)  =>{
                setSearchQuery(query);
                setCurrentPage(1);
            }} />
            <div className="space-y-8">
                {currentPosts.length ===0 ?(
                    <p className="text-gray-400 text-center">No Posts Found</p>
                ):(
                    currentPosts.map(post => (
                        <PostCard post={post} key={post.slug} />
                    ))
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) =>setCurrentPage(page)} />
        </div>
    );
}

export default BlogPage;
