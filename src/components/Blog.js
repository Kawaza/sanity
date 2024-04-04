import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@sanity/client";
import { useParams } from "react-router-dom";
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

const client = createClient({
    projectId: '051kmgbh',
    dataset: 'production',
    useCdn: true,
});

const AllBlogsList = () => {
    const [blogs, setBlog] = useState([]);
  
    useEffect(() => {
        client
            .fetch(`*[_type == "post"] | order(_createdAt asc) {title, slug, body, "imageUrl": mainImage.asset->url}`)
            .then((data) => {
                console.log(data); // Log the entire response
                setBlog(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
    const chunkBlogs = (arr, size) => {
        return arr.reduce((acc, _, i) => {
            if (i % size === 0) {
                acc.push(arr.slice(i, i + size));
            }
            return acc;
        }, []);
    };

    // Chunk the projects into groups of three
    const groupedBlogs = chunkBlogs(blogs, 3);

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
                    {groupedBlogs.map((group, index) => (
                        <FadeInOnScroll key={index}>
                            <div className="grid grid-cols-3">
                                {group.map((blog) => (
                                    <div className="px-4 py-4" key={blog.title}>
                                        <a href={`/projects/${blog.slug.current}`}>
                                            <div className={`project custom-border px-8 py-8 rounded-2xl custom-background cursor-pointer ${blog.title}`}>
                                                <img className="rounded-2xl shadow w-full" src={blog.imageUrl} alt={blog.title} />
                                                <h3 className="text-white leading-9 text-2xl pt-2 duration-300 relative duration-300 pt-6">
                                                    {blog.title}
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

export default AllBlogsList;