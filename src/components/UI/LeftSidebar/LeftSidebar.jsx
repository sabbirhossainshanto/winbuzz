import { useDispatch, useSelector } from "react-redux";
import { Settings } from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const LeftSidebar = () => {
  const { getLanguage } = useLanguage();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  // const navigateWhatsApp = () => {
  //   if (token && Settings?.branchWhatsapplink) {
  //     window.open(Settings?.branchWhatsapplink, "_blank");
  //   } else {
  //     window.open(Settings?.whatsapplink, "_blank");
  //   }
  // };

  const handleNavigateAfterCheckAuth = (link) => {
    if (token) {
      navigate(link);
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <div className="col-0 col-sm-0 col-md-0 col-lg-2 box-shd-sec">
      <div className="left-side-bar-sec darkmenu-sidebar" id="show-m-toggle">
        <div className="app-lft-sidebar">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <img loading="lazy" src="/icon/close-icon-HndtBqSa.svg" alt="" />
          </button>
          <div className="offcanvass-logo-sec mobile-logo">
            <img
              loading="lazy"
              src="https://assets3.hurry2.com/site_logo/winbuzz3844.png"
              alt=""
            />
          </div>
          <div className="mobile-sidemenu-wrapper">
            <div className="depo-and-wdrl-sec">
              <ul>
                <li>
                  <Link
                    to="/sports/cricket/4?type=inPlay"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sports-cricket-Qf1NmI1h.png"
                        alt="cricket"
                      />
                    </div>
                    <span> {getLanguage(LanguageKey.CRICKET)}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sports/Football/1?type=inPlay"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sports-soccer-CaiOK3CT.png"
                        alt="Football"
                      />
                    </div>
                    <span> {getLanguage(LanguageKey.FOOTBALL)}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sports/tennis/2?type=inPlay"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sports-tennis-DzBamNaA.png"
                        alt="tennis"
                      />
                    </div>
                    <span> {getLanguage(LanguageKey.TENNIS)}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/horse-racing" className="multi-mark-bg">
                    <div className="icon-sidemenu">
                      <img loading="lazy" src="/icon/7.png" alt="tennis" />
                    </div>
                    <span> {getLanguage(LanguageKey.HORSE)}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/greyhound-racing" className="multi-mark-bg">
                    <div className="icon-sidemenu">
                      <img loading="lazy" src="/icon/4339.png" alt="tennis" />
                    </div>
                    <span> {getLanguage(LanguageKey.GREYHOUND)}</span>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() =>
                      handleNavigateAfterCheckAuth("/casino/sportsbook/550000")
                    }
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sidebar-sportsbook-CJaqUNak.svg"
                        alt=""
                      />
                    </div>
                    <span>{getLanguage(LanguageKey.SPORTSBOOK)}</span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      handleNavigateAfterCheckAuth("/casino/fantasy-11/595001")
                    }
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sidebar-sportsbook-CJaqUNak.svg"
                        alt=""
                      />
                    </div>
                    <span>{getLanguage(LanguageKey.FANTASY_11)}</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/casino?product=All&category=All"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sidebar-intcasino-BYVw7v_R.svg"
                        alt=""
                      />
                    </div>
                    <span>{getLanguage(LanguageKey.CASINO)}</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/games/evolution" className="multi-mark-bg">
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/casino-icon-D7N09FcO.png"
                        alt=""
                      />
                    </div>
                    <span>Evolution</span>
                  </Link>
                </li> */}

                <li>
                  <Link
                    to="/sports/kabaddi/5?type=inPlay"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/sports-no-YhxjmpH9.png"
                        alt="Kabaddi "
                      />
                    </div>
                    <span> {getLanguage(LanguageKey.KABADDI)} </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sports/politics/6?type=inPlay"
                    className="multi-mark-bg"
                  >
                    <div className="icon-sidemenu">
                      <img
                        loading="lazy"
                        src="/icon/2378961.png"
                        alt="Kabaddi "
                      />
                    </div>
                    <span>{getLanguage(LanguageKey.POLITICS)} </span>
                  </Link>
                </li>

                {Settings.apk_link && (
                  <li className="download_apk_side_btn_menu">
                    <a
                      onClick={handleDownload}
                      className="multi-mark-bg"
                      style={{ borderBottom: "1px solid #efefef" }}
                    >
                      <div className="icon-sidemenu">
                        <img
                          loading="lazy"
                          src="/icon/project-apk-icon-DhSw9Ns5.png"
                          alt=""
                        />
                      </div>
                      <span>{getLanguage(LanguageKey.DOWNLOAD_APK)}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {/* <div className="instant-id-bx">
              {(Settings?.whatsapplink || Settings?.branchWhatsapplink) && (
                <strong>Get Instant support On Whatsapp</strong>
              )}

              <ul>
                {(Settings?.whatsapplink || Settings?.branchWhatsapplink) && (
                  <li>
                    <Link onClick={navigateWhatsApp}>
                      <img
                        loading="lazy"
                        src="/icon/whatapp-icon-CGODlOk_.png"
                        alt="WhatsApp Icon"
                      />
                      <span>Whatsapp Now</span>
                    </Link>
                  </li>
                )}

                {Settings?.telegramLink && (
                  <li>
                    <Link
                      onClick={() =>
                        window.open(Settings?.telegramLink, "_blank")
                      }
                    >
                      <img
                        loading="lazy"
                        src="/icon/telegram-icon-NcUOJSTd.png"
                        alt="Telegram Icon"
                      />
                      <span>Follow On Telegram</span>
                    </Link>
                  </li>
                )}

                {Settings?.instagramLink && (
                  <li>
                    <Link
                      onClick={() =>
                        window.open(Settings?.instagramLink, "_blank")
                      }
                    >
                      <img
                        loading="lazy"
                        src="/icon/instagrame-BDxmYzsk.png"
                        alt="Instagram Icon"
                      />
                      <span>Follow On Instagram</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
