import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AnalyzePage from "../pages/AnalyzePage";
import NewsPage from "../pages/NewsPage";
import AuthPage from "../pages/AuthPage";
import CalcPage from "../pages/CalcPage";
import VerifyAccountPage from "../pages/VerifyAccountPage";
import NotFound from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import CoinPage from "../pages/CoinPage";
import SettingProfilePage from "../pages/SettingProfilePage";
import ExplorePage from "../pages/ExplorePage";
import JournalPage from "../pages/JournalPage";
import PostPage from "../pages/PostPage";
import QuizPage from "../pages/QuizPage";
import QuizResultPage from "../pages/QuizResultPage";
import AuthenticationPage from "../pages/AuthenticationPage";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../feature/store";
import { displayUser } from "../feature/reducers/userSlice";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import JournalPricePage from "../pages/JournalPricePage";
import JournalPositionsPage from "../pages/JournalPositionsPage";


const useAccountVerification = () => {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));
  const isVerified = user?.isAccountVerified;

  return isVerified;
};

const useJournalPlan = () => {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state: RootState) => displayUser(state, userId!));

  const isPaid = user?.isPaid;
  return isPaid;
};

const isUserLogin = () => {
  const userId = localStorage.getItem("userId");
  return userId;
};

const RouteGuardLogin = ({ children }: { children: React.ReactNode }) => {
  const userId = isUserLogin();
  if (!userId) {
    return <HomePage />;
  }
  return children;
};

const RouteGuardVerify = ({ children }: { children: React.ReactNode }) => {
  const isVerified = useAccountVerification();

  if (!isVerified) {
    return <AuthenticationPage />;
  }
  return children;
};

const RouteGuardJournal = ({ children }: { children: React.ReactNode }) => {
  const isPaid = useJournalPlan();

  if (!isPaid) {
    return <JournalPricePage />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: (
          <RouteGuardLogin>
            <ExplorePage />
          </RouteGuardLogin>
        ),
      },
      {
        path: "/analyze",
        element: <AnalyzePage />,
      },
      {
        path: "/analyze/:analyzeId",
        element: <AnalyzePage />,
      },
      {
        path: "/coin",
        element: <CoinPage />,
      },
      {
        path: "/coin/:coinId",
        element: <CoinPage />,
      },
      {
        path: "/post/:postId",

        element: (
          <RouteGuardLogin>
            <PostPage />,
          </RouteGuardLogin>
        ),
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/news/:newsId",
        element: <NewsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/forget-password",
        element: <ForgetPasswordPage />,
      },
      {
        path: "/calc",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <CalcPage />
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/profile/:userId",
        element: (
          <RouteGuardLogin>
            <ProfilePage />
          </RouteGuardLogin>
        ),
      },
      {
        path: "/edit-profile/:targetUserId",
        element: (
          <RouteGuardLogin>
            <SettingProfilePage />
          </RouteGuardLogin>
        ),
      },
      {
        path: "/verify_account/:verifyToken",
        element: <VerifyAccountPage />,
      },

      {
        path: "/journal",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <RouteGuardJournal>
                <JournalPage />
              </RouteGuardJournal>
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/positions",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <RouteGuardJournal>
                <JournalPositionsPage />
              </RouteGuardJournal>
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/positions/:journalId",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <RouteGuardJournal>
                <JournalPositionsPage />
              </RouteGuardJournal>
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/quiz",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <QuizPage />
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/quiz-result",
        element: (
          <RouteGuardLogin>
            <RouteGuardVerify>
              <QuizResultPage />
            </RouteGuardVerify>
          </RouteGuardLogin>
        ),
      },
      {
        path: "/authentication",
        element: <AuthenticationPage />,
      },
    ],
  },
]);
