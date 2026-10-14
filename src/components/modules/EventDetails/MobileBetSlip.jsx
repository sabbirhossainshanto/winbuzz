import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCurrentBets } from "../../../hooks/currentBets";
import useBalance from "../../../hooks/balance";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { API, Settings } from "../../../api";
import { AxiosJSEncrypt } from "../../../lib/AxiosJSEncrypt";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";
import BetLoading from "./BetLoading";
import { isBetDelay, isDelay } from "../../../utils/isBetDelay";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";
const MobileBetSlip = ({ currentPlaceBetEvent }) => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state?.global);
  const [isCashOut, setIsCashOut] = useState(false);
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchExposure } = useExposure(eventId);
  const { placeBetValues, price, stake, predictOdd } = useSelector(
    (state) => state?.event,
  );

  // const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  const [betDelay, setBetDelay] = useState("");

  useEffect(() => {
    dispatch(setPrice(parseFloat(placeBetValues?.price)));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null,
      ),
    );
    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues, dispatch]);

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
        betDelay: currentPlaceBetEvent?.betDelay,
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
        betDelay: currentPlaceBetEvent?.betDelay,
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
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    setLoading(true);
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: isBetDelay(placeBetValues),
        apk: closePopupForForever ? true : false,
      },
    ];
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
        setBetDelay(currentPlaceBetEvent?.betDelay);
        delay = Settings?.bet_delay ? currentPlaceBetEvent?.betDelay * 1000 : 0;
      }
    }

    // Introduce a delay before calling the API
    setTimeout(async () => {
      try {
        // const res = await createOrder(payloadData).unwrap();
        const { data } = await AxiosJSEncrypt.post(API.order, payloadData);
        if (data?.success) {
          setLoading(false);
          refetchExposure();
          refetchBalance();
          dispatch(setRunnerId(null));
          dispatch(setPlaceBetValues(null));
          refetchCurrentBets();
          setBetDelay("");
          dispatch(setStake(null));
          toast.success(data?.result?.result?.placed?.[0]?.message);
        } else {
          setLoading(false);
          toast.error(
            data?.error?.status?.[0]?.description || data?.error?.errorMessage,
          );
          setBetDelay("");
          setBetDelay(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
        setBetDelay("");
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

  const handleCancelBet = () => {
    dispatch(setRunnerId(null));
    dispatch(setPlaceBetValues(null));
    dispatch(setStake(null));
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
  const selectedEvent = predictOdd?.find(
    (odd) => odd?.id === placeBetValues?.selectionId,
  );

  return (
    <div
      data-v-4a1ad0c4
      className="stake-placed-bet stake-light-blue-box block lg:hidden relative"
      // style={{ display: "block" }}
    >
      {loading && (
        <BetLoading
          absolute={true}
          betDelay={betDelay}
          setBetDelay={setBetDelay}
        />
      )}
      {/* <div data-v-4a1ad0c4 className="bet-placing-head">
        <div data-v-4a1ad0c4 className="check-mark accept-any-odds-btn">
          <div data-v-4a1ad0c4 className="form-check form-switch">
            <input
              data-v-4a1ad0c4
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefaults"
            />
            <label
              data-v-4a1ad0c4
              className="form-check-label"
              htmlFor="flexSwitchCheckDefaults"
            >
              Accept any odds
            </label>
          </div>
        </div>
        <div data-v-4a1ad0c4 className="bet-placing-head-left">
          <p data-v-4a1ad0c4 className="betslip-aval-bal">
            Aval Bal : &nbsp;
            <span data-v-4a1ad0c4 className="text-green">
              0.06
            </span>
          </p>
        </div>
      </div> */}

      <div data-v-4a1ad0c4 className="bets-odd-sec">
        <div data-v-4a1ad0c4 className="inpt-grp-lft">
          <div data-v-4a1ad0c4 className="increment-decrement-sec">
            {!placeBetValues?.isWeak && (
              <div
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
                -{" "}
              </div>
            )}

            <div data-v-4a1ad0c4 className="select-digit">
              <input
                onChange={(e) => {
                  dispatch(setPrice(e.target.value));
                  setIsCashOut(false);
                }}
                value={price}
                data-v-4a1ad0c4
                type="number"
                className="form-control"
                id="number"
              />
            </div>
            {!placeBetValues?.isWeak && (
              <div
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
          <input
            onChange={(e) => {
              dispatch(setStake(e.target.value));
              setIsCashOut(false);
            }}
            data-v-4a1ad0c4
            type="number"
            className="form-control"
            placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
            value={stake !== null && stake}
          />
        </div>
      </div>
      <div data-v-4a1ad0c4 className="value-btn-grid-box">
        {parseButtonValues?.slice(0, 6)?.map((button, i) => (
          <div
            key={i}
            onClick={() => handleButtonValue(button?.value)}
            data-v-4a1ad0c4
            className="value-small-box"
          >
            <button data-v-4a1ad0c4 type="button">
              {button?.value}
            </button>
          </div>
        ))}
      </div>
      <div data-v-4a1ad0c4 className="stake-limit-grid">
        <div data-v-4a1ad0c4 className="stake-small-box">
          <button
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
        <div data-v-4a1ad0c4 className="stake-small-box">
          <button data-v-4a1ad0c4 type="button" className="stake-3">
            {getLanguage(LanguageKey.EDIT_STAKE)}
          </button>
        </div>
        <div data-v-4a1ad0c4 className="stake-small-box">
          <button
            onClick={() => dispatch(setStake(null))}
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
            onClick={handleCancelBet}
            data-v-4a1ad0c4
            type="button"
            className="close-btn-1"
          >
            {getLanguage(LanguageKey.CANCEL)}
          </button>
        </div>
        <div data-v-4a1ad0c4 className="placed-btn">
          <button
            onClick={handleOrderBets}
            data-v-4a1ad0c4
            className="place-btn-filled place-btn-outline stakeEmpty"
            type="button"
          >
            <span data-v-4a1ad0c4>{getLanguage(LanguageKey.PLACE_BET)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileBetSlip;
