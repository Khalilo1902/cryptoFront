import { useEffect, useState } from "react";
import MaxWithWrapper from "../components/MaxWithWrapper";
import HeaderJournal from "../components/journal/HeaderJournal";
import Calender from "../components/journal/Calender";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../feature/store";
import { checkAndUpdateExpDateJournalApi } from "../feature/reducers/userSlice";
import { NotificationService } from "../services/notificationServices";
import { setIsShowPositionHeaderActive } from "../feature/reducers/journalSlice";

const JournalPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [expJournal, setExpJournal] = useState("");

  const checkExpJournal = async () => {
    try {
      const response = await dispatch(
        checkAndUpdateExpDateJournalApi()
      ).unwrap();
      if (response.status === 200) setExpJournal(response.message);
    } catch (error: any) {
      NotificationService.error(error.message);
    }
  };

  useEffect(() => {
    checkExpJournal();

    const interval = setInterval(checkExpJournal, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [years, setYears] = useState(new Date().getFullYear());

  return (
   <div className="" onClick={()=>{
    dispatch(setIsShowPositionHeaderActive(false))
   }}>
     <MaxWithWrapper className="">
      <HeaderJournal
        expJournal={expJournal}
        month={month}
        setMonth={setMonth}
        years={years}
        setYears={setYears}
      />
      <Calender month={month} years={years} />
    </MaxWithWrapper>
   </div>
  );
};

export default JournalPage;
