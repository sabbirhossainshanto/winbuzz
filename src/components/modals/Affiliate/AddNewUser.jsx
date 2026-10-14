import { Fragment, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useIndex } from "../../../hooks";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const AddNewUser = ({ setShowAddNewUserModal }) => {
  const { getLanguage } = useLanguage();
  const { mutate: addNewUser } = useIndex();
  const [mobile, setMobile] = useState(null);
  const [timer, setTimer] = useState(null);

  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowAddNewUserModal(false);
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    selfPassword: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (mobile && !userDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new user");
    }

    let payload = {
      username: userDetails.userId,
      password: userDetails.password,
      self_password: userDetails.selfPassword,
      mobile: mobile,
      otp: userDetails.otp,
      type: "add_affiliate",
    };

    addNewUser(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          setShowAddNewUserModal(false);
        } else {
          toast.error(data?.result?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.result?.message);
      },
    });
  };

  const validateForm = (userDetails) => {
    const isMobileFilled = mobile && mobile?.trim() !== "";
    const isOTPFilled = userDetails.otp.trim() !== "";
    const isUserIdFilled = userDetails.userId.trim() !== "";
    const isPasswordFilled = userDetails.password.trim() !== "";
    const isConfirmPasswordFilled = userDetails.confirmPassword.trim() !== "";
    const isSelfPasswordFilled = userDetails.selfPassword.trim() !== "";

    const isFormValid =
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isMobileFilled &&
        isOTPFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled &&
        isMobileFilled &&
        isOTPFilled);

    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(userDetails);
  }, [userDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

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
    <Fragment>
      <div className="modal-backdrop fade show"></div>
      <div
        id="popup-modal"
        className="fixed bottom-0 left-0 right-0 top-0 overflow-hidden flex h-[100dvh] w-dvw items-center justify-center  overflow-y-hidden z-[10000]"
      >
        <div
          ref={ref}
          className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-white text-black p-2 xs:p-5 rounded-md"
        >
          <h2 className="mb-5 text-base md:text-xl font-semibold">
            {getLanguage(LanguageKey.ADD_NEW_USER)}
          </h2>
          <div
            onClick={() => setShowAddNewUserModal(false)}
            className="transition-all mb-2 ease-in-out duration-200 hover:scale-105 absolute -top-3 -right-3 text-black"
          >
            <svg
              className="cursor-pointer z-50"
              height="24"
              width="24"
              fill="var(--color-quaternary)"
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="circle-xmark"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g className="fa-duotone-group">
                <path
                  fill="currentColor"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                ></path>
                <path
                  fill="white"
                  d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="flex gap-10 items-start h-[95%] lg:h-auto w-full">
            <div
              title="mobileLogin"
              className="flex flex-col items-start gap-y-4 w-full"
            >
              <form
                onSubmit={handleAddUser}
                className="w-full gap-y-4 flex flex-col"
              >
                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.MOBILE_NUMBER)}
                    </div>
                    <div className="flex w-full items-center py-2  border-border_color_primary1  rounded-lg border">
                      <input
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            setMobile(e.target.value);
                          }
                        }}
                        id="mobile-no-input"
                        className="px-2 block w-full focus:outline-none w-full    rounded-none text-text_Ternary pr-2 text-sm xs:text-md"
                        placeholder="Phone Number"
                        type="text"
                        value={mobile}
                      />

                      <div className="w-max">
                        {timer ? (
                          <button
                            className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer"
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
                                className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer bg-primary"
                                type="button"
                              >
                                <span className="text-primary">
                                  Get OTP Whatsapp
                                </span>
                                <span className="shimmer"></span>
                              </button>
                            )} */}

                            <button
                              onClick={getOtp}
                              className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out -bold h-fit bg-primary  transition-all ease-in-out text-xs whitespace-nowrap mr-1 py-1 px-3 rounded active:scale-[0.98] active:opacity-95 disabled:bg-bg_Slate500 disabled:opacity-50 font-medium relative flex items-center justify-center cursor-pointer bg-primary"
                              type="button"
                            >
                              <span className="text-primary">
                                {getLanguage(LanguageKey.GET_OTP_ON_MESSAGE)}
                              </span>
                              <span className="shimmer"></span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.OTP)}
                    </div>
                    <div className="flex w-full items-center border p-1  border-border_color_primary1  rounded-lg mt-2">
                      <input
                        maxLength={6}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            otp: e.target.value,
                          });
                        }}
                        id="otpSignUp"
                        className="block w-full focus:outline-none w-full  rounded-none py-1 text-text_Ternary px-2 text-sm xs:text-md  "
                        placeholder="Enter OTP"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <span className="text-text_color_loginTextColor  text-sm font-medium uppercase">
                    {getLanguage(LanguageKey.OR)}
                  </span>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>

                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.USER_ID)}
                    </div>
                    <div className="flex w-full items-center py-2 px-2  border-border_color_primary1 rounded-lg border">
                      <input
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            userId: e.target.value,
                          });
                        }}
                        placeholder="Enter User Id"
                        id="password-input"
                        className="block w-full focus:outline-none w-full pr-2 rounded-none text-text_Ternary   text-sm xs:text-md"
                        value={userDetails.userId}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.PASSWORD)}
                    </div>
                    <div className="flex w-full items-center py-2 px-2   border-border_color_primary1  rounded-lg border">
                      <input
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            password: e.target.value,
                          });
                        }}
                        placeholder="Enter Password"
                        id="password-input"
                        className="block w-full focus:outline-none w-full pr-2 rounded-none text-text_Ternary   text-sm xs:text-md"
                        value={userDetails.password}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.CONFIRM_PASSWORD)}
                    </div>
                    <div className="flex w-full items-center py-2 px-2   border-border_color_primary1 rounded-lg border">
                      <input
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            confirmPassword: e.target.value,
                          });
                        }}
                        placeholder="Enter Confirm Password"
                        id="password-input"
                        className="block w-full focus:outline-none w-full pr-2 rounded-none text-text_Ternary   text-sm xs:text-md"
                        value={userDetails.confirmPassword}
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div title="passwordInput" className="w-full  uppercase">
                    <div className="text-[10px] ml-1 md:text-xs lg:text-sm">
                      {getLanguage(LanguageKey.SELF_PASSWORD)}
                    </div>
                    <div className="flex w-full items-center py-2 px-2   border-border_color_primary1 rounded-lg border">
                      <input
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            selfPassword: e.target.value,
                          });
                        }}
                        placeholder="Enter Self Password"
                        id="password-input"
                        className="block w-full focus:outline-none w-full pr-2 rounded-none text-text_Ternary   text-sm xs:text-md"
                        value={userDetails.selfPassword}
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <div id="googleRecaptcha" className="hidden"></div>
                <div title="loginButton" className="w-full">
                  <button
                    disabled={!isFormValid}
                    type="submit"
                    className="inline-block leading-normal relative overflow-hidden transition duration-150 ease-in-out w-full  bg-bg_LoginButtonColor shadow-lg rounded-md xs:text-[15px] px-5 py-2 flex items-center justify-center gap-x-2 -bold font-semibold text-base cursor-pointer bg-primary text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{getLanguage(LanguageKey.ADD_NEW_USER)}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddNewUser;
