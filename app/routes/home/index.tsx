import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type {Project} from "~/types";
import AboutPreview from "~/components/AboutPreview";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RC Dev site | Welcome" },
        { name: "description", content: "Custom portfolio site development" },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{projects: Project[]}> {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await response.json();
        return {projects: data};
    } catch (error) {
        return {projects: []};
    }
}

const HomePage = ({loaderData}: Route.ComponentProps) => {

    const {projects} = loaderData;

    return (
        <>
            <FeaturedProjects projects={projects} count={2}/>
            <AboutPreview />
        </>
    );
}
export default HomePage;
