import { FaHome } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { FaArrowRightLong, FaBitcoin } from "react-icons/fa6";
export const menuItem = [
  {
    title: "home",
    link: "/home",
    icon: <FaHome />,
    arrowIcon: <FaArrowRightLong />,
  },
  {
    title: "Coins",
    link: "/coin",
    icon: <FaBitcoin />,
    arrowIcon: <FaArrowRightLong />,
  },
  {
    title: "News",
    link: "/news",
    icon: <IoNewspaper />,
    arrowIcon: <FaArrowRightLong />,
  },
  {
    title: "Analyze",
    link: "/analyze",
    icon: <SiGoogleanalytics />,
    arrowIcon: <FaArrowRightLong />,
  },
];

const handleMenuItemClick = (title: string) => {
  document.title = `Crypto App - ${title}`;
};

export default handleMenuItemClick;
