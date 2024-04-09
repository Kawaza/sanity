import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { useParams } from "react-router-dom";
import {PortableText} from '@portabletext/react'
import * as ReactDOM from 'react-dom'

const client = createClient({
    projectId: '051kmgbh',
    dataset: 'production',
    useCdn: true,
    apiVersion: "2024-01-01",
});

const components = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      )
    }
  }

const BlogList = () => {
    const { slug } = useParams();
    const [blogs, setBlog] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "post" && slug.current == $slug] | {title, slug, publishedAt, excerpt, content, "imageUrl": mainImage.asset->url}`, { slug })
            .then((data) => {
                if (data.length > 0) {
                    setBlog(data[0]);
                } else {
                    setBlog(null); // Set project to null if no data is found
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [slug]);


    return (
        <div className="mx-auto pb-20 pt-56 bg-gray-900">
        <style>
            {`
            .bg-transparent {
                background-color: var(--darkblue);
            }
            `}
        </style>
            {blogs && (
                <>
                    <div className="container mx-auto md:flex justify-between pb-20 px-10 md:px-24">
                        <div>
                            <h1 className="text-6xl text-white">{blogs.title}</h1>
                            <h4 className="blue-text leading text-sm pt-6 pb-0 uppercase">
                                {(() => {
                                    const date = new Date(blogs.publishedAt);
                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    return date.toLocaleDateString('en-US', options);
                                })()}
                            </h4>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault(); 
                            window.open('/blog', '_blank');

                        }} className="mt-14 md:mt-0 align-middle text-center uppercase transition-all text-xs py-2 px-8 rounded-full bg-transparent text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 h-12 border-white border-2 hover-blue-background duration-300 self-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z" clip-rule="evenodd"/>
                            </svg>
                            BACK TO BLOGS
                        </button>
                    </div>
                    <div className="container mx-auto pb-0 px-10 md:px-24">
                        <img className="w-full bg-gray-1000" src={blogs.imageUrl} alt={blogs.title} />
                        <div className=" pt-20 gap-20">
                                <div className="blog-styling">
                                    <PortableText value={blogs.content} components={components} />
                                </div>
                            </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogList;