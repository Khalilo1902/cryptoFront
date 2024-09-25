import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";
import { IoNewspaperOutline } from "react-icons/io5";
import { displayNews } from "../../feature/reducers/newsSlice";

const NewsHeader = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const news=useSelector(displayNews)
  return (
    <div
      className={`my-4 font-FONT_VIGA p-4 rounded-lg ${
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      }`}
    >
      <div className="flex text-xs sm:text-base items-center py-2 gap-2 text-SECONDARY_GRAY">
        <p>crypto currency {">"}</p>
        <p>news {">"}</p>
        <p>crypto currency news </p>
      </div>

      <div className="border-b-2 py-2 " />

      <div className="grid grid-cols-1 md:grid-cols-12 py-4 items-center gap-4">
        <div className=" col-span-3 w-full flex items-center gap-2">
           <IoNewspaperOutline className="text-8xl text-SECONDARY_GRAY" /> 
       
          <p className="text-xl">crypto currency news</p>
        </div>
       <div className="col-span-9">
       <p className="">
          Bitcoin, as the first and most popular digital currency in the world,
          has a significant impact on the world of digital currencies. Experts
          recommend including Bitcoin in your investment portfolio and keeping
          up with news related to it.
        </p>
       </div>
      </div>
      <div className="border-b-2" />
      <p className="pt-2 text-PRIMARY_RED">{`${news.length} articles`}</p>
    </div>
  );
};

export default NewsHeader;
