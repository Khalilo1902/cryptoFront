import { useDispatch, useSelector } from "react-redux"; // Redux-Hooks importieren
import { AppDispatch, RootState } from "../../../feature/store"; // Typen für Dispatch und Root State importieren
import {
  displayUser,
  editProfileUserApi,
  setFile,
} from "../../../feature/reducers/userSlice"; // Redux-Aktionen und Reduzierer importieren
import { useFormik } from "formik"; // useFormik-Hook für Formularverwaltung importieren
import * as Yup from "yup"; // Yup für Formularvalidierung importieren
import { NotificationService } from "../../../services/notificationServices"; // Benachrichtigungsservice importieren
import { useNavigate } from "react-router"; // useNavigate-Hook für die Navigation importieren
import { useRef, useState } from "react"; // useRef und useState importieren
import { Image } from "../../image/Image"; // Bildkomponente importieren

const EditProfileInfo = () => {

  const { isDarkMode } = useSelector((state: RootState) => state.app); // Dunkler Modus aus dem Redux-Zustand abrufen
  const dispatch = useDispatch<AppDispatch>(); // Dispatch-Funktion abrufen
  const navigate = useNavigate(); // Navigationsservice abrufen
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref für Dateieingabefeld erstellen
  const [image, setImage] = useState(false); // Zustand für das hochgeladene Bild


  // Funktion zum Handhaben des Dateiwechsels
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      dispatch(setFile(selectedFile)); // Datei im Redux-Zustand festlegen
      setImage(true); // Zustand aktualisieren, um das Bild anzuzeigen
    }
  };

  // Funktion zum Auslösen des Klicks auf das Dateieingabefeld
  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  // Benutzer-ID aus dem lokalen Speicher abrufen
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) =>
    displayUser(state, userId || "")
  );

  const formSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed in first name"),

    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed in last name"),

    bio: Yup.string()
      .min(10, "Die Beschreibung muss mindestens 10 Zeichen lang sein")
      .required("Eine Beschreibung ist erforderlich"),
    gender: Yup.string().oneOf(["male", "female", "diverse"]),
  });

  // useFormik-Hook verwenden, um das Formular zu verwalten
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio,
      gender: user?.gender,
    },

    onSubmit: async (values) => {
      try {
        // Profilaktualisierung durchführen und Erfolgsnachricht anzeigen
        const response = await dispatch(editProfileUserApi(values)).unwrap();
        console.log("response", response);
        NotificationService.success(response.message);

        setTimeout(() => {
          navigate(`/profile/${userId}`);

        }, 3000);
      } catch (error: any) {
        // Fehler anzeigen, wenn die Aktualisierung fehlschlägt
        NotificationService.error(error.message);
      }
    },

    validationSchema: formSchema, // Validierungsschema festlegen
  });

  // JSX-Komponente rendern
  return (
    <div
      className={`w-full p-4 h-fit flex justify-center items-center rounded-lg ${
        isDarkMode ? " bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
      }`}
    >
      <div className="w-full text-left">
        <div className="flex items-start flex-col gap-2">
          <h1 className="text-4xl font-bold font-FONT_VIGA mb-7">Profile</h1>
          <p className="font-bold">Email: {user?.email}</p>

          {/* Abschnitt für Profilbild */}
          <div className="mb-5 flex gap-3 items-center">
            <img
              className="w-24 h-24 rounded-full text-xl"
              src={user?.profile_photo}
              alt=""
            />
            <div className="flex items-cente btn btn-primary cursor-pointer ">
              <button onClick={handleClick}>change photo</button>
              <input
                name="file"
                className="cursor-pointer"
                type="file"
                hidden
                ref={inputRef}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Abschnitt für Bildvorschau */}
        <div className={`${image ? "flex" : "hidden"}`}>
          <Image image={image} setImage={setImage} />
        </div>

        {/* Trennlinie */}
        <div
          className={`border border-1  w-full mx-auto text-xl ${
            isDarkMode ? "bg-black" : "border-SECONDARY_GRAY"
          }`}
        />

        {/* Formular zur Bearbeitung des Profils */}
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full mt-3 flex flex-col items-start justify-start gap-2">
            <input
              name="firstName"
              type="text"
              defaultValue={formik.values.firstName}
              className={`  ${isDarkMode ? " input-dark" : "input-light"}`}
              placeholder="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              name="lastName"
              type="text"
              defaultValue={formik.values.lastName}
              className={`input  ${isDarkMode ? " input-dark" : "input-light"}`}
              placeholder="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <textarea
              className={`  ${isDarkMode ? " input-dark" : "input-light"}`}
              name="bio"
              placeholder="Write something about yourself"
              id=""
              cols={30}
              rows={10}
              defaultValue={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>

          {/* Abschnitt für das Geschlecht */}
          <div className="w-2/3 mt-4">
            <fieldset>
              <div className="flex items-center gap-10 mt-2 font-bold font-FONT_VIGA text-lg">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="mr-2 cursor-pointer w-5 h-5"
                    name="gender"
                    defaultValue="male"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "male"}
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="mr-2 cursor-pointer w-5 h-5 "
                    name="gender"
                    defaultValue="female"
                    checked={formik.values.gender === "female"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  Female
                </label>
                <label className="flex items-center ">
                  <input
                    type="radio"
                    className="mr-2 cursor-pointer w-5 h-5 "
                    name="gender"
                    defaultValue="diverse"
                    checked={formik.values.gender === "diverse"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  Diverse
                </label>
              </div>
            </fieldset>
          </div>

          {/* Abschnitt für Fehleranzeige */}
          <div className="w-1/3 mt-7">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold font-FONT_VIGA text-lg py-2 px-4 w-full rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileInfo;
