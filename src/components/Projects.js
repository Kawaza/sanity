import React, {useEffect, useState} from "react";
import { createClient } from "@sanity/client";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
     

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
    });

    const ProjectList = () => {
        const [projects, setProject] = useState([]);
      
        useEffect(() => {
          client
            .fetch(`*[_type == "Project"] | order(_createdAt asc) {title, description, builtWith, "imageUrl": image.asset->url}`)
            .then((data) => {
            console.log(data); // Log the entire response
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
                                {projects.map((project) => (
                                    <div className="px-4 py-4">
                                        <div className={`custom-border px-8 py-8 rounded-2xl custom-background cursor-pointer ${project.title}`} key={project.title}>
                                            <img className="rounded-2xl shadow w-full" src={project.imageUrl} alt={project.title} />
                                            <h4 className="blue-text leading text-sm pt-6 pb-3 uppercase">{project.builtWith}</h4>
                                            <h3 className="text-white leading-9 text-2xl pt-2 hover-blue-text duration-300">{project.description}</h3>
                                        </div>
                                    </div>
                                ))}
                        </Carousel>
                    </div>
        );
      };
      
export default ProjectList;