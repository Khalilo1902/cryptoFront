import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../feature/store";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { paymentJournlApi } from "../../../feature/reducers/userSlice";
import { NotificationService } from "../../../services/notificationServices";
const journalList = [
  {
    id: 1,
    title: "1",
    price: 12.99,
    situation: "normal",
  },
  {
    id: 2,
    title: "3",
    price: 34.99,
    situation: "silver",
  },
  {
    id: 3,
    title: "6",
    price: 69.99,
    situation: "gold",
  },
  {
    id: 4,
    title: "12",
    price: 120.99,
    situation: "platinum",
  },
];

const JournalPrice = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);

  // const [userData, setUserData] = useState({ email: "", value: 0, date: "" });
  const dispatch = useDispatch<AppDispatch>();
  const paymentJournal = async (
    planJournal: string,
    priceJournal: string
  ) => {
    try {
      await dispatch(
        paymentJournlApi({
          planJournal,
          priceJournal,
        })
      ).unwrap();
    } catch (error: any) {
      NotificationService.error(error.message);
      console.log(error.message)
    }
  };
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AfFifqYzM9eH9RUmbJ3oMahQg1o2XmMQW4hZunhxBtdBlIKnaEomVSw79UsxUOh50sIEorQqcUYMUFvM",
      }}
    >
      <div
        className={`mt-12 py-8 rounded-xl ${
          isDarkMode ? "bg-SECONDARY_BLACK" : "bg-SECONDARY_WHITE"
        }`}
      >
        <div className="text-center flex flex-col gap-5 pt-10 ">
          <h1>Flexible Payment Plans for Your </h1>
          <h1>Annual Subscription</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center mt-10  ">
          {journalList.map((item,index) => (
            <div
              className={` flex justify-center my-4 last:border-none`}
              key={index}
            >
              <div
                className={`flex flex-col place-items-center px-10 rounded-xl py-5 ${
                  isDarkMode ? "bg-PRIMARY_BLACK" : "bg-PRIMARY_WHITE"
                } ${item?.situation === "platinum" ? "bg-PLATINUM_COLOR" : ""}`}
              >
                <h3 className="text-xl">{item?.title} Month</h3>
                <p className="text-xl font-bold pt-4 flex items-center gap-1">
                  ${item?.price.toFixed(2)}{" "}
                  <span className="text-xs">{item?.situation}</span>{" "}
                </p>
                <PayPalButtons
                  className="mt-4 py-2"
                  style={{ layout: "horizontal" }}
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: item.price.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (_, actions) => {
                    if (actions.order) {
                      return actions.order.capture().then((details) => {
                        console.log(details);
                        console.log(details.status);
                        if (details.status === "COMPLETED") {
                          paymentJournal(item?.title, item?.price.toString());
                        }
                      });
                    }
                    return Promise.resolve();
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-center py-6">Welcome to JournalApp!</h1>
          <div className="text-start py-3 px-6">
            <p className="pt-3">
              your trading activities within a personal journal format. Embedded
              seamlessly within our website, JournalApp offers a user-friendly
              platform where you can meticulously document your trades,
              purchases, and sales, complete with timestamps, descriptions, and
              transaction details.
            </p>
            <p className="pt-3">
              Maintaining a comprehensive record of your trading endeavors is
              effortless with JournalApp. Whether you're dealing in stocks,
              cryptocurrencies, forex, or other financial instruments, our
              application empowers you to log each transaction with precision.
            </p>

            <p className="py-3 font-bold">
              Let's delve into some of the standout features of JournalApp:
            </p>

            <p>
              <span className="font-bold">1.Easy Trade Addition: </span>
              JournalApp boasts an intuitive user interface, allowing you to
              effortlessly add new trades. Simply input pertinent details such
              as the asset traded, transaction type (buy or sell), timing, and a
              brief description.
            </p>

            <p className="pt-3">
              <span className="font-bold">2.Detailed Entries: </span> Each entry
              within JournalApp provides the flexibility to capture specific
              details of your trading activity. You can augment entries with
              notes detailing pivotal events or strategies that influenced your
              decisions.
            </p>
            <p className="pt-3">
              <span className="font-bold">3.Comprehensive Analysis: </span>{" "}
              JournalApp equips you with robust analytical tools to dissect your
              trading activities and discern trends over time. By monitoring
              profits, losses, and other metrics, you can glean insights to
              refine and optimize your trading strategies.
            </p>
            <p className="pt-3">
              <span className="font-bold">4.Security and Privacy: </span>{" "}
              Safeguarding your data is paramount to us. JournalApp employs
              state-of-the-art encryption technologies to ensure the
              confidentiality and integrity of your personal information.
            </p>
            <p className="pt-3">
              Whether you're a seasoned trader seeking to fine-tune your
              portfolio or a novice venturing into the realm of trading for the
              first time, JournalApp offers an ideal solution to streamline and
              enhance your trading activities. Embark on your journey today and
              witness firsthand how JournalApp can propel you toward your
              financial objectives!
            </p>
            <p className="pt-3">
              Now, let's explore a presentation elucidating the rationale behind
              the development of this component and its significance.
            </p>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
export default JournalPrice;
