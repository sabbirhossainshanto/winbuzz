import { useState } from "react";
import { useIndex } from "../../../hooks";
import moment from "moment";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const ProfitLoss = () => {
  const { getLanguage } = useLanguage();
  const from = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  const to = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(from);
  const [toDate, setToDate] = useState(to);
  const { mutate, data, isSuccess } = useIndex();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      type: "get_affiliate_all_pl",
      from_date: fromDate,
      to_date: toDate,
    });
  };

  const getUniqueDate = Array.from(
    new Set(data?.result?.map((item) => item?.date_added)),
  );
  return (
    <section data-v-81c2ddd8 className="nw-affi-user-wrapper affi-pd-bot">
      <div data-v-81c2ddd8 className>
        <h3 data-v-81c2ddd8 className="nw-affi-heading-text">
          {getLanguage(LanguageKey.USER_PROFIT_LOSS)}
        </h3>
        <form
          onSubmit={handleSubmit}
          data-v-81c2ddd8
          className="typeslabel openbettss affiliate-pl affiliate-report affi-date-filter-form"
        >
          <ul
            style={{ paddingLeft: "0px" }}
            data-v-81c2ddd8
            className="typelabel-main flex-nowrap"
          >
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  {getLanguage(LanguageKey.FROM_DATE)}
                </label>
                <input
                  onChange={(e) => setFromDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={fromDate}
                />
              </div>
            </li>
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  {getLanguage(LanguageKey.TO_DATE)}
                </label>
                <input
                  onChange={(e) => setToDate(e.target.value)}
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                  value={toDate}
                />
              </div>
            </li>
          </ul>
          <div data-v-81c2ddd8 className="download-main">
            <button
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>{getLanguage(LanguageKey.SUBMIT)}</span>
            </button>
          </div>
        </form>
        {getUniqueDate?.length > 0 &&
          getUniqueDate?.map((date) => {
            const filterByDate = data?.result?.filter(
              (item) => item?.date_added === date,
            );
            const totalPnl = filterByDate?.reduce((acc, curr) => {
              return acc + Number(curr.amount);
            }, 0);
            return (
              <div
                key={date}
                title="Profit &amp; Loss Statement"
                className="w-full px-1 my-1.5 cursor-pointer"
              >
                <div className="w-full text-black rounded-[4px] flex items-center justify-between px-2.5 py-[9px] bg-primary">
                  <div className="text-xs text-black   font-[600] leading-[140%]">
                    {moment(date).format("Do-MMM-YYYY")}
                  </div>
                  <div className="text-xs text-black  font-[600] flex items-center justify-center leading-[140%]">
                    <span className="text-black">
                      {getLanguage(LanguageKey.TOTAL_PL)}
                    </span>
                    <span className="-mt-0.5 ml-1 text-black">:</span>
                    <span
                      style={{ textShadow: "1px 1px #000000" }}
                      className={`ml-1 ${
                        totalPnl > 0
                          ? "text-text_color_success"
                          : totalPnl < 0
                            ? "text-rose-500"
                            : "text-white"
                      }`}
                    >
                      {totalPnl}
                    </span>
                  </div>
                </div>
                {filterByDate?.map((item, i) => {
                  return (
                    <div key={i}>
                      <div
                        title="Cricket - 1.232257782-3066645.FY"
                        className="w-full flex active:scale-95 transition-all ease-in-out duration-200 flex-col rounded-[4px] items-center justify-start gap-y-1 my-1 shadow-md cursor-pointer"
                      >
                        <div className="w-full text-start   px-2.5 py-2 text-xs font-[550] capitalize flex items-center justify-between">
                          <span className="text-black w-1/2 border-r border-r-gray-300 flex items-center justify-start gap-x-1">
                            <span className={`font-semibold  `}>
                              {item?.event_type_id}
                            </span>
                          </span>
                          <span className="text-black w-1/2 flex items-center justify-end gap-x-1">
                            <span>{getLanguage(LanguageKey.AMOUNT)}:</span>
                            <span
                              className={`font-semibold ${
                                item?.amount > 0
                                  ? "text-green-500"
                                  : item?.amount < 0
                                    ? "text-rose-500"
                                    : "text-black"
                              }`}
                            >
                              ₹ {item?.amount}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        {isSuccess && getUniqueDate?.length === 0 && (
          <div className="flex items-center justify-center w-full pt-20">
            <h2 className="text-base ">
              {getLanguage(LanguageKey.NO_BETTING_PROFIT_LOSS_YET)}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfitLoss;
