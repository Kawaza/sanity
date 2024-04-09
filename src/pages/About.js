import React, { useRef, useEffect, useState } from "react";

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
        threshold: 0.5, // Trigger when 50% of the component is visible
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
      className={`transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default function About() {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
            <FadeInOnScroll>
                <div className="bg-blue-500 text-white p-4 rounded-lg">
                Fading element
                </div>
            </FadeInOnScroll>
            </div>
            <section className="bg-gray-900 py-2 pt-20">
            <FadeInOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                    About <span className="blue-text leading-snug">Me</span>
                </h2>
                <div className="container px-10 py-10 text-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mx-auto gap-10 md:gap-40 items-center mb-40 animate-fade-up animate-once">
                    <div>
                        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white text-left">
                            <span className="blue-text leading-snug">Let's Create</span> <br/>
                            <span>Something Great.</span>
                        </h3>
                        <p className="pb-4 leading-7">Hello, My name is Aaron, and I'm a Web Developer in Edmonton Alberta. I have strong expertise in Web Development from designing to deployment and I love to help groups and businesses bring their ideas to life.</p>
                        <p className="pb-4 leading-7">I love creating things and I have a lot of side projects I work on for fun, my biggest one being my discord bot. However, if I'm not busy working on those I'm playing games, or off camping with friends and family.</p>

                        <div className="line mt-6"></div>
                    </div>
                    <div>
                           
                        {/* <img
                            className=""
                            src={homepageimage} // Replace with your image URL
                            alt="Banner"
                        /> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 animate-fade-up animate-once adjust-gap-size">
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
                        <p className="py-4 leading-7 pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat lacus quis tincidunt fermentum. Nulla malesuada.</p>
                    </div>
                </div>
                </FadeInOnScroll>
            </section>
        </div>
    );
};