import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@sanity/client";
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import ReactGA from "react-ga4";

const client = createClient({
    projectId: '051kmgbh',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2024-01-01",
});

const AllProjectList = () => {
    const [projects, setProject] = useState([]);
  
    useEffect(() => {
        client
            .fetch(`*[_type == "Project"] | order(_createdAt asc) {title, slug, description, builtWith, "imageUrl": image.asset->url}`)
            .then((data) => {
                console.log(data); // Log the entire response
                setProject(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const projectClick = () => {
      ReactGA.event({
        category: "onClick",
        action: "onClick",
        label: "Clicked a project", // optional
        value: 99, // optional, must be a number
        nonInteraction: true, // optional, true/false
        transport: "xhr", // optional, beacon/xhr/image
      });
    }

    const isMobile = () => {
        // Use a simple check to determine if the device is mobile
        return window.innerWidth <= 768;
    };

    const FadeInOnScroll = ({ children }) => {
        const [isVisible, setIsVisible] = useState(false);
        const elementRef = useRef(null);
      
        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              // If the element is intersecting the viewport
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(elementRef.current); // Stop observing after it's visible
              }
            },
            {
              threshold: isMobile() ? 0 : 0.5, // Trigger when 50% of the component is visible
            }
          );
      
          if (elementRef.current) {
            observer.observe(elementRef.current);
          }
      
          return () => {
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          };
        }, []);

        return (
          <div
            ref={elementRef}
            className={`transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {children}
          </div>
        );
    };

    // Function to chunk the projects array into groups of three
    const chunkProjects = (arr, size) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size));
            }
            return acc;
        }, []);
    };

    // Chunk the projects into groups of three
    const groupedProjects = chunkProjects(projects, 3);

    return (
        <div className="mx-auto pb-20 pt-6 bg-gray-900">
            <style>
                {`
                .bg-transparent {
                    background-color: var(--darkblue);
                }
                `}
            </style>
            <>
                <div className="container mx-auto pb-0">
                    {groupedProjects.map((group, index) => (
                        <FadeInOnScroll key={index}>
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {group.map((project) => (
                                    <div className="px-4 py-4" key={project.title}>
                                        <a href={`/projects/${project.slug.current}`} onClick={projectClick}>
                                            <div className={`project custom-border px-8 py-8 rounded-2xl custom-background cursor-pointer ${project.title}`}>
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
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </>
        </div>
    );
};

export default AllProjectList;