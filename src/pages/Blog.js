import React, { useRef, useEffect, useState } from "react";
import Blog from "../components/fullBlogList";


export default function Home() {
        return (
        <div className="mx-auto pt-56 bg-gray-900">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                    All <span className="blue-text leading-snug">Blogs</span>
                </h2>
                <Blog></Blog>
        </div>
    )
}