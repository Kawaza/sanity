import imageBanner from "../images/banner.jpeg"
import 'react-social-icons/linkedin'
import 'react-social-icons/github'

function Banner() {
 
    return (
      <>
        <div className="relative mobile-banner-size md:h-screen">
            {/* Banner image */}
            <img
                className="object-cover w-full h-full"
                src={imageBanner} // Replace with your image URL
                alt="Banner"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0"></div>
            
            {/* Text container */}
                <div className="absolute inset-0 flex flex-col justify-center items-left container mx-auto px-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 banner-text-width text-white pr-10 animate-fade-right animate-once">
                        <span className="blue-text leading-snug ">HELLO</span>
                        , MY NAME IS AARON.</h1>
                    <div className="line mt-4"></div>
                </div>
              
                <div>
                  <div class="fixed bottom-0 right-10 flex flex-col items-center gap-y-4 hidden md:flex">

                    <a class="icon-hover transition hover:-translate-y-1 hover:text-target" target="_blank" href="https://github.com/Kawaza" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    </a>
                    <a class="icon-hover transition hover:-translate-y-1 hover:text-target " target="_blank" href="https://www.linkedin.com/in/aaronbenn/" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <div class="icon-line mt-4 h-32 w-[4px] origin-bottom bg-target bg-white"></div>
                  </div>

                </div>
              
        </div>
      </>
    );
  }
  
  export default Banner;