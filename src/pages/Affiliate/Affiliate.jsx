import "./affiliate.css";
import Footer from "../../components/modules/Affiliate/Footer";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import { useLocation } from "react-router-dom";

const Affiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div className="no-scrollbar h-full overflow-y-auto">
        <div className="px-2 w-full">
          <div className="main-content">
            <Footer />
            {(tab === "dashboard" || !tab) && (
              <div data-v-4c49d924 className="">
                <TodayStatusSection />
                <InviteSection />
                <BonusInformation />
                <TodayProfitLoss />
              </div>
            )}

            {tab === "user-list" && (
              <div data-v-4c49d924 className="">
                <UserList />
              </div>
            )}
            {tab === "pnl" && (
              <div data-v-4c49d924 className="">
                <ProfitLoss />
              </div>
            )}
            {tab === "reports" && (
              <div data-v-4c49d924 className="">
                <Reports />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
