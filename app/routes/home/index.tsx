import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type {Project} from "~/types";
import type {PostMeta} from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RC Dev site | Welcome" },
        { name: "description", content: "Custom portfolio site development" },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{projects: Project[]; posts: PostMeta[]}> {
    try{
        const url = new URL(request.url);

        const [projectRes, postRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/projects`),
            fetch(new URL('/posts-meta.json', url))
        ]);

        if(!projectRes.ok || !postRes.ok){
            throw new Error('Failed to fetch data');
        }
        const [projects, posts] = await Promise.all([
            projectRes.json(),
            postRes.json()
        ])


        return {projects, posts};
    } catch (error) {
        return {projects: [], posts: []};
    }
}

const HomePage = ({loaderData}: Route.ComponentProps) => {

    const {projects, posts} = loaderData;
    return (
        <>
            <FeaturedProjects projects={projects} count={2}/>
            <AboutPreview />
            <LatestPosts posts={posts} />
        </>
    );
}
export default HomePage;
