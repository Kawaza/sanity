import imageBanner from "../images/banner.jpeg"


function Banner() {
 
    return (
      <>
        <div className="relative h-screen">
            {/* Banner image */}
            <img
                className="object-cover w-full h-full"
                src={imageBanner} // Replace with your image URL
                alt="Banner"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0"></div>
            
            {/* Text container */}
                <div className="absolute inset-0 flex flex-col justify-center items-left max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 max-w-2xl text-white text-7xl leading-tight">
                        <span className="blue-text">HELLO</span>
                        , MY NAME IS AARON.</h1>
                </div>
        </div>
      </>
    );
  }
  
  export default Banner;