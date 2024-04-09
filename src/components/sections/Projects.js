import React, {useEffect, useState} from "react";
import { createClient } from "@sanity/client";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
     

    const responsive = {
        superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3
        },
        desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
        },
        tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
        },
        mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
        }
    };

    const client = createClient({
        projectId: '051kmgbh',
        dataset: 'production',
        useCdn: true,
        apiVersion: "2024-01-01",
    });

    const ProjectList = () => {
        const [projects, setProject] = useState([]);
      
        useEffect(() => {
          client
            .fetch(`*[_type == "Project" && homepage == true] | order(_createdAt asc) {title, slug, description, builtWith, "imageUrl": image.asset->url}`)
            .then((data) => {
              setProject(data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }, []);
      
        return (
                    <div className="slider-container container mx-auto pb-20">
                        <Carousel 
                            responsive={responsive} 
                            swipeable={true} 
                            draggable={true} 
                            ssr={true} 
                            infinite={true} 
                            showDots={true} 
                            removeArrowOnDeviceType={["mobile"]}
                            dotListClass="custom-dot-list-style"
                            className="pb-0 md:pb-6"
                        >
                                {projects.map((project, index) => (
                                    <div className="px-4 py-4" key={index}>
                                        <a href={`/projects/${project.slug.current}`}>
                                        <div className={`project custom-border px-8 py-8 rounded-2xl custom-background cursor-pointer ${project.title}`} key={project.title}>
                                            <img className="rounded-2xl shadow w-full" src={project.imageUrl} alt={project.title} />
                                            <h4 className="blue-text leading text-sm pt-6 pb-3 uppercase">{project.builtWith}</h4>
                                            <h3 className="text-white leading-9 text-2xl pt-2 duration-300 relative duration-300">
                                            {project.description}
                                            <span className="absolute pt-2 pl-3 arrow-stroke duration-200 opacity-0 bottom-0"><ArrowUpRightIcon className="h-0 duration-300" /></span>
                                            </h3>
                                        </div>
                                        </a>
                                    </div>
                                ))}
                        </Carousel>
                    </div>
        );
      };
      
export default ProjectList;