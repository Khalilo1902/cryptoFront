import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export interface ICarouselItem {
    id: string;
    image: string; // Der Typ von "image" sollte ein String sein
}

interface SliderProps {
    items: ICarouselItem[];
    numberItemsDesktop?: number;
    numberItemsTablet?: number;
    numberItemsMobile?: number;
}

const Slider = ({ items, numberItemsDesktop = 1, numberItemsTablet = 1, numberItemsMobile = 1 }: SliderProps) => {

    const [_,setActiveIndex] = useState(0);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: numberItemsDesktop
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: numberItemsTablet
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: numberItemsMobile,
        }
    };


  const CustomDot = ({ onClick, active }: any) => (
    <button
      className={`w-2 h-2 rounded-full focus:outline-none m-2 hidden lg:flex ${
        active ? " bg-SECONDARY_BLUE" : " bg-SECONDARY_GRAY"
      }`}
      onClick={onClick}
    ></button>
  );


    return (
        <Carousel
            responsive={responsive}
            renderButtonGroupOutside
            className="relative z-10 mt-6"
            arrows={true}
            draggable={true}
            showDots
            customDot={<CustomDot />}
            additionalTransfrom={0}
            beforeChange={(nextSlide) => setActiveIndex(nextSlide)}
            infinite={true}
            autoPlay
          >
            
        
            {items.slice(0,4).map(item => <div
            
            className=" w-full rounded-md overflow-hidden" key={item.id}><img className=" w-full h-[100px] md:h-[150px] lg:h-[200px] xl:h-[300px]" src={item.image} alt="" /></div>)} 
        </Carousel>
    );
}



  
export default Slider;





















