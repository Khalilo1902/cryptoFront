import { useParams } from "react-router-dom";
import MaxWithWrapper from "../components/MaxWithWrapper";
import Positions from "../components/journal/Positions";
import { useDispatch } from "react-redux";
import Position from "../components/journal/Position";
import { useEffect } from "react";
import {


  setJournalId,
} from "../feature/reducers/journalSlice";
import CoinMarquee from "../components/coins/CoinMarquee";
import NavLeft from "../components/journal/NavLeft";
import NavRight from "../components/journal/NavRight";



const JournalPositionsPage = () => {
  const { journalId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setJournalId(journalId));
  }, [journalId, dispatch]);

  return (
    <MaxWithWrapper>
      <div className="my-6">
        <CoinMarquee />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="hidden xl:flex xl:col-span-3 bg-SECONDARY_WHITE rounded-lg">
          <NavLeft />
        </div>
        <div className="flex flex-col col-span-12 lg:col-span-8 xl:col-span-6">
          {journalId === undefined ? <Positions /> : <Position />}
        </div>
        <div className="w-full lg:col-span-4 xl:col-span-3 bg-SECONDARY_WHITE rounded-lg">
          <NavRight />
        </div>
      </div>
    </MaxWithWrapper>
  );
};

export default JournalPositionsPage;
