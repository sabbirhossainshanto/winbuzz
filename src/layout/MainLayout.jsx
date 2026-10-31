import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/UI/Navbar/Navbar";
import SocialLink from "../components/UI/SocialLink/SocialLink";
import LeftSidebar from "../components/UI/LeftSidebar/LeftSidebar";
import MobileFooter from "../components/UI/MobileFooter/MobileFooter";
import { useSelector } from "react-redux";
import DepositWithdrawBTN from "../components/UI/DepositWithdrawBTN/DepositWithdrawBTN";
import LeftMobileSidebar from "../components/UI/LeftMobileSidebar/LeftMobileSidebar";
import { Settings } from "../api";
import Banner from "../components/modals/Banner/Banner";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { showBanner } = useSelector((state) => state.global);
  return (
    <Fragment>
      {Settings.metaDescription && (
        <meta name="description" content={Settings.metaDescription} />
      )}
      {Settings.metaKeywords && (
        <meta name="keywords" content={Settings.metaKeywords} />
      )}
      {Settings.gscTag && (
        <meta name="google-site-verification" content={Settings.gscTag} />
      )}
      {Settings.metaTitle && <title>{Settings.metaTitle}</title>}
      <meta name="robots" content="index, follow" />
      {showBanner && <Banner />}
      <LeftMobileSidebar />
      <Navbar />
      {token && pathname === "/" && <DepositWithdrawBTN />}
      <section className="padding-top-105 main-body-container-sec mb-10 md:mb-0">
        <div className="row cric-login-grid-sec">
          <LeftSidebar />
          <Outlet />
        </div>
      </section>
      {pathname === "/" && <SocialLink />}

      {!pathname.includes("event-details") && <MobileFooter />}
    </Fragment>
  );
};

export default MainLayout;
