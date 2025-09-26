import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type {Project, StrapiProject, StrapiResponse} from "~/types";
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
            fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
            fetch(new URL('/posts-meta.json', url))
        ]);

        if(!projectRes.ok || !postRes.ok){
            throw new Error('Failed to fetch data');
        }

        const projectJson:StrapiResponse<StrapiProject> = await projectRes.json();
        const projects:Project[] = projectJson.data.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            description: item.description,
            image: item.image?.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`:'/images/no-image.png',
            url: item.url,
            date: item.date,
            category: item.category,
            featured: item.featured
        }));
        const postJson= await postRes.json();


        return {projects, posts: postJson};
    } catch (error) {
        return {projects: [], posts: []};
    }
}

const HomePage = ({loaderData}: Route.ComponentProps) => {

    const {projects, posts} = loaderData;
    return (
        <>
            <FeaturedProjects projects={projects} />
            <AboutPreview />
            <LatestPosts posts={posts} />
        </>
    );
}
export default HomePage;
