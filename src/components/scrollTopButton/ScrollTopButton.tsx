import { FaCircleArrowUp } from "react-icons/fa6";

 

 

interface ButtonTopProps {
  goTopRef: React.RefObject<HTMLDivElement>;
}
const ButtonTop: React.FC<ButtonTopProps> = ({ goTopRef }) => {
  const goTop = () => {
    const element = goTopRef.current;
    if (element) {
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };
  return (
 
      <span className="text-5xl fixed right-6 bottom-4 text-PRIMARY_BLUE cursor-pointer " onClick={goTop}>
        <FaCircleArrowUp className="" />
      </span>
    
  );
};

export default ButtonTop;
