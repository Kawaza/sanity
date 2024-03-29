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
        items: 2
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
            .fetch(`*[_type == "Project"]{title, description, "imageUrl": image.asset->url}`)
            .then((data) => {
            console.log(data); // Log the entire response
              setProject(data);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }, []);
      
        return (
            <section className="bg-gray-900 pb-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-20 text-white text-center ">
                        My <span className="blue-text leading-snug">Projects</span>
                    </h2>
                    <div className="slider-container container mx-auto pb-20">
                        <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true} infinite={true}>
                                {projects.map((project) => (
                                    <div className="px-4 py-4">
                                        <div className={`px-8 py-8 rounded-2xl custom-background cursor-pointer ${project.title}`} key={project.title}>
                                            <img className="rounded-2xl shadow w-full" src={project.imageUrl} alt={project.title} />
                                            <div>{project.builtWith}</div>
                                            <h3 className="text-white leading text-2xl pt-4 hover-blue-text duration-300">{project.description}</h3>
                                        </div>
                                    </div>
                                ))}
                        </Carousel>
                    </div>
          </section>
        );
      };
      
export default ProjectList;