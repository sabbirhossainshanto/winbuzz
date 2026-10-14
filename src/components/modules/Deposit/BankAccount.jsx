import { useEffect, useRef, useState } from "react";
import { useBankAccountMutation } from "../../../redux/features/deposit/event.api";
import images from "../../../assets/images";
import { FaQrcode } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import Bank from "./PaymentMethod/Bank";
import UploadTransaction from "./UploadTransaction";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import toast from "react-hot-toast";
// import { scrollToLeft, scrollToRight } from "../../../utils/scroll";
import UPI from "./PaymentMethod/UPI";
import QR from "./PaymentMethod/QR";
import USDT from "./PaymentMethod/USDT";
import PG from "./PaymentMethod/PG";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const BankAccount = ({ amount }) => {
  const { getLanguage } = useLanguage();
  const paymentMethodRef = useRef();
  const [getPaymentMethod, { data, isSuccess }] = useBankAccountMutation();
  const [methodType, setMethodType] = useState(null);
  const [depositData, setDepositData] = useState({});
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    getPaymentMethod({
      type: "depositMethods",
      amount,
    });
  }, [amount, getPaymentMethod]);

  const handleVisibleBankMethod = async (method) => {
    setMethodType(method?.type);
    setPaymentId(method?.paymentId);
    if (
      method?.type === "upigateway" ||
      method?.type === "toitgateway" ||
      method?.type === "i100gateway" ||
      method?.type === "upiclick" ||
      method?.gateway === 1
    ) {
      const depositDetailForPg = {
        paymentId: method?.paymentId,
        amount,
        method: method?.type,
      };
      const res = await AxiosSecure.post(API.pg, depositDetailForPg);
      const data = res?.data;

      if (data?.success) {
        window.location.href = data?.result?.link;
      } else {
        toast.error(data?.result?.message);
      }
    } else {
      const depositDetail = {
        type: "depositDetails",
        paymentId: method?.paymentId,
        amount,
      };

      const res = await AxiosSecure.post(API.bankAccount, depositDetail);
      const data = res?.data;
      if (data?.success) {
        if (method?.type === "whatsapp") {
          window.location.href = data?.result?.link;
        } else {
          setDepositData(data?.result);
        }
      }
    }
  };

  useEffect(() => {
    if (
      paymentMethodRef &&
      paymentMethodRef.current &&
      methodType &&
      methodType !== "upigateway" &&
      methodType !== "toitgateway" &&
      methodType !== "i100gateway" &&
      methodType !== "upiclick"
    ) {
      paymentMethodRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [methodType]);
  return (
    <div className="w-full h-full  lg:w-[54%] lg:pt-2">
      <div className="mx-2  h-full pb-10">
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full h-1" />
          <form>
            <section className="w-full bg-background rounded-md  pt-[11px]  mb-2.5">
              <p className=" text-sm font-normal px-3">You are paying:</p>
              <p className=" text-sm font-normal mt-[7px] pb-[13px] px-3">
                <span className=" text-base font-semibold leading-normal not-italic">
                  ₹{amount}
                </span>
              </p>
              <p className="bg-bg_color_quaternary py-2.5 w-full px-3 rounded-b-md font-normal  text-xs leading-normal not-italic text-primary">
                You will get
                <span className="text-primary"> ₹{amount}</span> in your main
                wallet<span>.</span>
              </p>
            </section>

            {data?.result?.length > 0 && (
              <>
                <div className="rounded-lg bg-background overflow-hidden  transition-height duration-500 ease-in-out h-max px-3 pt-[15px] pb-[20px]">
                  <div className="flex flex-row justify-end items-center w-full">
                    <span className="text-base  font-bold leading-5 w-full">
                      {getLanguage(LanguageKey.PAYMENT_METHODS)}
                      <span className=" font-normal leading-4">
                        ({data?.result?.length})
                      </span>
                    </span>
                  </div>
                  <div
                    id="payMentOptions"
                    className="flex flex-col items-center gap-y-2 pt-[18px] pb-[8px] overflow-x-auto no-scrollbar scroll-smooth cursor-pointer w-full transition-all ease-in-out duration-150"
                  >
                    {[...data.result]
                      .sort((a, b) => a?.sort - b?.sort)
                      ?.map((method) => (
                        <div
                          key={method?.paymentId}
                          onClick={() => handleVisibleBankMethod(method)}
                          className={`flex justify-between   gap-y-2 rounded-[10px] bg-transparent py-2 w-full px-2  md:px-4  relative     ${
                            method?.paymentId === paymentId
                              ? "border-primary"
                              : "border border-gray-400"
                          }`}
                        >
                          <div className="flex flex-col gap-y-2">
                            <span className="text-xs  font-medium truncate w-full uppercase ">
                              {method?.title}
                            </span>
                            <span className="text-xs  font-medium truncate w-full">
                              {method?.type}
                            </span>
                          </div>

                          <div className=" ">
                            {method?.type == "qr" && (
                              <FaQrcode size={25} color="gray" />
                            )}
                            {method?.type == "bank" && (
                              <CiBank size={25} color="gray" />
                            )}
                            {method?.type == "upi" ||
                            method?.type == "pg" ||
                            method?.gateway === 1 ? (
                              <img
                                style={{ height: "25px", width: "25px" }}
                                src={"/icon/upi.png"}
                              />
                            ) : null}
                            {method?.type == "usdt" ? (
                              <img
                                style={{ height: "25px", width: "25px" }}
                                src={"/icon/trc20.svg"}
                              />
                            ) : null}
                            {method?.type == "usdt_bep20" ? (
                              <img
                                style={{ height: "25px", width: "25px" }}
                                src={"/icon/bep20.svg"}
                              />
                            ) : null}

                            {method?.type == "whatsapp" ? (
                              <img
                                style={{ height: "25px", width: "25px" }}
                                src={images.whatsApp}
                              />
                            ) : null}
                            {method?.type == "upigateway" ||
                            method?.type === "toitgateway" ||
                            method?.type === "i100gateway" ||
                            method?.type === "upiclick" ? (
                              <img
                                style={{ height: "25px", width: "25px" }}
                                src={images.bhim}
                              />
                            ) : null}
                          </div>
                        </div>
                      ))}
                  </div>
                  <p className="text-xs md:text-sm pt-2  font-normal leading-4">
                    1. Deposit money only in the below available accounts to get
                    the fastest credits and avoid possible delays.
                  </p>
                  <p className="text-text_color_tertiary1 pt-1 font-sans text-xs md:text-sm font-normal cursor-pointer">
                    See More..
                  </p>
                </div>
                {/* Payment Method */}
                <div ref={paymentMethodRef}>
                  {methodType === "bank" && (
                    <Bank amount={amount} depositData={depositData} />
                  )}
                  {methodType === "upi" && (
                    <UPI amount={amount} depositData={depositData} />
                  )}
                  {methodType === "qr" && (
                    <QR amount={amount} depositData={depositData} />
                  )}
                  {methodType === "usdt" || methodType === "usdt_bep20" ? (
                    <USDT amount={amount} depositData={depositData} />
                  ) : null}
                  {methodType === "pg" && (
                    <PG amount={amount} depositData={depositData} />
                  )}
                </div>
                <UploadTransaction
                  paymentId={paymentId}
                  amount={amount}
                  methodType={methodType}
                />
              </>
            )}

            {data?.result?.length === 0 && isSuccess && (
              <div className="w-full flex items-center justify-center text-white lg:mt-20">
                {getLanguage(LanguageKey.NO_PAYMENT_METHOD_AVAILABLE_RIGHT_NOW)}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
