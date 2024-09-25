import { useSelector } from "react-redux"; // Importiere useSelector Hook von react-redux für den Zugriff auf den Store
import { RootState } from "../../feature/store"; // Importiere RootState, um den Typ des Store-States zu definieren
import logo from "../../assets/images/logo.png"; // Importiere das Logo-Bild
import MaxWithWrapper from "../MaxWithWrapper"; // Importiere MaxWithWrapper-Komponente
import { FaPhoneFlip } from "react-icons/fa6"; // Importiere das Telefonsymbol von react-icons/fa6
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Importiere Social-Media-Symbole von react-icons/fa
import { IoLogoYoutube } from "react-icons/io5"; // Importiere das YouTube-Symbol von react-icons/io5
import { motion } from "framer-motion"; // Importiere motion von framer-motion für Animationen
import { fadeIn } from "../../utils/motin";
import { useMediaQuery } from "@react-hook/media-query"; // Importiere die fadeIn-Animationsfunktion aus den Motin-Utilities

const Footer = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app); // Zustand des Dunkelmodus aus dem Store abrufen
  const isMediumScreen = useMediaQuery("(max-width: 640px)");
  return (
    <div
      className={` mt-4 px-3 font-FONT_VIGA ${
        isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
      }`}
    >
      <MaxWithWrapper className="pt-4">
        <div className="flex flex-col gap-4 md:flex md:flex-row justify-between border-b-2 pb-2">
          {/* Bereich mit dem Firmenlogo und den Kontaktinformationen */}
          <motion.div
            variants={fadeIn("left", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ margin: "100px" }}
          >
            <div>
              <div className="flex items-center gap-3">
                <img className="w-8" src={logo} alt="" /> {/* Firmenlogo */}
                <p className="text-2xl">Crypto</p> {/* Firmenname */}
              </div>
              {/* Kontaktinformationen */}
              <div className="flex items-center gap-4 my-4 cursor-pointer">
                <p className="text-xl">Let's talk! </p>
                <FaPhoneFlip className="text-xl text-yellow-500 hover:animate-bounce " />
              </div>
              <p className="my-2 text-PRIMARY_GRAY cursor-pointer">
                {" "}
                +49 744 666 8582
              </p>
              <p className="mb-2  text-PRIMARY_GRAY cursor-pointer">
                Info.acctive.crypto@gmail.com
              </p>
              <p className=" text-PRIMARY_GRAY">Van-Topo-str , 66</p>
              <p className=" text-PRIMARY_GRAY">Fantasy City 66664</p>
              <p className="text-PRIMARY_GRAY">Germany</p>
            </div>
          </motion.div>

          {/* Trennlinie für mobile Ansicht */}
          <div className="md:hidden border-b-2" />

          {/* Bereich für Newsletter-Anmeldung */}
          <motion.div
            variants={
              isMediumScreen ? fadeIn("left", 0.8) : fadeIn("right", 0.8)
            }
            initial="hidden"
            whileInView="show"
            viewport={{ margin: "100px" }}
          >
            <div>
              <p className="text-2xl">Newletters</p> {/* Titel */}
              <div className="py-4">
                <p className=" text-PRIMARY_GRAY">
                  Subscribe Our Newsletter To Get More
                </p>
                <p className=" text-PRIMARY_GRAY">Free Infos and Resource </p>
              </div>
              {/* Eingabefeld für E-Mail-Adresse und Anmeldebutton */}
              <div
                className={`flex justify-between rounded-full w-full py-3 px-4 ${
                  isDarkMode ? "bg-PRIMARY_BLACK" : "bg-PRIMARY_WHITE"
                }`}
              >
                <input
                  placeholder="Enter Your Email"
                  className={`rounded-full outline-none w-full md:w-[300px]  ${
                    isDarkMode ? "bg-PRIMARY_BLACK" : "bg-PRIMARY_WHITE"
                  }`}
                  type="email"
                />
                <button className="bg-PRIMARY_BLUE py-1  px-3 rounded-full">
                  submit
                </button>
              </div>
              {/* Social-Media-Icons */}
              <div className="flex gap-8 text-xl mt-4 ">
                <FaFacebookF className="hover:text-PRIMARY_BLUE" />
                <FaInstagram className="hover:text-PRIMARY_BLUE" />
                <IoLogoYoutube className="hover:text-PRIMARY_BLUE" />
                <FaTwitter className="hover:text-PRIMARY_BLUE" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright-Text */}
      <div className="flex flex-col items-center">
      <p className="w-full text-center pt-2">
          ©2024 Crypto.Com. All Rights Reserved.Terms Of Service | Privacy
          Terms
        </p>
        <p>
        powered by Adel & Ghulam & Khalil 
        </p>
      </div>
      </MaxWithWrapper>
    </div>
  );
};

export default Footer;
