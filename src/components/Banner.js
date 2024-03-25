import imageBanner from "../images/banner.jpeg"
import { SocialIcon } from 'react-social-icons/component'
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
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 banner-text-width text-white pr-10">
                        <span className="blue-text leading-snug">HELLO</span>
                        , MY NAME IS AARON.</h1>
                    <div className="line mt-4"></div>
                </div>
                <div className="absolute inset-0 flex justify-center mx-auto items-end mb-6 md:mb-0 icons md:flex-col md:mx-6">
                  <SocialIcon target="_blank" url="https://github.com/Kawaza" bgColor="white" fgColor="black" network="github" style={{ height: 50, width: 50 }} className="md:mb-2 banner-icons"/>
                  <SocialIcon target="_blank" url="https://www.linkedin.com/in/aaronbenn/" bgColor="white" fgColor="black" network="linkedin" style={{ height: 50, width: 50 }} className="md:mt-2 banner-icons"/>
                </div>
              
        </div>
      </>
    );
  }
  
  export default Banner;