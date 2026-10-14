import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { isHorseGreyhoundOddSuspended } from "../../../utils/isOddSuspended";
import MobileBetSlip from "./MobileBetSlip";
import { handleHorseRacingBetSlip } from "../../../utils/handleHorseRacingBetSlip";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const HorseGreyhoundEventDetails = ({ data }) => {
  const { getLanguage } = useLanguage();
  const { runnerId } = useSelector((state) => state.event);
  const { eventId } = useParams();
  const { data: exposer } = useExposure(eventId);
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [timeDiff, setTimeDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const handleOpenBetSlip = (betType, games, runner, price) => {
    handleHorseRacingBetSlip(
      betType,
      games,
      runner,
      exposer,
      dispatch,
      price,
      token,
    );
  };

  useEffect(() => {
    if (!data?.[0]?.openDate) return;

    const targetDateStr = data[0].openDate;
    const [date, time] = targetDateStr.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const diffInMs = targetDate - currentDate;

        if (diffInMs <= 0) {
          clearInterval(interval);
          setTimeDiff({ day: 0, hour: 0, minute: 0, second: 0 });
          return;
        }

        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((diffInMs % (1000 * 60)) / 1000);

        setTimeDiff({ day, hour, minute, second });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);
  return (
    <Fragment>
      <div className="horse-banner">
        <img
          style={{ width: "100%" }}
          src="https://g1ver.sprintstaticdata.com/v42/static/front/img/10.png"
          className="img-fluid"
        />
        <div className="horse-banner-detail">
          <div className="text-success">{getLanguage(LanguageKey.OPEN)}</div>
          {timeDiff?.day ||
          timeDiff?.hour ||
          timeDiff?.minute ||
          timeDiff?.second ? (
            <div className="horse-timer">
              <span style={{ display: "flex", gap: "5px" }}>
                {timeDiff?.day > 0 && (
                  <span>
                    {timeDiff?.day}{" "}
                    <small>{getLanguage(LanguageKey.DAY)}</small>
                  </span>
                )}
                {timeDiff?.hour > 0 && (
                  <span>
                    {timeDiff?.hour}{" "}
                    <small>{getLanguage(LanguageKey.HOUR)}</small>
                  </span>
                )}
                {timeDiff?.minute > 0 && (
                  <span>
                    {timeDiff?.minute}{" "}
                    <small>{getLanguage(LanguageKey.MINUTE)}</small>
                  </span>
                )}
                {timeDiff?.hour === 0 && timeDiff?.minute < 60 && (
                  <span>
                    {timeDiff?.second}{" "}
                    <small>{getLanguage(LanguageKey.SECOND)}</small>
                  </span>
                )}
              </span>
              <span>{getLanguage(LanguageKey.REMAINING)}</span>
            </div>
          ) : null}

          <div className="time-detail">
            <p>{data?.[0]?.eventName}</p>
            <h5>
              <span>{data?.[0]?.openDate}</span>
              <span>| {data?.[0]?.raceType}</span>
            </h5>
          </div>
        </div>
      </div>
      {data?.result?.length > 0 &&
        data?.result?.map((game) => {
          return (
            <div key={game?.id} data-v-4a1ad0c4 className="market-group">
              <div data-v-4a1ad0c4 className="market-group-header">
                <div
                  data-v-4a1ad0c4
                  className="row g-0 d-flex align-items-center"
                >
                  <div data-v-4a1ad0c4 className="col-8 col-md-6 pl-0">
                    <div data-v-4a1ad0c4 className="mark-lft-head">
                      <span data-v-4a1ad0c4 className="mrkname">
                        {game?.name?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div data-v-4a1ad0c4 className="col-4 col-md-6">
                    <div data-v-4a1ad0c4 className="min-max-head">
                      <span data-v-4a1ad0c4>
                        {getLanguage(LanguageKey.MIN)}:{" "}
                        {game?.minLiabilityPerBet} |{" "}
                        {getLanguage(LanguageKey.MAX)}:
                        {game?.maxLiabilityPerBet}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div data-v-4a1ad0c4 className="match-odd-body">
                <div data-v-4a1ad0c4 className="back-lay-title">
                  <div
                    data-v-4a1ad0c4
                    className="row d-flex align-items-center"
                  >
                    <div data-v-4a1ad0c4 className="col-7 col-md-6 pl-0" />
                    <div data-v-4a1ad0c4 className="col-5 col-md-6">
                      <div data-v-4a1ad0c4 className="btn-group-box">
                        <div data-v-4a1ad0c4 className="row">
                          <div data-v-4a1ad0c4 className="col-6 text-center">
                            <span data-v-4a1ad0c4 className="back-title">
                              Back
                            </span>
                          </div>
                          <div data-v-4a1ad0c4 className="col-6 text-center">
                            <span data-v-4a1ad0c4 className="lay-title">
                              Lay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {game?.runners?.map((runner) => {
                  return (
                    <Fragment key={runner?.id}>
                      <div
                        data-v-4a1ad0c4
                        className="app-market-details-sec bet-slip-area"
                      >
                        <div data-v-4a1ad0c4 className="row g-0">
                          <div data-v-4a1ad0c4 className="col-7">
                            <div data-v-4a1ad0c4 className="market-event-name">
                              <span data-v-4a1ad0c4>{runner?.horse_name}</span>
                              <div data-v-4a1ad0c4 className="back-lay-status">
                                <div
                                  className="jockey-detail sm-d-none d-md-flex"
                                  style={{ display: "flex" }}
                                >
                                  {runner?.jocky && (
                                    <span className="jockey-detail-box">
                                      <b>Jockey:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.jocky}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.trainer && (
                                    <span className="jockey-detail-box">
                                      <b>Trainer:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.trainer}
                                      </span>
                                    </span>
                                  )}
                                  {runner?.age && (
                                    <span className="jockey-detail-box">
                                      <b>Age:</b>
                                      <span style={{ fontWeight: "normal" }}>
                                        {runner?.age}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-v-4a1ad0c4 className="col-5">
                            <div
                              data-v-4a1ad0c4
                              className="bet-details-btn-group"
                            >
                              {isHorseGreyhoundOddSuspended(runner) && (
                                <div
                                  data-v-4a1ad0c4
                                  className="running-con suspend-con"
                                >
                                  <span data-v-4a1ad0c4>SUSPENDED</span>
                                </div>
                              )}
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[2]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="back-light back"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {runner?.back?.[2]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {runner?.back?.[2]?.size}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[1]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="back-light back"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {" "}
                                    {runner?.back?.[1]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {runner?.back?.[1]?.size}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "back",
                                    game,
                                    runner,
                                    runner?.back?.[0]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="back"
                                id="back-open-btn"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {runner?.back?.[0]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {runner?.back?.[0]?.size}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[0]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="lay"
                                id="lay-open-btn"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {runner?.lay?.[0]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {runner?.lay?.[0]?.size}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[1]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="lay-light lay"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {" "}
                                    {runner?.lay?.[1]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {" "}
                                  {runner?.lay?.[1]?.size}
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenBetSlip(
                                    "lay",
                                    game,
                                    runner,
                                    runner?.lay?.[2]?.price,
                                  )
                                }
                                data-v-4a1ad0c4
                                type="button"
                                className="lay-light lay"
                              >
                                <span data-v-4a1ad0c4>
                                  <b data-v-4a1ad0c4>
                                    {" "}
                                    {runner?.lay?.[2]?.price}
                                  </b>
                                </span>
                                <span data-v-4a1ad0c4>
                                  {" "}
                                  {runner?.lay?.[2]?.size}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {runner?.id === runnerId && (
                        <MobileBetSlip currentPlaceBetEvent={game} />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default HorseGreyhoundEventDetails;
