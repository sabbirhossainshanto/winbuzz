import { useEffect } from "react";
import useDepositBreakdown from "../../../hooks/depositBreakdown";
import toast from "react-hot-toast";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const SelectAmount = ({ amount, setAmount, setTab }) => {
  const { getLanguage } = useLanguage();
  const { mutate: handleDepositBreakdown, data } = useDepositBreakdown();

  const handleShowBankAccount = (e) => {
    e.preventDefault();
    if (amount) {
      const floatAmount = parseFloat(amount);

      if (typeof floatAmount !== "number") {
        return toast.error("Please enter a valid number");
      }
      handleDepositBreakdown(
        { amount: floatAmount },
        {
          onSuccess: (data) => {
            if (data?.minimumDeposit && floatAmount < data?.minimumDeposit) {
              toast.error(`Minimum deposit amount is ${data?.minimumDeposit}`);
            } else {
              setTab("bankAccount");
            }
          },
        },
      );
    }
  };

  useEffect(() => {
    handleDepositBreakdown({ amount: 100 });
  }, [handleDepositBreakdown]);

  return (
    <div className="w-full h-full  lg:w-[54%] lg:pt-2">
      <div className="mx-2  h-full pb-10">
        <div className="w-full flex flex-col gap-y-2">
          <form
            className="w-full flex flex-col gap-y-2 h-max"
            autoComplete="off"
          >
            <div className="w-full mt-2.5 py-[15px] rounded-lg bg-background px-3">
              <div className=" font-bold  text-base leading-5">
                <p>
                  {getLanguage(LanguageKey.AMOUNT)}
                  <span className="text-rose-500">*</span>
                </p>
              </div>
              <div className="w-full mt-2 py-2 bg-white grid grid-cols-12 border rounded-[4px] px-2 items-center justify-center  font-semibold">
                <input
                  onChange={(e) =>
                    setAmount(
                      e.target.value <= 10000000 ? e.target.value : 10000000,
                    )
                  }
                  className="block w-full focus:outline-none col-span-11   h-max bg-transparent  placeholder: placeholder:font-normal font-bold text-base"
                  placeholder="₹ Enter Amount"
                  required
                  autoComplete="off"
                  type="number"
                  value={amount}
                />
                <span className=" leading-4  text-base col-span-1 text-center font-semibold">
                  INR
                </span>
              </div>
              {data?.minimumDeposit && (
                <div className="text-x pl-1 mt-0  ">
                  <span>
                    {getLanguage(LanguageKey.MIN)} : {data?.minimumDeposit}
                  </span>
                </div>
              )}
              ``
              <div className="w-full grid grid-cols-3 gap-[10px] mt-[18px] text-white">
                <button
                  onClick={() => setAmount(500)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+500</span>
                </button>
                <button
                  onClick={() => setAmount(1000)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+1,000</span>
                </button>
                <button
                  onClick={() => setAmount(2000)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+2,000</span>
                </button>
                <button
                  onClick={() => setAmount(5000)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+5,000</span>
                </button>
                <button
                  onClick={() => setAmount(10000)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+10,000</span>
                </button>
                <button
                  onClick={() => setAmount(50000)}
                  className="relative overflow-hidden bg-primary-color transition-all ease-in-out duration-300 active:scale-95  min-h-9 text-base  rounded-md font-[600] leading-4"
                  type="button"
                >
                  <span>+50,000</span>
                </button>
              </div>
              <div className="text-text_brand_primary my-2 w-full text-start text-base  font-[480] leading-4" />
            </div>

            <div className="sticky w-full bottom-0 pb-[10px] app-bg">
              <button
                onClick={handleShowBankAccount}
                disabled={!amount}
                type="submit"
                className="bg-primary-color flex items-center justify-center gap-x-2 w-full  h-10 text-base rounded-md font-[500] leading-4 disabled:opacity-70 relative text-white"
              >
                <span>{getLanguage(LanguageKey.NEXT)}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full pb-4 px-2" />
    </div>
  );
};

export default SelectAmount;
