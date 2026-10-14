import toast from "react-hot-toast";
import moment from "moment";
import { AxiosSecure } from "../../lib/AxiosSecure";
import { API } from "../../api";
import { useBonusQuery } from "../../hooks/bonus";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BonusStatement = () => {
  const { getLanguage } = useLanguage();
  const { data, refetch } = useBonusQuery({
    type: "viewStatement",
  });

  const handleShowMessage = (item) => {
    if (item?.is_claimed == 1) {
      return (
        <span className="text-green-500">
          {getLanguage(LanguageKey.BONUS_CLAIMED)}
        </span>
      );
    } else if (item?.is_claimed == 2) {
      return (
        <span className="text-orange-500">
          {getLanguage(LanguageKey.CLAIM_PENDING)}
        </span>
      );
    } else if (item?.is_claimed == 3) {
      return (
        <span className="text-red-500">
          {getLanguage(LanguageKey.REJECTED)}
        </span>
      );
    } else if (item?.is_claimed == 0) {
      if (item?.is_wagering_complete == 1) {
        return (
          <button
            onClick={() => handleClaimBonus(item)}
            className="bg-[var(--primary-bg)] px-2 rounded-sm py-1 text-white"
          >
            {getLanguage(LanguageKey.CLAIM)}
          </button>
        );
      } else if (item?.is_wagering_complete == 0) {
        return (
          <span className="text-red-500">
            {getLanguage(LanguageKey.WAGERING_INCOMPLETE)}
          </span>
        );
      }
    }
  };

  const handleClaimBonus = async (item) => {
    const payload = {
      type: "claimBonus",
      bonus_statement_id: item?.bonus_statement_id,
    };

    const result = await AxiosSecure.post(API.bonus, payload);
    if (result?.data?.success) {
      refetch();
      toast.success(result?.data?.result);
    } else {
      toast.error(result?.data?.result || "Something went wrong");
    }
  };

  const formateDate = (date) => {
    if (date) {
      const formateDate = moment(date).format("DD-MM-YYYY, h:mm a");
      return formateDate;
    }
  };
  console.log(data);
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div className="flex flex-col h-full">
        {data?.result?.length > 0 ? (
          data?.result?.map((item, i) => {
            return (
              <div
                key={i}
                title="Profit &amp; Loss Statement"
                className="w-full px-1 my-1.5"
              >
                {item?.bonus_type === "wagering" ? (
                  <div
                    title="Cricket - 1.232257782-3066645.FY"
                    className="w-full flex  transition-all ease-in-out duration-200 flex-col rounded-[4px] items-center justify-start gap-y-1 bg-gray-200 my-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  >
                    <div className="w-full bg-bg_Quaternary1 px-2.5 py-2 flex items-center justify-between  text-xs sm:text-sm">
                      <span className="text-text_Ternary w-1/2 border-r border-r-oddInputColor flex items-center justify-start gap-x-1">
                        <span>{getLanguage(LanguageKey.BONUS_AMOUNT)}:</span>
                        <span className="font-semibold text-text_Success">
                          ₹ {item?.amount}
                        </span>
                      </span>
                      <span className="text-text_Ternary w-1/2 flex items-center justify-end gap-x-1">
                        <span>
                          {getLanguage(LanguageKey.WAGERING_REQUIRED)}:
                        </span>
                        <span
                          className={`font-semibold ${
                            item?.wagering_amount > 0
                              ? "text-text_Success"
                              : "text-text_Danger"
                          }`}
                        >
                          ₹ {item?.wagering_amount}
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-bg_Quaternary1 px-2.5 py-2 flex items-center justify-between  text-xs sm:text-sm">
                      <span className="text-text_Ternary w-1/2 border-r border-r-oddInputColor flex items-center justify-start gap-x-1">
                        <span>
                          {getLanguage(LanguageKey.WAGERING_COMPLETED_AMOUNT)}:
                        </span>
                        <span
                          className={`font-semibold ${
                            item?.is_wagering_complete == 0
                              ? "text-orange-500"
                              : ""
                          } ${
                            item?.is_wagering_complete == 1
                              ? "text-text_Success"
                              : ""
                          }`}
                        >
                          ₹ {item?.wagering_complete_amount}
                        </span>
                      </span>
                      <span className="text-text_Ternary w-1/2 flex items-center justify-end gap-x-1">
                        <span>{getLanguage(LanguageKey.DATE_ADDED)}:</span>
                        <span className={`font-semibold `}>
                          {formateDate(item?.date_added)}
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-bg_Quaternary1 px-2.5 py-2 flex items-center justify-between  text-xs sm:text-sm">
                      <span className="text-text_Ternary w-1/2 border-r border-r-oddInputColor flex items-center justify-start gap-x-1">
                        <span>{getLanguage(LanguageKey.EXPIRY_DATE)}:</span>
                        <span className="font-semibold">
                          {formateDate(item?.expiry_date)}
                        </span>
                      </span>
                      <span className="text-text_Ternary w-1/2 flex items-center justify-end gap-x-1">
                        <span></span>
                        <span className={`font-semibold `}>
                          {handleShowMessage(item)}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    title="Cricket - 1.232257782-3066645.FY"
                    className="w-full flex  transition-all ease-in-out duration-200 flex-col rounded-[4px] items-center justify-start gap-y-1 bg-gray-200 my-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  >
                    <div className="w-full bg-bg_Quaternary1 px-2.5 py-2 flex items-center justify-between  text-xs sm:text-sm">
                      <span className="text-text_Ternary w-1/2 border-r border-r-oddInputColor flex items-center justify-start gap-x-1">
                        <span>{getLanguage(LanguageKey.BONUS_AMOUNT)}:</span>
                        <span className="font-semibold text-text_Success">
                          ₹ {item?.amount}
                        </span>
                      </span>
                      <span className="text-text_Ternary w-1/2 flex items-center justify-end gap-x-1">
                        <span>{getLanguage(LanguageKey.DATE_ADDED)}:</span>
                        <span className={`font-semibold `}>
                          {formateDate(item?.date_added)}
                        </span>
                      </span>
                    </div>

                    <div className="w-full bg-bg_Quaternary1 px-2.5 py-2 flex items-center justify-end  text-xs sm:text-sm">
                      <span className="text-text_Ternary w-1/2 flex items-center justify-end gap-x-1">
                        <span></span>
                        <span className={`font-semibold `}>
                          {handleShowMessage(item)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full pt-20">
            <h2 className="text-base ">
              {getLanguage(LanguageKey.NO_BONUS_STATEMENT_YET)}!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusStatement;
