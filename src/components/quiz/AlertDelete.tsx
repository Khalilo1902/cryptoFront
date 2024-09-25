import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";
const AlertDelete = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const clearForm = () => {
    const inputs = document.querySelectorAll("input");

    for (const input of inputs) {
      input.checked = false;
    }
  };
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=" w-full flex flex-col gap-5 font-FONT_VIGA ">
            <div
              className={`${
                isDarkMode ? " bg-SECONDARY_WHITE" : " bg-SECONDARY_BLACK"
              } flex flex-col p-5 rounded-lg gap-3`}
            >
              <h1 className=" text-SECONDARY_RED">Confirm to clear</h1>
              <p className={`${
                isDarkMode ? " text-SECONDARY_BLACK" : " text-SECONDARY_WHITE"
              }`}>Are you sure to do this.</p>
              <div className="flex justify-between items-center">
                <button
                  className="px-5 py-2 bg-SECONDARY_RED text-SECONDARY_WHITE rounded-xl"
                  onClick={() => {
                    clearForm();
                    onClose();
                  }}
                >
                  Yes
                </button>
                <button
                  className="px-5 py-2 bg-SECONDARY_GREEN text-white rounded-xl"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };
  return (
    <div className="">
      <button
        className="border border-SECONDARY_RED bg-SECONDARY_RED text-SECONDARY_WHITE  hover:bg-transparent hover:text-SECONDARY_RED font-FONT_VIGA px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK"
        onClick={submit}
      >
        clear form
      </button>
    </div>
  );
};

export default AlertDelete;
