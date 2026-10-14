import { useEffect } from "react";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const BetLoading = ({ setBetDelay, betDelay, absolute }) => {
  const { getLanguage } = useLanguage();
  useEffect(() => {
    if (betDelay > 0) {
      setTimeout(() => {
        setBetDelay((prev) => prev - 1);
      }, 1000);
    } else {
      setBetDelay(null);
    }
  }, [setBetDelay, betDelay]);

  return (
    <div
      id="popup-modal"
      className={`z-[1000] ${
        absolute ? "absolute h-full" : "fixed w-[100vw] h-screen min-h-[100vh]"
      }  top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full  items-center  justify-center bg-bg_CasinoPopupBg __web-inspector-hide-shortcut__`}
    >
      <div
        className={`z-2 popUpBoxShadow popUpOpenAnimation absolute w-[86%] max-w-[380px] py-3 px-2 rounded-[10px] bg-bg_Quaternary p-2 xs:p-5`}
      >
        <div className="flex flex-col gap-4 align-top items-center">
          <span className="relative w-max min-w-6 min-h-6 flex items-center justify-center p-2 pt-6">
            <span className="absolute min-w-8 min-h-8 animate-spin rounded-full border-[2px] border-[var(--primary-bg)] border-dashed"></span>

            {/* <span className="font-semibold text-text_Ternary">
              {betDelay > 0 && betDelay}
            </span> */}
          </span>
          <span className="font-semibold mt-[4px]">
            {getLanguage(LanguageKey.YOUR_BET_IS_BEING_PROCESSED)}...
          </span>
          <span className="font-semibold">
            {getLanguage(LanguageKey.PLEASE_WAIT)}...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetLoading;
