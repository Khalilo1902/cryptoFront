import axios from "axios";
import { SERVER_URL, axiosJWT } from "..";
import { TJournal } from "../../interface";

//GET ALL Journal
export const getAllJournals = () => {
  const url = `${SERVER_URL}/journals`;
  return axios.get(url);
};

//Create a Journal
export const createJournal = (journal: TJournal) => {
  const url = `${SERVER_URL}/journals/createJournal`;
  const formData = {
    baseCoin: journal.baseCoin,
    quoteCoin: journal.quoteCoin,
    tradeType: journal.tradeType,
    startTime: journal.startTime,
    startDate: journal.startDate,
    price: journal.price,
    takeProfit: journal.takeProfit,
    stopLoss: journal.stopLoss,
    riskReward: journal.riskReward,
    reasonsforEntry: journal.reasonsforEntry,
    user: journal.userId,
  };

  return axiosJWT.post(url, formData);
};

//edit Journal Open
export const editJournalOpen = (journal: TJournal) => {
  const url = `${SERVER_URL}/journals/editJournalOpen/${journal._id}`;
  const formData = {
    baseCoin: journal.baseCoin,
    quoteCoin: journal.quoteCoin,
    tradeType: journal.tradeType,
    startTime: journal.startTime,
    price: journal.price,
    takeProfit: journal.takeProfit,
    stopLoss: journal.stopLoss,
    riskReward: journal.riskReward,
    reasonsforEntry: journal.reasonsforEntry,
  };

  return axiosJWT.put(url, formData);
};

//Journal Position Close
export const journalPositionClose = (journal: TJournal) => {
  const url = `${SERVER_URL}/journals/journalPositionClose/${journal._id}`;
  const formData = {
    baseCoin: journal.baseCoin,
    quoteCoin: journal.quoteCoin,
    tradeType: journal.tradeType,
    startTime: journal.startTime,
    price: journal.price,
    takeProfit: journal.takeProfit,
    stopLoss: journal.stopLoss,
    riskReward: journal.riskReward,
    reasonsforEntry: journal.reasonsforEntry,
    isClose:journal.isClose,
    results:journal.results,
    profit:journal.profit,
    loss:journal.loss,
    endDate:journal.endDate,
    endTime:journal.endTime,
    tradeSummary:journal.tradeSummary
  };

  return axiosJWT.put(url, formData);
};

//delete Journal Position
export const deleteJournalPosition = (journal: TJournal) => {
  const url = `${SERVER_URL}/journals/deleteJournalPosition/${journal._id}`;
  return axiosJWT.delete(url);
};
