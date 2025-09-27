import ReactMarkdown from 'react-markdown';
import type {Route} from './+types/details';
import type {Post, StrapiPost, StrapiResponse} from "~/types";
import { Link } from 'react-router';

export async function loader({request, params}:Route.LoaderArgs){
    const { slug } = params;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`);

    if(!response.ok){
        throw new Response('Failed to fetch posts metadata', {status: 500});
    }

    const json:StrapiResponse<StrapiPost> = await response.json();

    if (!json.data.length) {
        throw new Response('Not Found', { status: 404 });
    }

    const item = json.data[0];
    const post = {
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        slug: item.slug,
        date: item.date,
        body: item.body,
        image: item.image?.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`:'/images/no-image.png',
    };
    // console.log(post.body[0]);

    return {post};
}

type BlogPostDetailsProps = {
    loaderData: {
        post: Post;
    }
}


const BlogDetailsPage = ({loaderData}: BlogPostDetailsProps) => {

    const { post } = loaderData;



    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
                {post.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(post.date).toLocaleDateString('et-EE')}
            </p>
            {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-4"/>
            )}
            <div className="max-w-none mb-12 prose prose-invert">
                <ReactMarkdown>
                    {post.body}
                </ReactMarkdown>
            </div>
            <Link to="/blog" className="inline-block bg-blue-600 px-6 py-2 rounded-lg transition hover:bg-blue-700">← Back to Posts</Link>
        </div>
    );
}

export default BlogDetailsPage;