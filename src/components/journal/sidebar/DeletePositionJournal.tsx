import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSpinnerActive } from "../../../feature/reducers/appSlice";
import { AppDispatch, RootState } from "../../../feature/store";
import { NotificationService } from "../../../services/notificationServices";
import MaxWithWrapper from "../../MaxWithWrapper";
import Spinner from "../../Spinner";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteJournalPositionApi,
  setIsDeleteJournalPositionActive,
} from "../../../feature/reducers/journalSlice";

const DeletePositionJournal = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode, isSpinnerActive } = useSelector(
    (state: RootState) => state.app
  );

  const { journalId } = useParams();
  return (
    <MaxWithWrapper>
      <div className="fixed inset-0 bg-DARK_BLUE/50 backdrop-blur-md z-50 flex justify-center items-center">
        <div
          className={`relative px-5 mx-5 w-full sm:w-1/2 lg:w-1/3 rounded-lg ${
            isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE "
          }`}
        >
          <div className="py-5 text-center border-b-2">
            <h2 className=" font-FONT_ROBOTO font-bold ">delete Journal</h2>
          </div>
          <div className="py-5">
            <p>Are you sure you want to delete this Position?</p>
          </div>
          <div className="pb-6 flex justify-center gap-4 font-FONT_VIGA text-PRIMARY_WHITE">
            <button
              className="border-2 bg-PRIMARY_RED w-20 py-1 rounded-lg hover:bg-transparent hover:border-PRIMARY_RED hover:text-PRIMARY_RED"
              onClick={async () => {
                if (!isSubmitting) {
                  setIsSubmitting(true);

                  try {
                    await dispatch(
                      deleteJournalPositionApi({
                        _id: journalId,
                      })
                    ).unwrap();
                    dispatch(setIsSpinnerActive(true));
                    setTimeout(() => {
                    
                      dispatch(setIsDeleteJournalPositionActive(false));
                      dispatch(setIsSpinnerActive(false));
                      navigate("/journal");
                    }, 3000);

              
                  } catch (error: any) {
                    NotificationService.error(error.message);
                    setTimeout(() => {
                      dispatch(setIsDeleteJournalPositionActive(false));
                      dispatch(setIsSpinnerActive(false));
                    }, 3000);
                  } finally {
                    setIsSubmitting(false);
                  }
                }
              }}
            >
              sure
            </button>
            <button
              className="border-2 bg-PRIMARY_BLUE w-20 py-1 rounded-lg hover:bg-transparent hover:border-PRIMARY_BLUE hover:text-PRIMARY_BLUE"
              onClick={() => dispatch(setIsDeleteJournalPositionActive(false))}
            >
              Cancle
            </button>
          </div>
          <div
            className={` ${isSpinnerActive ? "absolute inset-0" : "hidden"} `}
          >
            <Spinner />
          </div>
        </div>
      </div>
    </MaxWithWrapper>
  );
};

export default DeletePositionJournal;
