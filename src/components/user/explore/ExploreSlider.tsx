import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { displayUsers } from "../../../feature/reducers/userSlice";
import { useNavigate } from "react-router-dom";


const ExploreSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const users = useSelector(displayUsers);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Ensure userId is always a string
  const filteredUsers = users.filter(
    (user) =>
      user._id && user._id !== userId! && // Nicht den aktuellen Benutzer anzeigen
      !user?.followers?.includes(userId! as never) // Und nicht den Benutzern folgen, die bereits gefolgt werden
  );

  return (
    <Carousel
      responsive={responsive}
      className="cursor-pointer z-10"
      arrows={true}
      draggable={true}
      additionalTransfrom={0}
    >
      {filteredUsers.map((user,index) => (
        <div
          className="relative h-96 mx-1"
          key={index}
          onClick={() => navigate(`/profile/${user?._id}`)}
        >
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={user?.profile_photo}
              alt=""
            />
          </div>
          <div className="absolute left-0  bottom-1 pb-1 pl-2 font-bold">
            <div className=" py-1.5 px-1.5 rounded-full text-xs bg-gradient-to-r from-slate-400 to-sky-500 flex items-center gap-1 ">
              <p>{user?.firstName}</p>
              <p>{user?.lastName}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ExploreSlider;
