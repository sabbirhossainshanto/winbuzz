import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { latestEvent } from "../../../static/latest-event";
import { LanguageKey } from "../../../const";
import { eventNameList } from "../../../static/event-name-list";
import useLanguage from "../../../hooks/use-language";

const NavbarMiddleMenuMobile = () => {
  const { getLanguage } = useLanguage();
  const { pathname } = useLocation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigateAfterCheckAuth = (link) => {
    if (token) {
      navigate(link);
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <div className="exchange-menu-wrapper d-md-none">
      <ul className="subnav">
        <li className={` ${pathname === "/" ? "active" : ""}`}>
          <Link to="/in-play" className="subnav-link ">
            <img src="/icon/in-play.png" />
            {getLanguage(LanguageKey.IN_PLAY)}
          </Link>
        </li>
        {latestEvent
          ?.filter((item) => item?.show)
          ?.map((item) => {
            return (
              <li
                key={item?.eventName}
                className={` ${pathname === item?.pathname ? "active" : ""}`}
              >
                <Link to={item?.pathname} className="subnav-link">
                  <img
                    loading="lazy"
                    src="/icon/sports-cricket-Qf1NmI1h.png"
                    alt="Menu 1"
                  />
                  <span> {item?.eventName}</span>
                </Link>
              </li>
            );
          })}
        <li className={` ${pathname === "/sports/cricket/4" ? "active" : ""}`}>
          <Link to="/sports/cricket/4?type=inPlay" className="subnav-link">
            <img alt="" src="/icon/4.png" />{" "}
            {getLanguage(LanguageKey.CRICKET)}{" "}
          </Link>
        </li>
        <li className={` ${pathname === "/sports/cricket/1" ? "active" : ""}`}>
          <Link to="/sports/football/1?type=inPlay" className="subnav-link">
            <img alt="" src="/icon/1.png" />{" "}
            {getLanguage(LanguageKey.FOOTBALL)}{" "}
          </Link>
        </li>
        <li className={` ${pathname === "/sports/cricket/2" ? "active" : ""}`}>
          <Link to="/sports/tennis/2?type=inPlay" className="subnav-link">
            <img alt="" src="/icon/2.png" />{" "}
            {getLanguage(LanguageKey.TENNIS)}{" "}
          </Link>
        </li>
        <li className={` ${pathname === "/sports/cricket/5" ? "active" : ""}`}>
          <Link to="/sports/kabaddi/6?type=inPlay" className="subnav-link">
            <img alt="" src="/icon/sports-no-YhxjmpH9.png" />{" "}
            {getLanguage(LanguageKey.KABADDI)}{" "}
          </Link>
        </li>
        <li className={` ${pathname === "/sports/cricket/6" ? "active" : ""}`}>
          <Link to="/sports/politics/6?type=inPlay" className="subnav-link">
            <img alt="" src="/icon/2378961.png" />{" "}
            {getLanguage(LanguageKey.POLITICS)}{" "}
          </Link>
        </li>

        <li>
          <Link
            to="/casino?product=All&category=All"
            className="subnav-link hightlight-menus"
          >
            <img alt="" src="/icon/99998.png" />{" "}
            {getLanguage(LanguageKey.CASINO)}{" "}
          </Link>
        </li>
        <li
          className={` ${pathname === "/casino/sportsbook/550000" ? "active" : ""}`}
        >
          <a
            onClick={() =>
              handleNavigateAfterCheckAuth("/casino/sportsbook/550000")
            }
            className="subnav-link"
          >
            <img alt="" src="/icon/99991.png" />{" "}
            {getLanguage(LanguageKey.SPORTSBOOK)}{" "}
          </a>
        </li>
        <li
          className={` ${pathname === "/casino/fantasy-11/595001" ? "active" : ""}`}
        >
          <a
            onClick={() =>
              handleNavigateAfterCheckAuth("/casino/fantasy-11/595001")
            }
            className="subnav-link"
          >
            <img alt="" src="/icon/99991.png" />{" "}
            {getLanguage(LanguageKey.FANTASY_11)}{" "}
          </a>
        </li>
        <li>
          <Link to="/horse-racing" className="subnav-link">
            <img alt="" src="/icon/7.png" />{" "}
            {getLanguage(LanguageKey.HORSE)}{" "}
          </Link>
        </li>
        <li>
          <Link to="/greyhound-racing" className="subnav-link">
            <img alt="" src="/icon/4339.png" />{" "}
            {getLanguage(LanguageKey.GREYHOUND)}{" "}
          </Link>
        </li>
        {eventNameList.map((item) => {
          return (
            <li
              key={item.id}
              className={` ${pathname === `/sports/${item.name}/${item.id}` ? "active" : ""}`}
            >
              <Link
                to={`/sports/${item.name}/${item.id}?type=inPlay`}
                className="subnav-link"
              >
                <img alt="" src={item.image} /> {getLanguage(item.name)}
              </Link>
            </li>
          );
        })}
        {/* <li>
          <Link to="/m/game-list/99990" className="subnav-link">
            <img alt="" src="/icon/99990.png" /> Binary{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/99994" className="subnav-link">
            <img alt="" src="/icon/99994.png" /> Kabaddi{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/7522" className="subnav-link">
            <img alt="" src="/icon/7522.png" /> Basketball{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/7511" className="subnav-link">
            <img alt="" src="/icon/7511.png" /> Baseball{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/20" className="subnav-link">
            <img alt="" src="/icon/20.png" /> Table Tennis{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/998917" className="subnav-link">
            <img alt="" src="/icon/998917.png" /> Volleyball{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/7524" className="subnav-link">
            <img alt="" src="/icon/7524.png" /> Ice Hockey{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/5" className="subnav-link">
            <img alt="" src="/icon/5.png" /> Rugby{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/26420387" className="subnav-link">
            <img alt="" src="/icon/26420387.png" /> Mixed Martial Arts{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/3503" className="subnav-link">
            <img alt="" src="/icon/3503.png" /> Darts{" "}
          </Link>
        </li>
        <li>
          <Link to="/m/game-list/29" className="subnav-link">
            <img alt="" src="/icon/29.png" /> Futsal{" "}
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default NavbarMiddleMenuMobile;
