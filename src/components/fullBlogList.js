import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: '051kmgbh',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2024-01-01",
});

const AllBlogsList = () => {
    const [blogs, setBlog] = useState([]);
    useEffect(() => {
        client
            .fetch(`*[_type == "post"] | order(_createdAt asc) {title, slug, publishedAt, excerpt, body, "imageUrl": mainImage.asset->url}`)
            .then((data) => {
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
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {group.map((blog) => (
                                    <div className="px-4 py-4" key={blog.title}>
                                        <a href={`/blog/${blog.slug.current}`}>
                                            <div className={`blog custom-border px-8 py-8 rounded-2xl custom-background cursor-pointer ${blog.title}`}>
                                                <img className="rounded-2xl w-full" src={blog.imageUrl} alt={blog.title} />
                                                <h4 className="blue-text leading text-sm pt-6 pb-0 uppercase">
                                                  {(() => {
                                                    const date = new Date(blog.publishedAt);
                                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                                    return date.toLocaleDateString('en-US', options);
                                                  })()}
                                                </h4>
                                                <h3 className="text-white leading-9 text-2xl pt-2 duration-300 relative duration-300 pt-6">
                                                    {blog.title}
                                                <p className="text-white leading-9 pt-1 text-base duration-300 relative duration-300 pt-6">{blog.excerpt}</p>
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