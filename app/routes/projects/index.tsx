import type {Route} from "./+types/index";
import type {Project} from "~/types";
import ProjectCard from "~/components/ProjectCard";

export async function loader({request}: Route.LoaderArgs):Promise<{projects: Project[]}> {
    try {
        const response = await fetch('http://localhost:8000/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        return {projects: Array.isArray(data) ? data : []};
    } catch (error) {
        return {projects: []};
    }
}

const ProjectsPage = ({loaderData}: Route.ComponentProps) => {

    const {projects} = loaderData as {projects: Project[]};

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">My Projects</h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project: Project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    );
}

export default ProjectsPage;
