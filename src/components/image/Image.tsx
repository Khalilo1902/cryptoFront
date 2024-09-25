import { useDispatch, useSelector } from "react-redux"; // Redux-Hooks importieren
import { AppDispatch, RootState } from "../../feature/store"; // Typen für Dispatch und Root State importieren
import { profilePhotoUploadApi } from "../../feature/reducers/userSlice"; // Redux-Aktion für das Hochladen des Profilfotos importieren
import { useEffect, useState } from "react"; // useEffect und useState importieren
import { ImSpinner10 } from "react-icons/im"; // Spinner-Icon importieren
import { NotificationService } from "../../services/notificationServices"; // Benachrichtigungsservice importieren

interface IImageProps {
  image: boolean; // Zustand, ob ein Bild ausgewählt wurde
  setImage: (image: boolean) => void; // Funktion zum Aktualisieren des Bildzustands
}
export const Image = ({ image, setImage }: IImageProps) => {
  const dispatch = useDispatch<AppDispatch>(); // Dispatch-Funktion abrufen
  const { file, token } = useSelector((state: RootState) => state.users); // Datei und Token aus dem Redux-Zustand abrufen
  const imageURL = file ? URL.createObjectURL(file) : null; // URL des hochgeladenen Bildes erstellen

  useEffect(() => {}, [token]); // Nebeneffekt für Token-Änderungen
  useEffect(() => {}, [image]); // Nebeneffekt für Bildzustandsänderungen
  const [showBtn, setShowBtn] = useState(false); // Zustand, um Upload-Button anzuzeigen oder zu verstecken

  // Funktion zum Hochladen des Bildes
  const loadImage = async () => {
    if (file !== null) {
      console.log("file: ", file);
      console.log()
      try {
        setShowBtn(true); // Upload-Button anzeigen

        // Profilfoto hochladen und Erfolgsbenachrichtigung anzeigen
        const response = await dispatch(profilePhotoUploadApi(file)).unwrap();
        NotificationService.success(response.message);
        setTimeout(() => {
          setImage(false); // Bildzustand zurücksetzen
          setShowBtn(false); // Upload-Button ausblenden
        }, 5000);
      } catch (error: any) {
        // Fehlerbenachrichtigung anzeigen
        NotificationService.error(error.message);
        setShowBtn(false); // Upload-Button ausblenden
      }
    } else {
      // Fehlerbenachrichtigung anzeigen, wenn keine Datei ausgewählt ist
      NotificationService.error("No File");
      setShowBtn(false); // Upload-Button ausblenden
    }
  };

  // JSX der Image-Komponente rendern
  return (
    <div className="fixed top-0 w-full left-0 h-screen z-50 flex justify-center items-center ">
      <div className="absolute top-0 left-0 w-full h-full bg-white  sm:bg-transparent  backdrop-blur-sm flex justify-center items-center">
        <div className="flex flex-col rounded-lg   bg-white h-[600px] w-[500px]  overflow-hidden mx-2">
          {/* Header der Bildbearbeitung */}
          <div className="flex text-black px-8 pt-6 justify-between">
            <h2 className="font-FONT_VIGA">Image cropping</h2>
            <button className="text-2xl" onClick={() => setImage(false)}>
              X
            </button>
          </div>

          {/* Hochgeladenes Bild anzeigen */}
          <img
            className=" rounded-lg  px-20 pt-10 w-[500px] h-[400px]"
            width={400}
            height={400}
            src={imageURL!}
            alt=""
          />

          {/* Schaltflächen für das Schließen und Hochladen des Bildes */}
          <div className="flex gap-4 justify-center items-center pt-10">
            <button
              className={`${
                showBtn && "hidden"
              } py-2 px-6 rounded-md text-SECONDARY_WHITE bg-DARK_BLUE`}
              onClick={() => setImage(false)}
            >
              Close
            </button>
            <button
              className={`${
                showBtn && "hidden"
              } py-2 px-6 rounded-md text-SECONDARY_WHITE bg-DARK_BLUE`}
              
              onClick={loadImage}
            >
              Upload
            </button>

            {/* Spinner anzeigen, während das Bild hochgeladen wird */}
            <ImSpinner10
              className={
                !showBtn ? " hidden" : " animate-spin w-8 h-8 text-PRIMARY_BLUE"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
