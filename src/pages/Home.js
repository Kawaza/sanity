import React from "react";
import Banner from "../components/Banner";
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function Home() {
    return (
        <div>
            <Banner />
            <section className="bg-gray-800 py-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                    About <span className="blue-text leading-snug">Me</span>
                </h2>
                <div className="container px-10 py-10 text-white grid grid-cols-1 md:grid-cols-2 mx-auto gap-40 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white text-left">
                            OK <span className="blue-text leading-snug">LET'S CREATE</span> SOMETHING GREAT.
                        </h3>
                        <p className="pb-4">Hello, My name is Aaron, and I'm a Web Developer in Edmonton Alberta. I have strong expertise in Web Development from designing to deployment and I love to help groups and businesses bring their ideas to life.</p>
                        <p className="pb-4">I love creating things and I have a lot of side projects I work on for fun, my biggest one being my discord bot. However, if I'm not busy working on those I'm playing games, or off camping with friends and family.</p>

                        <div className="line mt-4"></div>
                    </div>
                    <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="custom-border border rounded-md p-4">
                            <h3 className="text-center py-3 text-5xl blue-text">5+</h3>
                            <h4 className="text-center py-3 text-2xl">Years of Experience</h4>
                        </div>
                        <div className="custom-border border rounded-md p-4">
                            <h3 className="text-center py-3 text-5xl blue-text">30+</h3>
                            <h4 className="text-center py-3 text-2xl">Projects Completed</h4>
                        </div>
                        <div className="custom-border border rounded-md p-4">
                            <h3 className="text-center py-3 text-5xl blue-text">3+</h3>
                            <h4 className="text-center py-3 text-2xl">Years of Work</h4>
                        </div>
                        <div className="custom-border border rounded-md p-4">
                            <h3 className="text-center py-3 text-5xl blue-text">5+</h3>
                            <h4 className="text-center py-3 text-2xl">Years of Experience</h4>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}