import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import { FaFireAlt } from "react-icons/fa";
import { displayUsers } from "../../feature/reducers/userSlice";
import { displayanalysis } from "../../feature/reducers/analyzeSlice";
import { useNavigate } from "react-router-dom";

const TopSlider = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
const navigate = useNavigate()
  const analyses = useSelector(displayanalysis);
  const users = useSelector(displayUsers);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const analysesWithMoreLikes = analyses
  .filter(analyse => analyse.likes.length)
  .sort((a, b) => b.likes.length - a.likes.length).slice(0,6);

  return (
    <Carousel
      infinite={true}
      responsive={responsive}
      className=""
      arrows={false}
      draggable={true}
      additionalTransfrom={0}
    >
      {analysesWithMoreLikes.map((analyse,index) => {
        const user = users.find((user) => user._id === analyse.user);

        return (
          <div className=" mr-2" key={analyse?.user}>
            <div
              className={`flex flex-col items-center justify-center gap-1 lg:w-1/8 
              md:1/4 w-full
              h-fit rounded-md
              ${!isDarkMode ? "bg-SECONDARY_WHITE text-SECONDARY_BLACK" : "bg-SECONDARY_BLACK text-SECONDARY_WHITE"}`}
            >
              <div 
              onClick={()=>navigate(`/profile/${user?._id}`)}
              className="relative mt-2 cursor-pointer">
                <img
                  className="w-16 h-16 object-cover rounded-full"
                  src={String(user?.profile_photo)} 
                  alt=""
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-sm font-bold rounded-bl-full py-1 px-2">
                  {index+1}
                </div>
              </div>
              <div className="text-sm p-2 font-FONT_VIGA font-semibold">
                <p className="">{user?.firstName}</p>
                <p className="">{user?.lastName}</p>
              </div>
              <div className="flex items-center justify-center p-2 gap-1">
                <FaFireAlt className="text-xl text-orange-600"/>
                <span className="">{analyse?.likes.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default TopSlider;
