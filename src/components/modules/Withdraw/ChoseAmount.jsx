import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";
import useWithdrawBreakdown from "../../../hooks/withdrawBreakdown";

const ChooseAmount = ({ setTab, setAmount, amount }) => {
  const { getLanguage } = useLanguage();
  const { data } = useWithdrawBreakdown();

  const handleShowBank = () => {
    if (amount < data?.minimumWithdraw || amount > data?.mainWallet) {
      return;
    } else {
      setTab("bank");
    }
  };
  return (
    <div className="w-full h-full  lg:w-[54%] lg:pt-2">
      <div className="w-full flex flex-col gap-2 pt-2 pb-1 px-4 rounded-lg  bg-background">
        <div className=" font-[600] text-base leading-5 ">Withdraw Funds</div>
        <div className="w-full flex flex-col text-xs  transition-all ease-in-out duration-100">
          <div className="text-xs md:text-sm  pt-1 font-semibold leading-4">
            1. This form is for withdrawing the amount from the main wallet
            only.
          </div>
          <div
            className="overflow-hidden transition-height duration-100 ease-in-out"
            style={{ height: "0px" }}
          ></div>
          <div
            className="overflow-hidden transition-height duration-100 ease-in-out"
            style={{ height: "20px" }}
          >
            <div className="text-xs pt-1 md:text-sm  font-semibold leading-4">
              2. The bonus wallet amount cannot be withdrawn by this form.
            </div>
          </div>
          <div
            className="overflow-hidden transition-height duration-100 ease-in-out"
            style={{ height: "20px" }}
          >
            <div className="text-xs pt-1 md:text-sm  font-semibold leading-4">
              3. Do not put Withdraw request without betting with deposit
              amount. Such activity will be identified as Suspicious
            </div>
          </div>
          <div
            className="overflow-hidden transition-height duration-100 ease-in-out"
            style={{ height: "20px" }}
          >
            <div className="text-xs pt-1 md:text-sm  font-semibold leading-4">
              4. If multiple users are using same withdraw account then all the
              linked users will be blocked.
            </div>
          </div>
        </div>
      </div>
      <div className="px-2  flex flex-col items-start justify-start gap-y-2 mt-1 md:mt-[10px] pb-10">
        <div className="text-base   w-full font-[600] flex flex-col items-start justify-start gap-y-1">
          <span className="text-sm md:text-base">
            {getLanguage(LanguageKey.PLEASE_FILL_IN_ALL_REQUIRED_FIELDS)}
          </span>
        </div>
        <div className="rounded-lg   py-2 px-3.5 flex flex-col items-start justify-start w-full gap-y-0.5">
          <div className="w-full flex items-start justify-start gap-y-[0.5] flex-col">
            <span className="text-sm mt-1 bg-primary rounded  shadow-md  px-2 py-1 my-1 text-primary">
              {getLanguage(LanguageKey.AVAILABLE_TO_WITHDRAW)} : ₹{" "}
              {data?.mainWallet}
            </span>
            <div className="flex flex-col w-full">
              <div className="ml-1 text-sm">
                {getLanguage(LanguageKey.AMOUNT)}{" "}
                <span className="text-rose-500">*</span>
              </div>
              <div
                className={`flex items-center w-full  w-full py-2 px-2 rounded-lg border  ${
                  !amount ||
                  amount < data?.minimumWithdraw ||
                  amount > data?.mainWallet
                    ? "border-rose-500 focus-within:border-rose-500"
                    : "border-green-500 focus-within:border-green-500"
                }`}
              >
                <div className="flex-shrink-0 w-max">₹</div>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm px-1 flex-grow min-w-0 border-none focus:outline-none bg-transparent"
                  placeholder="Enter Amount"
                  inputMode="numeric"
                  aria-label="Amount"
                  id="amount"
                  type="number"
                  value={amount}
                />
                <div className="flex-shrink-0 w-max">
                  {getLanguage(LanguageKey.MIN)} {data?.minimumWithdraw}
                </div>
              </div>
              <div className="flex items-start w-full justify-between leading-normal px-1">
                <div className="w-max min-h-[18px] h-max" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-center gap-x-2">
          <div className="inline-flex items-center">
            <label
              className="relative flex cursor-pointer items-center rounded-full "
              htmlFor="blue"
            >
              <input
                className="before:content[''] before:bg-bg_color_quaternary8 rounded-md peer relative cursor-pointer appearance-none border border- transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-max before:w-max before:-translate-x-2/4 before:-translate-y-2/4 before:opacity-0 before:transition-opacity checked:border- checked:bg-bg_color_success hover:before:opacity-10 h-5 w-5"
                id="blue"
                type="checkbox"
                defaultChecked
              />
              <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-black  transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
          </div>
          <span className="text-sm  font-[400] leading-5">
            I have read and agree with{" "}
            <span className="underline text-sm  font-[400] leading-4 cursor-pointer">
              the terms of payment and withdrawal policy.
            </span>
          </span>
        </div>
        <div className="w-full sticky bottom-0 left-0 pb-2 app-bg pt-2">
          <button
            onClick={handleShowBank}
            disabled={
              !amount ||
              amount < data?.minimumWithdraw ||
              amount > data?.mainWallet
                ? true
                : false
            }
            className="relative overflow-hidden bg-primary w-full  h-10 text-base shadow-lg rounded-md font-[600] leading-4 disabled:opacity-70 flex gap-x-1 items-center justify-center"
            type="button"
          >
            <span>{getLanguage(LanguageKey.SUBMIT)}</span>
          </button>
        </div>
      </div>
      <div className="w-full pb-4 px-2" />
    </div>
  );
};

export default ChooseAmount;
