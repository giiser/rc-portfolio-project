import type {Route} from "./+types/index";
import type {Project, StrapiProject, StrapiResponse} from "~/types";
import ProjectCard from "~/components/ProjectCard";
import {useState} from "react";
import Pagination from "~/components/Pagination";
import {AnimatePresence, motion} from "framer-motion";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "RC Dev site | Projects" },
        { name: "description", content: "My projects" },
    ];
}

export async function loader({request}: Route.LoaderArgs):Promise<{projects: Project[]}> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const json:StrapiResponse<StrapiProject> = await response.json();

        const projects = json.data.map((item) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            description: item.description,
            image: item.image?.url ? `${item.image.url}`:'/images/no-image.png',
            url: item.url,
            date: item.date,
            category: item.category,
            featured: item.featured
        }));

        return {projects};
    } catch (error) {
        return {projects: []};
    }
}

const ProjectsPage = ({loaderData}: Route.ComponentProps) => {


    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    const {projects} = loaderData;
    // const {projects} = loaderData as {projects: Project[]};

    //get unique categories
    const categories: string[] = ['All', ...new Set(projects.map((project: Project) => project.category))];

    //filter projects by category
    const filteredProjects: Project[] = selectedCategory ==='All'? projects: projects.filter((project: Project) => project.category === selectedCategory);

    //calc total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    //get current pages projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);



    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">My Projects</h2>
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button key={category} onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category?'bg-blue-600 text-white':'bg-gray-700 text-gray-300'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:grid-cols-2">
                    {currentProjects.map((project: Project) => (
                        <motion.div key={project.id} layout>
                            <ProjectCard  project={project} />
                        </motion.div>

                    ))}
                </motion.div>
            </AnimatePresence>


            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </>
    );
}

export default ProjectsPage;
