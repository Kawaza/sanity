import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { useParams } from "react-router-dom";

const client = createClient({
    projectId: '051kmgbh',
    dataset: 'production',
    useCdn: true,
});

const ProjectList = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "Project" && slug == $slug] {title, slug, link, description, builtWith, "imageUrl": image.asset->url, "bannerimage": bannerimage.asset->url}`, { slug })
            .then((data) => {
                if (data.length > 0) {
                    setProject(data[0]);
                } else {
                    setProject(null); // Set project to null if no data is found
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [slug]);

    console.log(project); // Log outside of useEffect

    return (
        <div className="mx-auto pb-20 pt-56 bg-gray-900">
        <style>
            {`
            .bg-transparent {
                background-color: var(--darkblue);
            }
            `}
        </style>
            {project && (
                <>
                    <div className="container mx-auto md:flex justify-between pb-20 px-10 md:px-24">
                        <div>
                            <h1 className="text-6xl text-white">{project.title}</h1>
                            <h4 className="blue-text py-4 uppercase">{project.builtWith}</h4>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault(); 
                            if (project.link) {
                                window.location.href = project.link;
                                console.log(project.link);
                            }
                        }} disabled={!project.link} class="mt-14 md:mt-0 align-middle text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-8 rounded-full bg-transparent text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 h-12 border-white border-2 hover-blue-background duration-300 self-center">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/> </svg>
                            View Website / Code
                        </button>
                    </div>
                    <div className="container mx-auto pb-0 px-10 md:px-24">
                        <img className="w-full bg-gray-1000" src={project.bannerimage} alt={project.title} />
                            <div className=" pt-20 gap-20">
                                <div>
                                    <h3 className="text-3xl md:text-4xl mb-4 text-white text-left pb-6">Description</h3>
                                    <p className="text-lg leading-7">{project.projectDescription}</p>
                                </div>
                            </div>
                            <div className=" pt-20 gap-20">
                                <div>
                                    <h3 className="text-3xl md:text-4xl mb-4 text-white text-left pb-6">Technology</h3>
                                    <p className="text-lg leading-7">{project.techDescription}</p>
                                </div>
                            </div>
                        </div>
                </>
            )}
        </div>
    );
};

export default ProjectList;