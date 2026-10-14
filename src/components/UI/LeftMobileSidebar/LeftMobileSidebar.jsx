import { useDispatch, useSelector } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import {
  setShowLoginModal,
  setShowMobileSidebar,
} from "../../../redux/features/global/globalSlice";
import ModalWrapper from "../../modals/ModalWrapper/ModalWrapper";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { LanguageKey } from "../../../const";
import { eventNameList } from "../../../static/event-name-list";
import useLanguage from "../../../hooks/use-language";

const LeftMobileSidebar = () => {
  const { getLanguage } = useLanguage();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showMobileSidebar } = useSelector((state) => state.global);
  const { logo } = useLogo();

  const closeSidebar = () => {
    dispatch(setShowMobileSidebar(false));
  };

  const handleNavigate = (link) => {
    navigate(link);
    closeSidebar();
  };

  const handleNavigateAfterCheckAuth = (link) => {
    if (token) {
      navigate(link);
      closeSidebar();
    } else {
      dispatch(setShowLoginModal(true));
      closeSidebar();
    }
  };

  return (
    <div className={`${showMobileSidebar ? "mobile-sidebar-container" : ""}`}>
      <div
        className="sbar_collapsed"
        style={{
          transform: showMobileSidebar ? "translateX(0)" : "translateX(-100%)",
          transition: "0.5s",
          zIndex: 9999999,
        }}
      >
        <ModalWrapper setModal={setShowMobileSidebar} redux={true}>
          <div className="sidebar-menu desktop-none">
            <div className="sidebar-logo">
              <a href="/m/%5B'/m/dashboard'%5D">
                <img alt="logo" src={logo} />
              </a>
              <div onClick={closeSidebar} className="nav-btn closebtn">
                X
              </div>
            </div>
            <div className="main-menu">
              <div className="menu-inner">
                <nav>
                  <ul id="menu" className="metismenu">
                    <li>
                      <a
                        className="active"
                        onClick={() => handleNavigate("/sports/cricket/4")}
                      >
                        <img alt="" className="menu-icon" src="/icon/4.svg" />
                        <span> {getLanguage(LanguageKey.CRICKET)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="active"
                        onClick={() => handleNavigate("/sports/cricket/1")}
                      >
                        <img alt="" className="menu-icon" src="/icon/1.svg" />
                        <span> {getLanguage(LanguageKey.FOOTBALL)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => handleNavigate("/sports/cricket/2")}
                        className="active"
                      >
                        <img alt="" className="menu-icon" src="/icon/2.svg" />
                        <span> {getLanguage(LanguageKey.TENNIS)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => handleNavigate("/sports/cricket/5")}
                        className="active"
                      >
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/sports-no-YhxjmpH9.png"
                        />
                        <span> {getLanguage(LanguageKey.KABADDI)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => handleNavigate("/sports/cricket/6")}
                        className="active"
                      >
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/2378961.png"
                        />
                        <span>{getLanguage(LanguageKey.POLITICS)}</span>
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() =>
                          handleNavigate("/casino?product=All&category=All")
                        }
                        className="active"
                      >
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/99998.svg"
                        />
                        <span>{getLanguage(LanguageKey.CASINO)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleNavigateAfterCheckAuth(
                            "/casino/sportsbook/550000",
                          )
                        }
                      >
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/99991.svg"
                        />
                        <span>{getLanguage(LanguageKey.SPORTSBOOK)}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleNavigateAfterCheckAuth(
                            "/casino/fantasy-11/595001",
                          )
                        }
                      >
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/99991.svg"
                        />
                        <span>{getLanguage(LanguageKey.FANTASY_11)}</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleNavigate("/horse-racing")}>
                        <img alt="" className="menu-icon" src="/icon/7.svg" />
                        <span> {getLanguage(LanguageKey.HORSE)}</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleNavigate("/greyhound-racing")}>
                        <img
                          alt=""
                          className="menu-icon"
                          src="/icon/4339.svg"
                        />
                        <span> {getLanguage(LanguageKey.GREYHOUND)}</span>
                      </a>
                    </li>
                    {eventNameList.map((item) => {
                      return (
                        <li key={item.id}>
                          <a
                            onClick={() =>
                              handleNavigate(`/sports/${item.name}/${item.id}`)
                            }
                            className="active"
                          >
                            <img
                              alt=""
                              className="menu-icon"
                              src={item.image}
                            />
                            <span>{getLanguage(item.name)}</span>
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <a>
                        <img src="/icon/rules.svg" className="menu-icon" />
                        <span>{getLanguage(LanguageKey.RULES)}</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </ModalWrapper>
      </div>
    </div>
  );
};

export default LeftMobileSidebar;
