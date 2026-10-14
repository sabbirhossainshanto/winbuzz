import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useBalance from "../../../hooks/balance";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useExposure } from "../../../hooks/exposure";

import {
  setPlaceBetValues,
  setPredictOdd,
  setPrice,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { API, Settings } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";
import { AxiosJSEncrypt } from "../../../lib/AxiosJSEncrypt";
import BetLoading from "./BetLoading";
import { isBetDelay, isDelay } from "../../../utils/isBetDelay";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const BetSlip = () => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state?.global);
  const [isCashOut, setIsCashOut] = useState(false);
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const { price, stake, placeBetValues } = useSelector((state) => state.event);
  const { eventId } = useParams();
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchExposure } = useExposure(eventId);
  const [betDelay, setBetDelay] = useState(null);
  const [loading, setLoading] = useState(false);
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  useEffect(() => {
    dispatch(setPrice(placeBetValues?.price));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize.toFixed(2)
          : null,
      ),
    );

    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues, dispatch]);

  useEffect(() => {
    if (betDelay <= 0) {
      setBetDelay(null);
    }
    dispatch(setPredictOdd([]));
  }, [placeBetValues, dispatch, betDelay]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */
  const handleOrderBets = async () => {
    const payloadData = [
      {
        ...payload,

        nounce: uuidv4(),
        isbetDelay: isBetDelay(placeBetValues),
        apk: closePopupForForever ? true : false,
      },
    ];
    setLoading(true);
    let delay = 0;
    if (isDelay(placeBetValues)) {
      if (
        eventTypeId == 4 &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 3 &&
        placeBetValues?.name?.length === 2
      ) {
        delay = 9000;
      }
      if (
        eventTypeId == 4 &&
        placeBetValues?.btype === "MATCH_ODDS" &&
        price > 7 &&
        placeBetValues?.name?.length === 3
      ) {
        delay = 9000;
      } else {
        setBetDelay(placeBetValues?.betDelay);
        delay = Settings?.bet_delay ? placeBetValues?.betDelay * 1000 : 0;
      }
    }

    setTimeout(async () => {
      const { data } = await AxiosJSEncrypt.post(API.order, payloadData);

      if (data?.success) {
        setLoading(false);
        refetchExposure();
        refetchBalance();
        refetchCurrentBets();
        dispatch(setShowLoginModal(false));
        setBetDelay("");
        toast.success(data?.result?.result?.placed?.[0]?.message);
        dispatch(setPlaceBetValues(null));
        dispatch(setStake(null));
      } else {
        setLoading(false);
        toast.error(
          data?.error?.status?.[0]?.description || data?.error?.errorMessage,
        );
        setBetDelay(null);
      }
    }, delay);
  };

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
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleButtonValue = (value) => {
    setIsCashOut(false);
    const buttonValue = Number(value);
    const prevStake = !stake ? null : Number(stake);

    if (prevStake === null) {
      dispatch(setStake(buttonValue));
    }
    if (prevStake >= 0) {
      dispatch(setStake(buttonValue + prevStake));
    }
  };

  return (
    <Fragment>
      <div data-v-4a1ad0c4 className="placed-bet-head">
        <span data-v-4a1ad0c4>Place-Bet</span>
      </div>
      <div data-v-4a1ad0c4 className="stake-bet-desk-sec relative">
        {loading && (
          <BetLoading
            absolute={true}
            betDelay={betDelay}
            setBetDelay={setBetDelay}
          />
        )}
        <div
          data-v-4a1ad0c4
          className={`stake-placed-bet ${
            placeBetValues?.back
              ? "stake-light-blue-box"
              : "stake-light-pink-box"
          }`}
          style={{ display: placeBetValues ? "block" : "none" }}
        >
          <div data-v-4a1ad0c4 className="bet-placing-head">
            <div data-v-4a1ad0c4 className="bet-placing-head-right">
              <small data-v-4a1ad0c4>
                {getLanguage(LanguageKey.MIN)}:{" "}
                {placeBetValues?.minLiabilityPerBet}
              </small>
              <small data-v-4a1ad0c4>
                {getLanguage(LanguageKey.MAX)}:{" "}
                {placeBetValues?.maxLiabilityPerBet}{" "}
              </small>
            </div>
            <p data-v-4a1ad0c4 className="betslip-aval-bal">
              Aval Bal : &nbsp;
              <span data-v-4a1ad0c4 className="text-green">
                3.53
              </span>
            </p>
          </div>

          <div data-v-4a1ad0c4 className="bets-odd-sec">
            <div data-v-4a1ad0c4 className="inpt-grp-lft">
              <label data-v-4a1ad0c4>odds</label>
              <div data-v-4a1ad0c4 className="increment-decrement-sec">
                {!placeBetValues?.isWeak && (
                  <div
                    style={{ pointerEvents: loading ? "none" : "auto" }}
                    onClick={() => {
                      handleDecreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice,
                      );
                      setIsCashOut(false);
                    }}
                    data-v-4a1ad0c4
                    className="value-button decrease-btn"
                    id="decrease"
                  >
                    {" "}
                    -
                  </div>
                )}

                <div data-v-4a1ad0c4 className="select-digit">
                  <input
                    disabled={loading}
                    onChange={(e) => {
                      dispatch(setPrice(e.target.value));
                      setIsCashOut(false);
                    }}
                    data-v-4a1ad0c4
                    type="number"
                    className="form-control input-disabled"
                    id="number"
                    value={price}
                  />
                </div>
                {!placeBetValues?.isWeak && (
                  <div
                    style={{ pointerEvents: loading ? "none" : "auto" }}
                    onClick={() => {
                      handleIncreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice,
                      );
                      setIsCashOut(false);
                    }}
                    data-v-4a1ad0c4
                    className="value-button increase-btn"
                    id="increase"
                  >
                    +{" "}
                  </div>
                )}
              </div>
            </div>
            <div data-v-4a1ad0c4 className="inpt-grp-rgt">
              <label data-v-4a1ad0c4>{getLanguage(LanguageKey.STAKE)}</label>
              <input
                disabled={loading}
                onChange={(e) => {
                  dispatch(setStake(e.target.value));
                  setIsCashOut(false);
                }}
                data-v-4a1ad0c4
                placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
                value={stake !== null && stake}
                type="number"
                className="form-control"
              />
            </div>
          </div>
          <div data-v-4a1ad0c4 className="value-btn-grid-box">
            {parseButtonValues?.slice?.(0, 6)?.map((button, i) => (
              <div key={i} data-v-4a1ad0c4 className="value-small-box">
                <button
                  onClick={() => handleButtonValue(button?.value)}
                  disabled={loading}
                  data-v-4a1ad0c4
                  type="button"
                >
                  {button?.value}
                </button>
              </div>
            ))}
          </div>
          <div data-v-4a1ad0c4 className="stake-limit-grid">
            <div data-v-4a1ad0c4 className="stake-small-box">
              <button
                disabled={loading}
                onClick={() => dispatch(setStake(100))}
                data-v-4a1ad0c4
                type="button"
                className="stake-1"
              >
                {getLanguage(LanguageKey.MIN)}
              </button>
            </div>
            <div data-v-4a1ad0c4 className="stake-small-box">
              <button
                disabled={loading}
                onClick={() =>
                  dispatch(
                    setStake(
                      parseButtonValues[parseButtonValues?.length - 1].value,
                    ),
                  )
                }
                data-v-4a1ad0c4
                type="button"
                className="stake-2"
              >
                {getLanguage(LanguageKey.MAX)}
              </button>
            </div>

            <div
              onClick={() => {
                dispatch(setStake(null));
                setIsCashOut(false);
              }}
              data-v-4a1ad0c4
              className="stake-small-box"
            >
              <button
                disabled={loading}
                data-v-4a1ad0c4
                type="button"
                className="stake-4"
              >
                {getLanguage(LanguageKey.CLEAR)}
              </button>
            </div>
          </div>
          <div data-v-4a1ad0c4 className="cancel-placed-btn">
            <div data-v-4a1ad0c4 className="cancel-btn">
              <button
                disabled={loading}
                onClick={() => dispatch(setPlaceBetValues(null))}
                data-v-4a1ad0c4
                type="button"
                className="close-btn-1"
              >
                {getLanguage(LanguageKey.CANCEL)}
              </button>
            </div>
            <div data-v-4a1ad0c4 className="placed-btn">
              {loading ? (
                <button
                  data-v-4a1ad0c4=""
                  className="place-btn-filled"
                  type="button"
                  disabled=""
                >
                  <div
                    data-v-4a1ad0c4=""
                    className="text-center"
                    id="Otp_loader"
                  >
                    <div
                      data-v-4a1ad0c4=""
                      className="spinner-border"
                      role="status"
                    >
                      <span data-v-4a1ad0c4="" className="visually-hidden">
                        {getLanguage(LanguageKey.LOADING)}...
                      </span>
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleOrderBets}
                  data-v-4a1ad0c4
                  className="place-btn-outline place-btn-filled"
                  type="button"
                >
                  <span data-v-4a1ad0c4>
                    {getLanguage(LanguageKey.PLACE_BET)}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BetSlip;
