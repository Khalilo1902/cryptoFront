import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png"

const Branding = () => {
  return (
    <NavLink to="/home" className=" cursor-pointer">
      <img className="w-8 h-8 md:w-10 md:h-10 " src={logo}  />
    </NavLink>
  );
};

export default Branding;
