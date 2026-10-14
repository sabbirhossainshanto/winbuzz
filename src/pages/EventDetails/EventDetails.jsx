import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import RightSidebar from "../../components/modules/EventDetails/RightSidebar";
import Fancy from "../../components/modules/EventDetails/Fancy";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import EventHeader from "../../components/modules/EventDetails/EventHeader";
import ScoreBoard from "../../components/modules/EventDetails/ScoreBoard";
import EventTab from "../../components/modules/EventDetails/EventTab";
import { useCurrentBets } from "../../hooks/currentBets";
import OpenBets from "../../components/modules/EventDetails/OpenBets";
import IFrameScore from "../../components/modules/EventDetails/IFrame";
import HorseGreyhoundEventDetails from "../../components/modules/EventDetails/HorseGreyhoundEventDetails";
import Premium from "../../components/modules/EventDetails/Premium";
import ToggleButtons from "../../components/modules/EventDetails/ToggleButtons";

const EventDetails = () => {
  const [fancyPremiumTab, setFancyPremiumTab] = useState("");
  const [iFrame, setIframe] = useState("");
  const [eventTab, setEventTab] = useState("live");
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);
  const { data: myBets, refetch } = useCurrentBets(eventId);
  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    },
  );

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const matchOdds = data?.result?.filter(
    (game) =>
      game.btype === "MATCH_ODDS" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );
  const bookmaker = data?.result?.filter(
    (game) =>
      game.btype === "BOOKMAKER" &&
      game?.visible == true &&
      game?.name !== "tied match",
  );

  const tiedMatch = data?.result?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true &&
      game?.name === "tied match",
  );

  const fancy = data?.result?.filter(
    (normal) =>
      normal.btype === "FANCY" &&
      normal.tabGroupName === "Normal" &&
      normal?.visible == true,
  );
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-4a1ad0c4 className="right-side-bar-main-sec">
          <section data-v-4a1ad0c4 className="events-details-sec">
            <div data-v-4a1ad0c4 className="row g-3">
              <div data-v-4a1ad0c4 className="col-sm-12 col-md-12 col-lg-8">
                <div data-v-4a1ad0c4 className="comentry-box-sec">
                  <EventHeader data={data} />
                  {eventTypeId == 4 && data?.iscore && (
                    <ScoreBoard iscore={data?.iscore} />
                  )}
                  <EventTab
                    eventTab={eventTab}
                    setEventTab={setEventTab}
                    myBets={myBets}
                    score={data?.score}
                    setIframe={setIframe}
                  />
                  {eventTab === "openBet" && (
                    <OpenBets
                      myBets={myBets}
                      sportsBook={data?.sportsbook?.Result}
                      refetchCurrentBets={refetch}
                    />
                  )}

                  <IFrameScore
                    eventTab={eventTab}
                    setEventTab={setEventTab}
                    score={data?.score}
                    iFrame={iFrame}
                  />

                  <section data-v-4a1ad0c4 className="match-odd-bookmaker-sec">
                    <div data-v-4a1ad0c4 className="market-list">
                      {matchOdds?.length > 0 && <MatchOdds data={matchOdds} />}

                      {bookmaker?.length > 0 && <Bookmaker data={bookmaker} />}
                      {data && (
                        <ToggleButtons
                          data={data}
                          fancy={fancy}
                          setFancyPremiumTab={setFancyPremiumTab}
                          fancyPremiumTab={fancyPremiumTab}
                        />
                      )}
                    </div>
                  </section>
                  {data?.result?.length > 0 && fancyPremiumTab === "fancy" && (
                    <Fancy data={data?.result} />
                  )}
                  {data?.premium &&
                    data?.premium?.eventId &&
                    fancyPremiumTab === "premium" && (
                      <Premium premium={data?.premium} />
                    )}
                  {eventTypeId == 7 || eventTypeId == 4339 ? (
                    <HorseGreyhoundEventDetails data={data} />
                  ) : null}
                  {tiedMatch?.length > 0 && <MatchOdds data={tiedMatch} />}
                </div>
              </div>
              <RightSidebar />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
