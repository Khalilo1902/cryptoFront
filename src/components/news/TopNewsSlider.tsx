import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { displayNews } from "../../feature/reducers/newsSlice";

const TopNewsSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const news = useSelector(displayNews);
  const lastNews = news
    .filter((news) => news.likes.length)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news?.length || 1);
    }, 9000);
  }, [lastNews]);
  return (
    <h3 className={`text-md line-clamp-1`}>
      <Typewriter
        options={{
          autoStart: true,
          loop: false,
          delay: 60,
          strings: news[currentIndex]?.title,
        }}
      />
    </h3>
  );
};

export default TopNewsSlide;
