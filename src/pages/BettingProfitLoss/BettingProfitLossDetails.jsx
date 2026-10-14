import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleProfitLoss } from "../../hooks/settledBets";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BettingProfitLossDetails = () => {
  const { getLanguage } = useLanguage();
  const [backTotal, setBackTotal] = useState(0);
  const [layTotal, setLayTotal] = useState(0);
  const { marketId } = useParams();
  const { data } = useSingleProfitLoss(marketId);

  useEffect(() => {
    if (data?.result?.length > 0) {
      const back = data?.result?.filter((item) => item?.betType === "Back");
      let backTotal = 0;
      for (const item of back) {
        backTotal = backTotal + item.win;
      }
      const lay = data?.result?.filter((item) => item?.betType === "Lay");
      let layTotal = 0;
      for (const item of lay) {
        layTotal = layTotal + item.win;
      }

      setBackTotal(backTotal);
      setLayTotal(layTotal);
    }
  }, [data]);

  let total = 0;
  if (data?.result) {
    for (const item of data.result) {
      total = total + item.win;
    }
  }

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-b6eed746 className="right-side-bar-main-sec my-bets-sec">
          <div className="w-full h-full flex flex-col gap-2  font  text-sm">
            <div className="flex flex-col rounded-md overflow-hidden shadow-lg">
              <div className="bg-primary py-2 px-4 text-primary font-semibold">
                {data?.result?.[0]?.eventName}
              </div>
              <div className="flex flex-col divide-y">
                {data?.result?.map((item) => {
                  return (
                    <div
                      key={item?.betId}
                      className="w-full overflow-hidden flex flex-col gap-2 "
                    >
                      <div className="flex px-4 pt-2 justify-between">
                        <span>Selection</span>
                        <span className="capitalize text-end">
                          {" "}
                          {item?.nation}
                        </span>
                      </div>
                      <div className="flex px-4 justify-between gap-x-2">
                        <span>{getLanguage(LanguageKey.COMPETITION_NAME)}</span>
                        <span className="capitalize text-end max-w-[60%]">
                          {item?.eventName}
                        </span>
                      </div>
                      <div className="flex px-4 justify-between">
                        <span>{getLanguage(LanguageKey.MARKET_NAME)}</span>
                        <span className="capitalize"> {item?.marketName}</span>
                      </div>
                      <div className="flex px-4 py-2 border mx-4 rounded justify-between bg-rose-100">
                        <div>
                          P&amp;L:
                          <span
                            className={`font-semibold  ${
                              item?.win > 0 ? "text-green-500" : "text-rose-500"
                            }`}
                          >
                            ₹ {item?.win}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`font-semibold capitalize ${
                              item?.win > 0 ? "text-green-500" : "text-rose-500"
                            }`}
                          >
                            {item?.win > 0 ? "win" : "lost"}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between px-4 ">
                        <div>{getLanguage(LanguageKey.BET_ID)}</div>
                        <div>{item?.betId}</div>
                      </div>
                      <div className="flex justify-between px-4 ">
                        <div>{getLanguage(LanguageKey.PLACED_DATE)}</div>
                        <div>{item?.placeDate}</div>
                      </div>
                      <div className="px-4 py-4 text-center text-sm ">
                        <div className="overflow-hidden rounded-lg border">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-blue-100 ">
                                <th className="border-r px-3 py-1 first:rounded-tl-lg last:rounded-tr-lg">
                                  {getLanguage(LanguageKey.TYPE)}
                                </th>
                                <th className="border-r px-3 py-1">
                                  {getLanguage(LanguageKey.ODDS)}
                                </th>
                                <th className="border-b px-3 py-1 first:rounded-tr-lg">
                                  {getLanguage(LanguageKey.STAKE)}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border-r border-t px-3 py-1">
                                  {item?.betType}
                                </td>
                                <td className="border border-b-0 px-3 py-1">
                                  {item?.userRate}
                                </td>
                                <td className="px-3 py-1">{item?.amount}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" py-2 px-4 rounded-md flex flex-col gap-2 shadow-lg">
              <div className="flex justify-between border-dashed ">
                <div>{getLanguage(LanguageKey.BACK_SUBTOTAL)}</div>
                <div
                  className={`font-bold ${
                    backTotal > 0 ? "text-green-500" : "text-rose-500"
                  }`}
                >
                  ₹ {backTotal}
                </div>
              </div>
              <div className="flex justify-between border-dashed ">
                <div>{getLanguage(LanguageKey.LAY_SUBTOTAL)}</div>
                <div
                  className={`font-bold ${
                    layTotal > 0 ? "text-green-500" : "text-rose-500"
                  }`}
                >
                  ₹ {layTotal}
                </div>
              </div>
              <div className="flex justify-between border-dashed  ">
                <div>{getLanguage(LanguageKey.MARKET_SUBTOTAL)}</div>
                <div
                  className={`font-bold ${
                    layTotal + backTotal > 0
                      ? "text-green-500"
                      : "text-rose-500"
                  }`}
                >
                  ₹ {layTotal + backTotal}
                </div>
              </div>
              <div className="flex justify-between border-dashed  ">
                <div>{getLanguage(LanguageKey.COMMISSION)}</div>
                <div className="font-bold">₹ 0.0</div>
              </div>
              <div className="flex justify-between border-t border-dashed  ">
                <div className="relative top-[3px]">
                  {getLanguage(LanguageKey.NET_MARKET_TOTAL)}
                </div>
                <div
                  className={`font-bold relative top-[3px] ${
                    layTotal + backTotal > 0
                      ? "text-green-500"
                      : "text-rose-500"
                  }`}
                >
                  ₹ {layTotal + backTotal}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingProfitLossDetails;
