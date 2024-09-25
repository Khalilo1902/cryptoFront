import { ImSpinner2 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center backdrop-blur-sm">
     <ImSpinner2 className=" animate-spin w-10 h-10"/>
    </div>
  );
};

export default Spinner;
