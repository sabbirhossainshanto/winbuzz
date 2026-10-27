import { Link, useNavigate } from "react-router-dom";
import { latestEvent } from "../../../static/latest-event";
import { LanguageKey } from "../../../const";
import { eventNameList } from "../../../static/event-name-list";
import useLanguage from "../../../hooks/use-language";
import FantasyButton from "./FantasyButton";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Settings } from "../../../api";
import { useState } from "react";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import WarningCondition from "../../modals/WarningCondition/WarningCondition";

const NavMiddleMenuDesktop = () => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const navigate = useNavigate();
  const { token, bonusToken } = useSelector((state) => state.auth);
  const { getLanguage } = useLanguage();

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (bonusToken) {
        return toast.error("Bonus wallet is available only on sports.");
      }
      if (Settings.casino_currency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <section className="nav-new-bar-sec hidden md:block ">
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div className="nav-middle-menu">
        <ul style={{ padding: "5px 0px" }}>
          <li>
            <a
              onClick={() => handleNavigateToIFrame("aviator", "201206")}
              aria-current="page"
              className="router-link-active router-link-exact-active"
            >
              <img
                loading="lazy"
                src="/icon/aviator.png"
                alt="In Play"
                className="nav-icon"
              />
              <span>{getLanguage(LanguageKey.AVIATOR)}</span>
            </a>
          </li>
          <li>
            <Link
              aria-current="page"
              to="/in-play"
              className="router-link-active router-link-exact-active"
            >
              <img
                loading="lazy"
                src="/icon/in-play-7WyfrqDR.png"
                alt="In Play"
                className="nav-icon"
              />
              <span>{getLanguage(LanguageKey.IN_PLAY)}</span>
            </Link>
          </li>
          {latestEvent
            ?.filter((item) => item?.show)
            ?.map((item) => {
              return (
                <li key={item?.eventName}>
                  <Link to={item?.pathname} className>
                    <img
                      loading="lazy"
                      src="/icon/sports-cricket-Qf1NmI1h.png"
                      alt="Menu 1"
                      className="nav-icon"
                    />
                    <span> {item?.eventName}</span>
                  </Link>
                </li>
              );
            })}

          <li>
            <Link to="/sports/Football/1?type=inPlay" className>
              <img
                loading="lazy"
                src="/icon/sports-soccer-CaiOK3CT.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.FOOTBALL)}</span>
            </Link>
          </li>
          <li>
            <Link to="/sports/kabaddi/5?type=inPlay" className>
              <img
                loading="lazy"
                src="/icon/sports-soccer-CaiOK3CT.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.KABADDI)}</span>
            </Link>
          </li>
          <li>
            <Link to="/sports/politics/6?type=inPlay" className>
              <img
                loading="lazy"
                src="/icon/sports-soccer-CaiOK3CT.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.POLITICS)}</span>
            </Link>
          </li>
          <li>
            <Link to="/sports/tennis/2?type=inPlay" className>
              <img
                loading="lazy"
                src="/icon/sports-tennis-DzBamNaA.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.TENNIS)}</span>
            </Link>
          </li>
          <li>
            <Link to="/horse-racing" className>
              <img
                loading="lazy"
                src="/icon/sports-tennis-DzBamNaA.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.HORSE)}</span>
            </Link>
          </li>
          <li>
            <Link to="/greyhound-racing" className>
              <img
                loading="lazy"
                src="/icon/sports-tennis-DzBamNaA.png"
                alt="Menu 1"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.GREYHOUND)}</span>
            </Link>
          </li>
          <FantasyButton
            onClick={() => handleNavigateToIFrame("fantasy-11", "595001")}
            label={getLanguage(LanguageKey.FANTASY_11)}
          />
          {eventNameList.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  to={`/sports/${item.name}/${item.id}?type=inPlay`}
                  className
                >
                  <img
                    loading="lazy"
                    src={item.image}
                    alt="Menu 1"
                    className="nav-icon"
                  />
                  <span> {getLanguage(item.name)}</span>
                </Link>
              </li>
            );
          })}

          <li

          // className="hightlight-nav-menu"
          >
            <Link to="/casino?product=All&category=All" className>
              <img
                loading="lazy"
                src="/icon/int-casino-DuAshlyx.png"
                alt="Int Casino"
                className="nav-icon"
              />
              <span> {getLanguage(LanguageKey.CASINO)}</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default NavMiddleMenuDesktop;
