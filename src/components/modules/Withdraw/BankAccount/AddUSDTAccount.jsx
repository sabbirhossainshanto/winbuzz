import { useEffect, useState } from "react";
import { useBankAccountMutation } from "../../../../redux/features/deposit/event.api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../../lib/AxiosSecure";
import { API, Settings } from "../../../../api";
import { jwtDecode } from "jwt-decode";
import useLanguage from "../../../../hooks/use-language";
import { LanguageKey } from "../../../../const";

const AddUSDTAccount = ({ setTab, refetchBankAccounts }) => {
  const { getLanguage } = useLanguage();
  const [addNewUSDTAccount] = useBankAccountMutation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [usdtDetails, setUsdtDetails] = useState({
    otp: "",
    usdt_type: "",
    wallet_address: "",
  });

  /* Handle add bank function */
  const handleAddBank = async (e) => {
    e.preventDefault();

    if (mobile && !usdtDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }
    /* generating random token for post data */

    let payload = {
      wallet_address: usdtDetails.wallet_address,
      usdt_type: usdtDetails.usdt_type,
      type: "addUSDTAccount",
    };
    if (mobile) {
      payload.mobile = mobile;
      payload.otp = usdtDetails.otp;
      payload.orderId = orderId;
    }

    const res = await addNewUSDTAccount(payload).unwrap();
    if (res?.success) {
      setUsdtDetails({
        otp: "",
        usdt_type: "",
        wallet_address: "",
      });
      toast.success(res?.result?.message);
      setTab("oldAccount");
      refetchBankAccounts();
      window.scrollTo(0, 0);
    } else {
      toast.error(res?.result?.message);
    }
  };

  const validateForm = (usdtDetails) => {
    const isUSDTTypeFilled = usdtDetails.usdt_type.trim() !== "";
    const isWalletAddressFilled = usdtDetails.wallet_address.trim() !== "";
    const isOTPFilled = mobile ? usdtDetails.otp.trim() !== "" : true;
    const isFormValid =
      isUSDTTypeFilled && isWalletAddressFilled && isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(usdtDetails);
  }, [usdtDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);

      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  // const getOtpOnWhatsapp = async () => {
  //   const otpData = {
  //     mobile: mobile,
  //     type: "otpsend",
  //   };

  //   const res = await AxiosSecure.post(API.otpless, otpData);
  //   const data = res.data;

  //   if (data?.success) {
  //     toast.success(data?.result?.message);
  //   } else {
  //     toast.error(data?.error?.errorMessage);
  //   }
  // };
  return (
    <form onSubmit={handleAddBank} className="w-full font ">
      <div className="rounded-lg   py-2 px-3.5 flex flex-col items-start justify-start w-full gap-y-0.5">
        <div className="flex flex-col w-full">
          <div className="ml-1 text-sm">
            {getLanguage(LanguageKey.USDT_TYPE)}{" "}
            <span className="text-rose-500">*</span>
          </div>
          <div className="flex items-center w-full   py-2 px-2 rounded-lg border gap-x-10">
            <div className="flex items-center gap-x-2">
              <p>BEP20</p>
              <input
                name="usdt-type"
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    usdt_type: e.target.value,
                  });
                }}
                type="radio"
                placeholder="Enter Wallet Address"
                className="pr-2"
                value="BEP20"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <p>TRC20</p>
              <input
                name="usdt-type"
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    usdt_type: e.target.value,
                  });
                }}
                type="radio"
                placeholder="Enter Wallet Address"
                className="pr-2"
                value="TRC20"
              />
            </div>
          </div>
          <div className="flex items-start w-full justify-between leading-normal px-1">
            <div className="w-max min-h-[18px] h-max" />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="ml-1 text-sm">
            {getLanguage(LanguageKey.WALLET_ADDRESS)}{" "}
            <span className="text-rose-500">*</span>
          </div>
          <div className="flex items-center w-full  w-full py-2 px-2 rounded-lg border">
            <input
              onChange={(e) => {
                setUsdtDetails({
                  ...usdtDetails,
                  wallet_address: e.target.value,
                });
              }}
              className="text-sm px-1 flex-grow min-w-0 border-none focus:outline-none bg-transparent"
              placeholder="Enter Wallet Address"
              aria-label="Account Name"
              id="accountName"
              type="text"
              value={usdtDetails.wallet_address}
            />
          </div>
          <div className="flex items-start w-full justify-between leading-normal px-1">
            <div className="w-max min-h-[18px] h-max" />
          </div>
        </div>
        {mobile && Settings.otp && (
          <div className="flex flex-col w-full">
            <div className="ml-1 text-sm">
              {getLanguage(LanguageKey.MOBILE_NUMBER)}{" "}
              <span className="text-rose-500">*</span>
            </div>
            <div className="flex items-center w-full  w-full py-2 px-2 rounded-lg border">
              <input
                readOnly
                className="text-sm px-1 flex-grow min-w-0 border-none focus:outline-none bg-transparent"
                placeholder="Enter Mobile No"
                aria-label="Account Name"
                id="accountName"
                type="text"
                value={mobile}
              />{" "}
              <div className="w-max">
                {timer ? (
                  <button
                    onClick={getOtp}
                    className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-bg_Primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer"
                    type="button"
                  >
                    <span className=" ">
                      {getLanguage(LanguageKey.RETRY_IN)} {timer}
                    </span>
                    {/* <span className="shimmer"></span> */}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* {Settings.otpWhatsapp && (
                      <button
                        onClick={getOtpOnWhatsapp}
                        className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-bg_Primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer bg-primary"
                        type="button"
                      >
                        <span className="">Get OTP Whatsapp</span>
                        <span className="shimmer"></span>
                      </button>
                    )} */}

                    <button
                      onClick={getOtp}
                      className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-bg_Primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer bg-primary"
                      type="button"
                    >
                      <span className="">
                        {getLanguage(LanguageKey.GET_OTP_ON_MESSAGE)}
                      </span>
                      <span className="shimmer"></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-start w-full justify-between leading-normal px-1">
              <div className="w-max min-h-[18px] h-max" />
            </div>
          </div>
        )}
        {mobile && Settings.otp && (
          <div className="flex flex-col w-full">
            <div className="ml-1 text-sm">
              {getLanguage(LanguageKey.OTP)}{" "}
              <span className="text-rose-500">*</span>
            </div>
            <div className="flex items-center w-full  w-full py-2 px-2 rounded-lg border">
              <input
                maxLength={6}
                onChange={(e) => {
                  setUsdtDetails({
                    ...usdtDetails,
                    otp: e.target.value,
                  });
                }}
                className="text-sm px-1 flex-grow min-w-0 border-none focus:outline-none bg-transparent"
                placeholder="Enter OTP"
                aria-label="Account Name"
                id="accountName"
                type="text"
                value={usdtDetails.otp}
              />{" "}
              <div className="w-max"></div>
            </div>
            <div className="flex items-start w-full justify-between leading-normal px-1">
              <div className="w-max min-h-[18px] h-max" />
            </div>
          </div>
        )}
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
            <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4   transition-opacity peer-checked:opacity-100">
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
          <span className="underline text-sm text-primary font-[400] leading-4 cursor-pointer">
            the terms of payment and withdrawal policy.
          </span>
        </span>
      </div>
      <div className="w-full sticky bottom-0 left-0 pb-2 app-bg pt-2">
        <button
          disabled={!isFormValid}
          className="relative overflow-hidden bg-primary w-full  h-10 text-base shadow-lg rounded-md font-[600] leading-4 disabled:opacity-70 flex gap-x-1 items-center justify-center text-primary"
          type="submit"
        >
          <span>{getLanguage(LanguageKey.SUBMIT)}</span>
        </button>
      </div>
    </form>
  );
};

export default AddUSDTAccount;
