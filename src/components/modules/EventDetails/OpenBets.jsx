import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useSBCashOut from "../../../hooks/sb_cashout";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const OpenBets = ({ myBets, sportsBook, refetchCurrentBets }) => {
  const { getLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState(true);
  const navigate = useNavigate();
  const { mutate: cashOut } = useSBCashOut();

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials",
    );

  const handleCashOut = ({ betHistory, sportsBook, price, cashout_value }) => {
    let item;
    sports?.forEach((group) => {
      group?.Items?.forEach((data) => {
        if (betHistory?.marketId == data?.Id) {
          item = data;
        }
      });
    });

    const column = item?.Items?.find(
      (col) => col?.Id === betHistory?.selectionId,
    );

    const payload = {
      price,
      cashout_value,
      back: true,
      side: 0,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.EventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
      betId: betHistory?.betId,
    };

    cashOut(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchCurrentBets();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error);
        }
      },
    });
  };

  return (
    <div title="Open Bets" className="">
      <div className="flex items-start justify-start flex-col w-full px-2 py-1">
        <div
          onClick={() => setActiveTab((prev) => !prev)}
          id="matched_1"
          className="w-full flex items-center justify-between bg-primary transition-all ease-in-out my-1 py-1 rounded-[6px] origin-center active:opacity-95 cursor-pointer"
        >
          <div className="head pl-2">
            <span className="  text-sm">
              {getLanguage(LanguageKey.OPEN_BETS)}
            </span>
          </div>
          <div className="cursor-pointer mr-2 transform transition-transform ease-in-out flex items-center justify-center w-max origin-center active:scale-90 active:opacity-85 text-primary">
            {activeTab ? (
              <MdOutlineKeyboardArrowUp size={20} />
            ) : (
              <MdOutlineKeyboardArrowDown size={20} />
            )}
          </div>
        </div>
        <div
          className={`BetSections w-full origin-top scaleVerticalOpen ${
            activeTab ? "" : "hidden"
          }`}
        >
          {myBets?.length > 0 ? (
            myBets?.map((item, i) => {
              let column;
              sports?.forEach((group) => {
                group?.Items?.forEach((data) => {
                  if (item?.marketId == data?.Id) {
                    column = data?.Items?.find(
                      (col) => col?.Id === item?.selectionId,
                    );
                  }
                });
              });

              const price = (
                0.92 * item?.amount * (item?.userRate / column?.Price) -
                item?.amount
              )?.toFixed(2);
              return (
                <div
                  key={i}
                  className="bg-bg_Quaternary rounded-md mb-1  w-full  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);"
                >
                  <div
                    id="eventHeader"
                    className="font-lato-bold font-semibold cursor-pointer flex items-center justify-between"
                  >
                    <div
                      onClick={() => {
                        setActiveTab((prev) => !prev);
                        navigate(
                          `/game-details/${item?.eventTypeId}/${item?.eventId}`,
                        );
                      }}
                      className="font-medium underline capitalize text-sm text-text_ChangeAnimationBack "
                    >
                      {item?.title}
                    </div>
                    {item?.cashout && column && (
                      <button
                        onClick={() =>
                          handleCashOut({
                            betHistory: item,
                            sportsBook,
                            price: column?.Price,
                            cashout_value: price,
                          })
                        }
                        type="button"
                        className="btn_box "
                        style={{
                          width: "auto",
                          backgroundColor: "#eceaea",
                          display: "flex",
                          alignItems: "center",
                          cursor: `pointer`,
                          justifyContent: "center",
                          gap: "0px 2px",
                          borderRadius: "2px",
                          padding: "3px 5px",
                        }}
                      >
                        <span style={{ fontSize: "10px", color: "black" }}>
                          {getLanguage(LanguageKey.CASHOUT)}
                        </span>
                        {price && (
                          <span style={{ color: "black", fontSize: "10px" }}>
                            :
                          </span>
                        )}

                        {price && (
                          <span
                            style={{
                              color: `${price > 0 ? "green" : "red"}`,
                              fontSize: "10px",
                            }}
                          >
                            {price}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="font-normal text-text_Ternary capitalize text-xs font-lato">
                    {item?.marketName}: {item?.nation}
                  </div>
                  <div
                    id="tiem_Date_of_order_0_1724640350689"
                    className="text-xs font-lato font-normal"
                  >
                    <strong>{getLanguage(LanguageKey.PLACED_DATE)} : </strong>
                    <span>{item?.placeDate}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center bg-white py-2 mb-3 mt-1 rounded-sm pl-2">
              {getLanguage(LanguageKey.YOU_HAVE_NO_MATCHED_BETS)}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenBets;
