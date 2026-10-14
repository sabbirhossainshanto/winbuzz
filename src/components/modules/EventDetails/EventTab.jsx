import { useParams } from "react-router-dom";
import { useVideoMutation } from "../../../redux/features/events/events";
import { Settings } from "../../../api";
import { useEffect } from "react";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const EventTab = ({ setEventTab, eventTab, score, myBets, setIframe }) => {
  const { getLanguage } = useLanguage();
  const [sportsVideo] = useVideoMutation();
  const { eventId, eventTypeId } = useParams();

  const handleGetVideo = async (eventTab) => {
    if (eventTab === "video") {
      setEventTab("video");
      const payload = {
        eventTypeId: eventTypeId,
        eventId: eventId,
        type: "video",
        casinoCurrency: Settings.casino_currency,
      };
      const res = await sportsVideo(payload).unwrap();
      if (res?.success) {
        setIframe(res?.result?.url);
      }
    }
    if (eventTab === "tracker") {
      setEventTab("tracker");
      setIframe(score?.tracker);
    }
  };

  useEffect(() => {
    if (eventTab === "video") {
      if (!score?.hasVideo) {
        setEventTab("live");
      }
    }
    if (eventTab === "tracker") {
      if (!score?.tracker) {
        setEventTab("live");
      }
    }
  }, [eventId, eventTypeId, score, eventTab, setEventTab]);

  return (
    <div
      title="Live And Open Bets"
      className="block lg:hidden w-full bg-bg_Quaternary shadow-sm mb-2"
    >
      <div
        id="step-selectMode"
        className="relative flex  rounded-lg border shadow bg-bg_Quaternary  bg-bg_Quaternary w-full border-none overflow-clip "
      >
        <button
          onClick={() => setEventTab("live")}
          className={`flex items-center justify-center w-full gap-1 tracking-wider font-lato py-2.5 uppercase relative     font-bold font-lato text-xs ${
            eventTab === "live" ? "text-primary" : "text-gray-600"
          }`}
          style={{ zIndex: 10 }}
        >
          <span>
            <div className="w-2 h-2 bg-green-600 rounded-full mr"></div>{" "}
          </span>
          {getLanguage(LanguageKey.LIVE)}
          <div
            className={`w-full absolute z-10 transition-all ease-in-out bg-primary-color rounded-lg h-[2px] 
            left-0 ${eventTab === "live" ? "block" : "hidden"}
              
              `}
            style={{
              zIndex: 9,
              width: "100%",

              bottom: "0px",
            }}
          ></div>
        </button>
        {score && score?.hasVideo && (
          <button
            onClick={() => {
              handleGetVideo("video");
              window.scrollTo(0, 0);
            }}
            className={`flex items-center justify-center w-full gap-1 tracking-wider font-lato py-2.5 uppercase relative    font-bold font-lato text-xs ${
              eventTab === "video" ? "text-primary" : "text-gray-600"
            }`}
            style={{ zIndex: 10 }}
          >
            {getLanguage(LanguageKey.VIDEO)}{" "}
            <div
              className={`w-full absolute z-10 transition-all ease-in-out bg-primary-color rounded-lg h-[2px] 
            left-0 ${eventTab === "video" ? "block" : "hidden"}
              
              `}
              style={{
                zIndex: 9,
                width: "100%",

                bottom: "0px",
              }}
            ></div>
          </button>
        )}

        {score && score?.tracker && (
          <button
            onClick={() => {
              handleGetVideo("tracker");
              window.scrollTo(0, 0);
            }}
            className={`flex items-center justify-center w-full relative gap-1 tracking-wider font-lato py-2.5 uppercase  font-bold font-lato text-xs ${
              eventTab === "tracker" ? "text-primary" : "text-gray-600"
            }`}
            style={{ zIndex: 10 }}
          >
            {getLanguage(LanguageKey.TRACKER)}{" "}
            <div
              className={`w-full absolute z-10 transition-all ease-in-out bg-primary-color rounded-lg h-[2px] 
            left-0 ${eventTab === "tracker" ? "block" : "hidden"}
              
              `}
              style={{
                zIndex: 9,
                width: "100%",

                bottom: "0px",
              }}
            ></div>
          </button>
        )}

        <button
          onClick={() => {
            setEventTab("openBet");
            window.scrollTo(0, 0);
          }}
          className={`flex items-center justify-center w-full relative gap-1 tracking-wider font-lato py-2.5 uppercase  font-lato font-bold text-xs ${
            eventTab === "openBet" ? "text-primary" : "text-gray-600"
          }`}
          style={{ zIndex: 10 }}
        >
          {getLanguage(LanguageKey.OPEN_BETS)}
          <span>
            <div>({myBets?.length})</div>
          </span>
          <div
            className={`w-full absolute z-10 transition-all ease-in-out bg-primary-color rounded-lg h-[2px] 
            left-0 ${eventTab === "openBet" ? "block" : "hidden"}
              
              `}
            style={{
              zIndex: 9,
              width: "100%",

              bottom: "0px",
            }}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default EventTab;
