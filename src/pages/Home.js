import React, { useRef, useEffect, useState } from "react";
import Banner from "../components/sections/Banner";
import Experience from "../components/sections/Experience";
import Project from "../components/sections/Projects"
import ContactUs from "../components/sections/Contact"
import { Html5Original, Css3Original, JavascriptOriginal, WordpressPlain, ReactOriginal, TailwindcssOriginal, DiscordjsOriginal, PhpPlain, GitOriginal   } from 'devicons-react';


export default function Home() {

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
              threshold: isMobile() ? 0 : 0.3, // Trigger when 50% of the component is visible
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

        const isMobile = () => {
            // Use a simple check to determine if the device is mobile
            return window.innerWidth <= 768;
        };
      
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

        return (
        <div>
            <Banner />
            <section className="bg-gray-900 py-2 pt-20" id="about-me">
                <FadeInOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                    About <span className="blue-text leading-snug">Me</span>
                </h2>
                <div className="container px-10 py-10 text-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto gap-10 md:gap-40 items-center mb-20 md:mb-40">
                    <div>
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white text-left">
                            <span className="blue-text leading-snug">Let's Create</span> <br/>
                            <span>Something Great.</span>
                        </h3>
                        <p className="pb-5 leading-7 text-lg">Hello, my name is Aaron, and I'm a Web Developer in Edmonton, Alberta. With five years of hands-on experience in the field, I have cultivated a deep passion for web development. I love to learn and creating new things which I showcase in this portfolio website.</p>
                        <p className="pb-4 leading-7 text-lg">Feel free to explore my projects I've worked on over the years, or check out my blog where I share insights and reflections on my journey and experiences in creating these projects.</p>

                        <div className="line mt-6"></div>
                    </div>
                    <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 adjust-gap-size">
                        <div className="flex align-center">
                                <div className="display-2 mg-right-12px text-6xl md:text-8xl blue-text adjust-text-size self-center">5</div>
                                <span className="text-3xl self-center blue-text">+</span>
                                <div className="text-300 bold text-xl self-center ml-4">Years of <br/> Experience</div>
                            </div>
                            <div className="flex align-center">
                                <div className="display-2 mg-right-12px text-6xl md:text-8xl blue-text adjust-text-size self-center">30</div> 
                                <span className="text-3xl self-center blue-text">+</span>
                                <div className="text-300 bold text-xl self-center ml-4">Successful <br/> Projects</div>
                            </div>
                        </div>
                        <p className="py-4 leading-7 pb-6 text-lg">With half a decade of dedicated work in web development, I've had the privilege of working on over 30+ successful projects spanning various industries and client needs. Each project has been an opportunity to showcase my creativity and allowed me continue to learn.</p>
                    </div>
                </div>
            </FadeInOnScroll>
            </section>
            <section className="bg-gray-900 pb-1" id="my-skills">
                <FadeInOnScroll>
                <div className="">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white text-center">
                        My <span className="blue-text leading-snug">Skills</span>
                    </h2>
                    <div className="container px-10 py-1 text-white grid mx-auto gap-10 md:gap-40 items-center mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <Html5Original color="" size="75" />
                                <Css3Original color="" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">HTML & CSS</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <JavascriptOriginal color="white" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">Javascript</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <WordpressPlain color="white" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">Wordpress</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <ReactOriginal color="" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">React</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <TailwindcssOriginal color="" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">Tailwind</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <DiscordjsOriginal color="" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">Discord.js</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <PhpPlain  color="white" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">PHP</h4>
                        </div>
                        <div className="custom-border border rounded-md p-10 ">
                            <div className="flex justify-center">
                                <GitOriginal color="" size="75" />
                            </div>
                            <h4 className="text-center py-3 text-2xl pb-0">Git</h4>
                        </div>
                    </div>
                </div>
                </div>
            </FadeInOnScroll>
            </section>
            <section className="bg-gray-900 pt-10 md:pt-20 py-1" id="more-about-me">
                <FadeInOnScroll>
                <div className="">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center">
                            More <span className="blue-text leading-snug">About</span> Me
                        </h2>
                        <Experience></Experience>
                    </div>
                 </FadeInOnScroll>
            </section>

            <section className="bg-gray-900 pb-1" id="projects">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white text-center ">
                        My <span className="blue-text leading-snug">Projects</span>
                    </h2>
                <FadeInOnScroll>
                    <Project></Project>
                </FadeInOnScroll>
            </section>

            <section className="bg-gray-900 py-2 pt-20" id="contact">
            <FadeInOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                    Get In <span className="blue-text leading-snug">Contact</span>
                </h2>
                <ContactUs></ContactUs>
            </FadeInOnScroll>
            </section>
        </div>
    )
}