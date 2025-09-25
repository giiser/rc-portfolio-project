import ReactMarkdown from 'react-markdown';
import type {Route} from './+types/details';
import type {PostMeta} from "~/types";
import { Link } from 'react-router';

export async function loader({request, params}:Route.LoaderArgs){
    const { slug } = params;

    const url = new URL('/posts-meta.json', request.url);
    const response = await fetch(url.href);

    if(!response.ok){
        throw new Response('Failed to fetch posts metadata', {status: 500});
    }

    const index = await response.json();
    const postMeta = index.find((post:PostMeta)=> post.slug === slug);

    if (!postMeta) {
        throw new Response('Post not found', {status: 404});
    }

    //dynamically import the raw markdown file
    const markdown = await import(`../../posts/${slug}.md?raw`);

    return {
        postMeta,
        markdown: markdown.default
    }
}

type BlogPostDetailsProps = {
    loaderData: {
        postMeta: PostMeta;
        markdown: string;
    }
}


const BlogDetailsPage = ({loaderData}: BlogPostDetailsProps) => {

    const { postMeta, markdown } = loaderData;

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
                {postMeta.title}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
                {new Date(postMeta.date).toLocaleDateString('et-EE')}
            </p>
            <div className="max-w-none mb-12 prose prose-invert">
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </div>
            <Link to="/blog" className="inline-block bg-blue-600 px-6 py-2 rounded-lg transition hover:bg-blue-700">← Back to Posts</Link>
        </div>
    );
}

export default BlogDetailsPage;