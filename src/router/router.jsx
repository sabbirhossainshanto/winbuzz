import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import OddSports from "../pages/OddSports/OddSports";
import EventDetails from "../pages/EventDetails/EventDetails";
import EditStake from "../pages/EditStake/EditStake";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import OpenBets from "../pages/OpenBets/OpenBets";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import APK from "../pages/APK/APK";
import NotFound from "../pages/NotFound/NotFound";
import Affiliate from "../pages/Affiliate/Affiliate";
import AffiliateUserProfitLoss from "../pages/AffiliateUserProfitLoss/AffiliateUserProfitLoss";
import AffiliateUserStatement from "../pages/AffiliateUserStatement/AffiliateUserStatement";
import Casino from "../pages/Casino/Casino";
import BettingProfitLossDetails from "../pages/BettingProfitLoss/BettingProfitLossDetails";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import Promotions from "../pages/Promotions/Promotions";
import LossBackClaims from "../pages/LossBackClaims/LossBackClaims";
import IFrame from "../pages/IFrame/IFrame";
import AppOnlyBonus from "../pages/AppOnlyBonus/AppOnlyBonus";
import DepositReport from "../pages/Reports/DepositReport";
import WithdrawReport from "../pages/Reports/WithdrawReport";
import MyBankDetails from "../pages/MyBankDetails/MyBankDetails";
import HorseRacing from "../pages/HorseRacing/HorseRacing";
import GreyhoundRacing from "../pages/GreyhoundRacing/GreyhoundRacing";
import InPlay from "../pages/InPlay/InPlay";
import BonusStatement from "../pages/BonusStatement/BonusStatement";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/sports/:eventName/:eventId",
          element: <OddSports />,
        },
        {
          path: "/in-play",
          element: <InPlay />,
        },
        {
          path: "/horse-racing",
          element: <HorseRacing />,
        },
        {
          path: "/greyhound-racing",
          element: <GreyhoundRacing />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/edit-stake",
          element: <EditStake />,
        },

        {
          path: "/betting-profit-loss",
          element: <BettingProfitLoss />,
        },
        {
          path: "/betting-profit-loss/:marketId",
          element: <BettingProfitLossDetails />,
        },
        {
          path: "/open-bets",
          element: <OpenBets />,
        },

        {
          path: "/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/apk",
          element: <APK />,
        },
        {
          path: "/affiliate",
          element: <Affiliate />,
        },
        {
          path: "/affiliate/user-profit-loss",
          element: <AffiliateUserProfitLoss />,
        },
        {
          path: "/affiliate/user-statement",
          element: <AffiliateUserStatement />,
        },
        {
          path: "/casino",
          element: <Casino />,
        },
        {
          path: "/:route/:name/:gameId",
          element: <IFrame />,
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
        {
          path: "/promotions",
          element: <Promotions />,
        },
        {
          path: "/lossback-bonus",
          element: <LossBackClaims />,
        },
        {
          path: "/app-only-bonus",
          element: <AppOnlyBonus />,
        },
        {
          path: "/deposit-report",
          element: <DepositReport />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/my-bank-details",
          element: <MyBankDetails />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  },
);
