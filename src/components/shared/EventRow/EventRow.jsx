import { useNavigate } from "react-router-dom";
import images from "../../../assets/images";

const EventRow = ({ data, keys, eventName }) => {
  const navigate = useNavigate();
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };
  return (
    <div onClick={() => navigateGameList(keys)} className="bets-details-page">
      <div className="listuiscreen">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="b-lay-bx">
              <div className="game-list">
                <div className="bet-icon">
                  <div className="game-icon">
                    {eventName === "cricket" && (
                      <img loading="lazy" src={images.cricket} alt="cricket" />
                    )}
                    {eventName === "tennis" && (
                      <img loading="lazy" src={images.tennis} alt="tennis" />
                    )}
                    {eventName === "football" && (
                      <img
                        loading="lazy"
                        src={images.football}
                        alt="football"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="bet-header-right">
                <div className="game-left-box">
                  <div className="team-1">
                    <a href="javascript:void(0);">
                      {data[keys]?.player1} v {data[keys]?.player2}
                    </a>
                    {data[keys]?.inPlay === 1 && (
                      <em className="ml-1 in__play">
                        <i className="fa fa-circle" />
                      </em>
                    )}
                  </div>
                  <div className="team-2">
                    <div className="in_play_date green">
                      <p>{data[keys]?.date}</p>
                    </div>
                    <div className="game-icons">
                      {data[keys]?.inPlay === 1 && (
                        <a>
                          <img
                            loading="lazy"
                            src="/icon/tv-Bor3goJP.png"
                            alt=""
                          />
                        </a>
                      )}
                      {data[keys]?.bookmaker === 1 && (
                        <a>
                          <span className="fancy-game-link">BM</span>
                        </a>
                      )}
                      {data[keys]?.isFancy === 1 && (
                        <a>
                          <span className="fancy-game-link">F</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="game-wrap">
              <div className="game-box-rgt">
                <div className="open-bet-box">
                  <button type="button" className="odds-btn lay-box">
                    <span className="odd-button-price">
                      {" "}
                      {data?.[keys]?.[0]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                  <button type="button" className="odds-btn back-box">
                    <span className="odd-button-price">
                      {data?.[keys]?.[0]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </div>
                <div className="open-bet-box">
                  <button type="button" className="odds-btn disabled">
                    <span className="odd-button-price">
                      {" "}
                      {data?.[keys]?.[2]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                  <button type="button" className="odds-btn disabled">
                    <span className="odd-button-price">
                      {data?.[keys]?.[2]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </div>
                <div className="open-bet-box">
                  <button type="button" className="odds-btn lay-box">
                    <span className="odd-button-price">
                      {" "}
                      {data?.[keys]?.[1]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                  <button type="button" className="odds-btn back-box">
                    <span className="odd-button-price">
                      {data?.[keys]?.[1]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRow;
