import type {Route} from "./+types/index";
import type {Project} from "~/types";
import ProjectCard from "~/components/ProjectCard";
import {useState} from "react";

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

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    //calc total pages
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    //get current pages projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    //pagination handlers
        const renderPagination = () => (
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({length: totalPages}, (_, idx) => (
                <button
                    key={idx + 1}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 cursor-pointer rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>
    )


    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">My Projects</h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {currentProjects.map((project: Project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {totalPages >1 && renderPagination()}
        </>
    );
}

export default ProjectsPage;
