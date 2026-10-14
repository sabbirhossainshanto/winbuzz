import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLoginModal,
  setShowMobileSidebar,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import Rules from "../../modals/Rules/Rules";
import SearchBox from "./SearchBox";
import Balance from "./Balance";
import Dropdown from "./Dropdown";
import Login from "../../modals/Login/Login";
import Register from "../../modals/Register/Register";
import ForgotPassword from "../../modals/ForgotPassword/ForgotPassword";
import { Link } from "react-router-dom";
import { useLogo } from "../../../context/ApiProvider";
import MobileSearch from "../../modals/MobileSearch/MobileSearch";
import images from "../../../assets/images";
import { Settings } from "../../../api";
import Language from "../../modals/Language";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const TopNav = () => {
  const { getLanguage, setLanguage } = useLanguage();
  const [showLanguage, setShowLanguage] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState();
  const { logo } = useLogo();
  const { showLoginModal, showRegisterModal, showForgotPasswordModal } =
    useSelector((state) => state.global);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleShowLogin = () => {
    dispatch(setShowLoginModal(true));
  };
  const handleShowRegister = () => {
    dispatch(setShowRegisterModal(true));
  };

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "english");
  }, [setLanguage]);
  return (
    <Fragment>
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}
      {showRulesModal && <Rules setShowRulesModal={setShowRulesModal} />}
      {showMobileSearch && (
        <MobileSearch setShowMobileSearch={setShowMobileSearch} />
      )}
      <div data-v-9dda4895 className="header-wapper">
        <div data-v-9dda4895 className="container-fluid">
          <div data-v-9dda4895 className="navbar-sec">
            <div data-v-9dda4895 className="nav-left">
              <ul data-v-9dda4895>
                <li data-v-9dda4895 className="mobile-toggle">
                  <div data-v-9dda4895 className="mobile-toggle-btn-sec">
                    <div data-v-9dda4895 className="mobile-search-menu">
                      <button
                        style={{ pointerEvents: "auto" }}
                        onClick={() => {
                          dispatch(setShowMobileSidebar(true));
                        }}
                        data-v-9dda4895
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                        title="Toggle menu"
                        className="last_login_at"
                      >
                        <span
                          data-v-9dda4895
                          id="menu-toggle1"
                          className="menu-toggle"
                        >
                          <span
                            data-v-9dda4895
                            className="menu-toggle-bar menu-toggle-bar--top"
                          />
                          <span
                            data-v-9dda4895
                            className="menu-toggle-bar menu-toggle-bar--middle"
                          />
                          <span
                            data-v-9dda4895
                            className="menu-toggle-bar menu-toggle-bar--bottom"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
                <li data-v-9dda4895>
                  <Link
                    data-v-9dda4895
                    aria-current="page"
                    to="/"
                    className="router-link-active router-link-exact-active desktop-logo"
                  >
                    <img
                      data-v-9dda4895
                      loading="lazy"
                      style={{ display: "initial" }}
                      src={logo}
                      alt="logo"
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div data-v-9dda4895 className="nav-right header-nav-rgt">
              <ul
                style={{ display: "flex", alignItems: "center" }}
                data-v-9dda4895
              >
                <li data-v-9dda4895 className="search-box">
                  <a
                    data-v-9dda4895
                    onClick={() => setShowMobileSearch(true)}
                    className="search-btn"
                    data-bs-toggle="modal"
                  >
                    <i data-v-9dda4895 className="fa fa-search" />
                  </a>
                </li>
                {token && (
                  <li data-v-9dda4895 className="rules-modal">
                    <a
                      data-v-9dda4895
                      className="bdr-btn rules-btn"
                      onClick={() => setShowRulesModal(true)}
                      data-bs-toggle="modal"
                    >
                      {getLanguage(LanguageKey.RULES)}
                    </a>
                  </li>
                )}
                <SearchBox />
                {!token && (
                  <Fragment>
                    <li data-v-9dda4895>
                      <a
                        onClick={handleShowLogin}
                        data-v-9dda4895
                        data-bs-toggle="modal"
                        className="bdr-btn signup-login-btn login-btn"
                      >
                        {getLanguage(LanguageKey.LOGIN)}
                      </a>
                    </li>
                    <li data-v-9dda4895>
                      <a
                        onClick={handleShowRegister}
                        data-v-9dda4895
                        data-bs-toggle="modal"
                        className="bdr-btn signup-login-btn signup-btn"
                      >
                        {getLanguage(LanguageKey.REGISTER)}
                      </a>
                    </li>
                  </Fragment>
                )}

                {token && (
                  <Fragment>
                    <Balance />

                    <Dropdown />
                  </Fragment>
                )}
                <li data-v-9dda4895>
                  {" "}
                  <div
                    style={{
                      position: "relative",
                      padding: "1px 4px",
                      marginTop: "5px",
                    }}
                  >
                    {Settings.language && (
                      <button onClick={() => setShowLanguage((prev) => !prev)}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "end",
                            background: "transparent",
                            border: "none",
                          }}
                        >
                          <img
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
                            src={images.globe}
                            alt=""
                          />
                          <b
                            style={{
                              margin: "0px",
                              fontSize: "10px",
                              textTransform: "capitalize",
                              color: "white",
                            }}
                          >
                            {/* {language || "EN"} */}
                          </b>
                        </div>
                      </button>
                    )}
                    {showLanguage && (
                      <Language setShowLanguage={setShowLanguage} />
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopNav;
