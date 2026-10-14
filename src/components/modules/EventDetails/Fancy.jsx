import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import isOddSuspended from "../../../utils/isOddSuspended";
import MobileBetSlip from "./MobileBetSlip";
import Ladder from "../../modals/Ladder/Ladder";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const Fancy = ({ data }) => {
  const { getLanguage } = useLanguage();
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true,
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId,
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (marketId, marketName) => {
    if (!marketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId }).unwrap();
    if (res.success) {
      setLadderData(res.result);
    }
  };
  return (
    <section data-v-4a1ad0c4 className="fancy-tab-sec" id="fancy-tab">
      {ladderData?.length > 0 && (
        <Ladder
          ladderData={ladderData}
          setLadderData={setLadderData}
          eventName={marketName}
        />
      )}
      <div data-v-4a1ad0c4 className="fancy-tab-list">
        <div data-v-4a1ad0c4 className="tab-content" id="myTabContent">
          <div
            data-v-4a1ad0c4
            className="tab-pane fade show active"
            id="all"
            role="tabpanel"
            aria-labelledby="all-tab"
          >
            {fancyData?.length > 0 && (
              <div data-v-4a1ad0c4 className="mb-2">
                <div data-v-4a1ad0c4 className="fancy-market-tabs-details-sec">
                  <div data-v-4a1ad0c4 className="row g-0">
                    <div data-v-4a1ad0c4 className="col-7 col-md-6 pl-0">
                      <span data-v-4a1ad0c4 className="mark-lft-head">
                        Fancy
                      </span>
                    </div>
                    <div data-v-4a1ad0c4 className="col-5 col-md-6">
                      <div data-v-4a1ad0c4 className="fancy-group-box">
                        <div
                          data-v-4a1ad0c4
                          className="fancy-box-1 fancy-no-yes"
                        >
                          <button
                            data-v-4a1ad0c4
                            type="button"
                            className="yes-no-btn back-title"
                          >
                            No
                          </button>
                          <button
                            data-v-4a1ad0c4
                            type="button"
                            className="yes-no-btn lay-title"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {fancyData?.map((game) => {
                  const pnl = pnlBySelection?.find(
                    (pnl) => pnl?.MarketId === game?.id,
                  );

                  return (
                    <Fragment key={game?.id}>
                      <div data-v-4a1ad0c4>
                        <div
                          data-v-4a1ad0c4
                          className="fancy-market-tabs-details-sec bet-slip-area"
                        >
                          <div data-v-4a1ad0c4 className="row g-0">
                            <div data-v-4a1ad0c4 className="col-7">
                              <div
                                data-v-4a1ad0c4
                                className="fancy-tab-lft-content"
                              >
                                <div
                                  data-v-4a1ad0c4
                                  className="fancy-lft-title"
                                >
                                  <span
                                    data-v-4a1ad0c4
                                    className="market-event-head !flex "
                                  >
                                    <span className="md:hidden">
                                      {" "}
                                      {game?.name?.slice(0, 20)}
                                      {game?.name?.length > 20 && (
                                        <>
                                          <br />
                                          {game?.name?.slice(20)}
                                        </>
                                      )}
                                    </span>
                                    <span className="hidden md:block">
                                      {game?.name}
                                    </span>

                                    <div className="w-full flex items-center justify-end gap-x-4">
                                      <span className=" flex items-center">
                                        <svg
                                          version="1.0"
                                          height="15"
                                          width="15"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 840.000000 936.000000"
                                          preserveAspectRatio="xMidYMid meet"
                                        >
                                          <g
                                            transform="translate(0.000000,936.000000) scale(0.100000,-0.100000)"
                                            fill="var(--color-fancyStopwatchIconColor)"
                                            stroke="none"
                                          >
                                            <path d="M3472 8818 l3 -243 243 -3 242 -2 0 -244 0 -243 -122 -12 c-1359 -130 -2543 -950 -3143 -2176 -155 -318 -271 -677 -334 -1035 -75 -424 -73 -934 5 -1360 226 -1229 1014 -2267 2136 -2810 694 -335 1447 -455 2228 -354 567 74 1147 294 1640 624 792 530 1374 1353 1605 2270 133 529 156 1092 65 1627 -175 1029 -775 1959 -1645 2552 -539 367 -1135 586 -1792 657 l-163 18 0 243 0 243 243 2 242 3 3 243 2 242 -730 0 -730 0 2 -242z m1138 -1242 c478 -59 937 -216 1346 -463 765 -461 1323 -1208 1543 -2067 190 -738 131 -1502 -171 -2206 -175 -408 -460 -814 -789 -1122 -519 -487 -1138 -787 -1845 -895 -164 -25 -204 -27 -484 -27 -325 -1 -422 7 -685 60 -1170 231 -2155 1089 -2543 2214 -222 647 -250 1318 -82 1975 283 1104 1112 1999 2195 2372 215 74 531 144 735 162 63 6 133 13 155 15 85 9 506 -4 625 -18z"></path>
                                            <path d="M3960 5620 c0 -654 -3 -1010 -10 -1010 -5 0 -41 -30 -80 -66 -51 -49 -80 -86 -105 -138 -133 -272 18 -605 310 -681 132 -34 277 -11 391 63 202 131 276 400 169 618 -25 52 -54 89 -105 138 -39 36 -75 66 -80 66 -7 0 -10 356 -10 1010 l0 1010 -240 0 -240 0 0 -1010z"></path>
                                          </g>
                                        </svg>
                                        <span className="font-[480] text-sm text-text_Ternary">
                                          {game?.betDelay}s
                                        </span>
                                      </span>
                                      {pnl ? (
                                        <span
                                          onClick={() =>
                                            handleGetLadder(
                                              pnl?.MarketId,
                                              game?.name,
                                            )
                                          }
                                          className=""
                                        >
                                          <div className="opacity-100 cursor-pointer">
                                            <svg
                                              height="18"
                                              width="18"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g id="63d691358b4e4026f6539708_stairs 1">
                                                <path
                                                  id="Vector"
                                                  d="M5.21875 3.13672V13.1367"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_2"
                                                  d="M5.21875 5.48047H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_3"
                                                  d="M5.21875 8.13672H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_4"
                                                  d="M5.21875 11.1055H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_5"
                                                  d="M10.5312 3.13672V13.1367"
                                                  stroke="#000"
                                                ></path>
                                              </g>
                                            </svg>
                                          </div>
                                        </span>
                                      ) : (
                                        <span className="">
                                          <div className="opacity-50 cursor-not-allowed">
                                            <svg
                                              height="18"
                                              width="18"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g id="63d691358b4e4026f6539708_stairs 1">
                                                <path
                                                  id="Vector"
                                                  d="M5.21875 3.13672V13.1367"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_2"
                                                  d="M5.21875 5.48047H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_3"
                                                  d="M5.21875 8.13672H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_4"
                                                  d="M5.21875 11.1055H10.5312"
                                                  stroke="#000"
                                                ></path>
                                                <path
                                                  id="Vector_5"
                                                  d="M10.5312 3.13672V13.1367"
                                                  stroke="#000"
                                                ></path>
                                              </g>
                                            </svg>
                                          </div>
                                        </span>
                                      )}
                                    </div>
                                  </span>
                                  <div
                                    data-v-4a1ad0c4
                                    className="back-lay-status"
                                  >
                                    {" "}
                                    {pnl && (
                                      <div
                                        className={`  ${
                                          pnl?.pnl > 0 ? "positive" : "negative"
                                        }`}
                                      >
                                        {pnl?.pnl}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div data-v-4a1ad0c4 className="col-5">
                              <div data-v-4a1ad0c4 className="fancy-group-box">
                                <div data-v-4a1ad0c4 className="fancy-box-1">
                                  {isOddSuspended(game) && (
                                    <div
                                      data-v-4a1ad0c4
                                      className="running-con suspend-con"
                                    >
                                      <span data-v-4a1ad0c4>
                                        {getLanguage(LanguageKey.SUSPENDED)}
                                      </span>
                                    </div>
                                  )}

                                  <button
                                    onClick={() =>
                                      handleBetSlip(
                                        "lay",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.lay?.[0]?.line,
                                        game?.runners?.[0]?.lay?.[0]?.price,
                                      )
                                    }
                                    data-v-4a1ad0c4
                                    type="button"
                                    className="fancy-betting-box light-pink"
                                  >
                                    <span data-v-4a1ad0c4>
                                      <b data-v-4a1ad0c4>
                                        {" "}
                                        {game?.runners?.[0]?.lay?.[0]?.line}
                                      </b>
                                    </span>
                                    <span data-v-4a1ad0c4>
                                      {" "}
                                      {game?.runners?.[0]?.lay?.[0]?.price}
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleBetSlip(
                                        "back",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.back?.[0]?.line,
                                        game?.runners?.[0]?.back?.[0]?.price,
                                      )
                                    }
                                    data-v-4a1ad0c4
                                    type="button"
                                    className="fancy-betting-box light-blue"
                                  >
                                    <span data-v-4a1ad0c4>
                                      <b data-v-4a1ad0c4>
                                        {game?.runners?.[0]?.back?.[0]?.line}
                                      </b>
                                    </span>
                                    <span data-v-4a1ad0c4>
                                      {game?.runners?.[0]?.back?.[0]?.price}
                                    </span>
                                  </button>
                                </div>
                                <div
                                  data-v-4a1ad0c4
                                  className="fancy-box-1 fancy-min-max"
                                >
                                  <div
                                    data-v-4a1ad0c4
                                    className="max-min-bet-rgt-box"
                                  >
                                    <span data-v-4a1ad0c4>
                                      {getLanguage(LanguageKey.MIN)}:{" "}
                                      {game?.minLiabilityPerBet}
                                    </span>
                                    <span data-v-4a1ad0c4>
                                      {getLanguage(LanguageKey.MAX)}:{" "}
                                      {game?.maxLiabilityPerBet}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {game?.id === runnerId && (
                        <MobileBetSlip currentPlaceBetEvent={game} />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fancy;
