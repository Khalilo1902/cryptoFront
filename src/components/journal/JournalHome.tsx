import { IoMdCheckmarkCircle } from "react-icons/io"; // Importiere das Häkchen-Symbol von react-icons/io
import { fadeIn } from "../../utils/motin"; // Importiere die fadeIn-Animationsfunktion aus den Motin-Utilities
import { motion } from "framer-motion"; // Importiere motion von framer-motion für Animationen

const JournalHome = () => {
  return (
    <div className=" font-FONT_VIGA flex flex-col xl:flex-row lg:justify-between px-3 gap-3">
      {/* Bildbereich */}
      <div className="flex w-full">
        <img src="/journal.png" alt="" /> {/* Bild */}
      </div>
      {/* Textbereich mit Einblendungsanimation */}
      <motion.div
        variants={fadeIn("left", 0.8)} // Animationsvarianten und -eigenschaften
        initial="hidden" // Startzustand der Animation
        whileInView={"show"} // Animation wird gestartet, wenn das Element im sichtbaren Bereich ist
        viewport={{ margin: "50px" }} // Sichtbarer Bereich für die Animation
      >
        <div className=" w-full flex-col place-item-center">
          {/* Überschrift */}
          <h3 className="text-2xl font-bold pt-2 mb-3">What Is Journal trading</h3>
          {/* Textabschnitt */}
          <p className="xl:pt-8">
            Journal trading refers to the practice of systematically recording
            trading activities, strategies, outcomes, and emotions during
            trading with financial instruments such as stocks, forex, or
            cryptocurrencies.
          </p>
          {/* Abschnitt mit Häkchen-Symbol und Text */}
          <div className="flex mt-6 xl:pt-9 item-start gap-2">
            <IoMdCheckmarkCircle className="text-4xl text-PRIMARY_BLUE" />{" "}
            {/* Häkchen-Symbol */}
            <p>
              Its purpose is to analyze trading performance, identify patterns,
              recognize mistakes, and learn from them to improve trading. 
            </p>
          </div>
          {/* Abschnitt mit Häkchen-Symbol und Text */}
          <div className="flex py-6 xl:pt-8 item-start gap-2">
            <IoMdCheckmarkCircle className=" text-6xl text-PRIMARY_BLUE" />{" "}
            {/* Häkchen-Symbol */}
            <p className="xl:pt-4">
              A trading journal may include various information such as entry
              and exit points, reasons for the trade, risk and profit targets,
              market conditions, emotional states during trading, and
              reflections after completing a trade.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JournalHome;
