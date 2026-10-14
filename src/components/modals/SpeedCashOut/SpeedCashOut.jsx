/* eslint-disable react/no-unknown-property */

import { useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useExposure } from "../../../hooks/exposure";
import useBalance from "../../../hooks/balance";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useIndex } from "../../../hooks";
import { useSelector } from "react-redux";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const SpeedCashOut = ({ speedCashOut, setSpeedCashOut }) => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state?.global);
  const { eventTypeId, eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchExposure } = useExposure(eventId);
  const { refetch: refetchBalance } = useBalance();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setSpeedCashOut(null);
  });
  const { mutate } = useIndex();

  const lowestExposure = Math.min(
    speedCashOut?.exposureA,
    speedCashOut?.exposureB,
  );

  const amount = lowestExposure - lowestExposure * 0.03;

  const handleSpeedCashOut = () => {
    const payload = {
      type: "speed_cashout",
      market_id: speedCashOut?.gameId,
      amount,
      event_id: eventId,
      event_type_id: eventTypeId,
      market_name: speedCashOut?.market_name,
      event_name: speedCashOut?.event_name,
      apk: closePopupForForever ? true : false,
    };
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          refetchBalance();
          refetchCurrentBets();
          refetchExposure();
          setSpeedCashOut(null);
        } else {
          toast.error(data?.error?.errorMessage);
        }
      },
    });
  };
  return (
    <div
      id="popup-modal"
      className="z-[1000] fixed top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={ref}
        className="z-50 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px]  bg-gray-200 text-black p-2 xs:p-5 rounded-md  overflow-hidden  pb-10"
      >
        <div
          onClick={() => setSpeedCashOut(null)}
          className="absolute top-1 right-1 active:scale-95 transition-all duration-300"
        >
          <svg
            className="cursor-pointer z-50"
            height="24"
            width="24"
            fill="var(--color-quaternary)"
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="circle-xmark"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g className="fa-duotone-group">
              <path
                fill="currentColor"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              ></path>
              <path
                fill="white"
                d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z"
              ></path>
            </g>
          </svg>
        </div>

        <div className="flex gap-10 items-start h-[95%] lg:h-auto w-full">
          <div
            title="mobileLogin"
            className="flex flex-col items-start gap-y-4 w-full"
          >
            <div className="mdc-dialog__container" style={{ width: "100%" }}>
              <div
                style={{ borderRadius: "10px", width: "100%" }}
                className="mat-mdc-dialog-surface mdc-dialog__surface"
              >
                <div _nghost-ng-c526813732="" className="ng-star-inserted">
                  <div _ngcontent-ng-c526813732="" className="referral-modal">
                    <div
                      _ngcontent-ng-c526813732=""
                      className="modal-header"
                      style={{
                        backgroundColor: "transparent",
                        alignItems: "start",
                        justifyContent: "start",
                        paddingLeft: "10px",
                        color: "#000",
                      }}
                    >
                      <h3
                        style={{ margin: "0px", fontSize: "18px" }}
                        _ngcontent-ng-c526813732=""
                        className=""
                      >
                        {getLanguage(LanguageKey.SPEED_CASHOUT)}
                      </h3>
                    </div>
                    <div
                      _ngcontent-ng-c526813732=""
                      className="modal-body"
                      style={{
                        backgroundColor: "transparent",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "1px solid rgb(81 81 81)",
                          borderBottom: "1px solid rgb(81 81 81)",
                          margin: "10px 0px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                            borderRight: "1px solid rgb(81 81 81)",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px 0px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "#000",
                            }}
                          >
                            <span style={{ fontWeight: "500" }}>
                              {speedCashOut?.runner1?.name}
                            </span>
                            <span>₹ {speedCashOut?.exposureA}</span>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px 0px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "#000",
                            }}
                          >
                            <span style={{ fontWeight: "500" }}>
                              {speedCashOut?.runner2?.name}
                            </span>
                            <span>₹ {speedCashOut?.exposureB}</span>
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0px 10px",
                          color: "#000",
                        }}
                        _ngcontent-ng-c526813732=""
                      >
                        {getLanguage(
                          LanguageKey.WE_ARE_DEDUCTING_THREE_PERCENT_FEE_ON_SPEED_CASHOUT,
                        )}
                      </p>
                      <div
                        style={{ padding: "0px" }}
                        _ngcontent-ng-c526813732=""
                        className="referral-code"
                      >
                        <button
                          style={{
                            position: "static",
                            width: "100%",
                            fontWeight: "600",
                            fontSize: "14px",
                            margin: "0px",
                          }}
                          onClick={handleSpeedCashOut}
                          _ngcontent-ng-c526813732=""
                          className="btn secondary-btn text-primary bg-primary"
                        >
                          {getLanguage(LanguageKey.SPEED_CASHOUT)} - {amount}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedCashOut;
