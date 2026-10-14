import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { useEffect, useState } from "react";
import {
  setShowForgotPasswordModal,
  setShowLoginModal,
} from "../../../redux/features/global/globalSlice";

import { Settings } from "../../../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../../redux/features/auth/authApi";

import images from "../../../assets/images";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const ForgotPassword = () => {
  const { getLanguage } = useLanguage();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState({});
  const [getOTP] = useGetOtpMutation();
  const { register, handleSubmit } = useForm();
  const { logo } = useLogo();
  const [counter, setCounter] = useState(null);

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  const handleOTP = async () => {
    if (mobile.length > 0) {
      const res = await getOTP({ mobile }).unwrap();

      if (res?.success) {
        setCounter(60);
        setOrder({
          orderId: res?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(res?.result?.message);
      } else {
        toast.error(res?.error?.errorMessage);
      }
    }
  };

  const onSubmit = async (data) => {
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();
    if (result.success) {
      toast.success("Password updated successfully");
      closeModal();
      dispatch(setShowLoginModal(true));
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
    }
  };

  const closeModal = () => {
    dispatch(setShowForgotPasswordModal(false));
  };

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else {
      setCounter(null);
    }
  }, [counter]);

  return (
    <div data-v-27945482 className="login-model-pop-up-sec">
      <div
        data-v-27945482
        className="modal fade show"
        id="register-btn"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-modal="true"
        role="dialog"
        style={{
          display: "block",
          background: "none",
          padding: "0px",
        }}
      >
        <div
          data-v-27945482
          className="modal-dialog modal-dialog-centered"
          style={{ minHeight: "100vh", margin: "0px auto", width: "100%" }}
        >
          <div
            data-v-27945482
            className="modal-content"
            style={{
              border: "none",
              background: "none",
              minHeight: "100vh",
              borderRadius: "0px",
            }}
          >
            <button
              onClick={closeModal}
              data-v-27945482
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i data-v-27945482 className="fa-solid fa-xmark" />
            </button>
            <div
              data-v-27945482
              className="modal-body"
              style={{ padding: "0px" }}
            >
              <ModalWrapper setModal={setShowForgotPasswordModal} redux={true}>
                <div
                  data-v-27945482
                  className="login-body-sec"
                  style={{
                    backgroundImage: "url(/icon/login-back-1.jpg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    alignItems: "center",
                    minHeight: "100vh",
                  }}
                >
                  <div
                    data-v-27945482
                    className="login-body-lft"
                    style={{ padding: "10%" }}
                  >
                    <div data-v-27945482 className="login-header">
                      <h2
                        style={{ display: "flex", justifyContent: "center" }}
                        data-v-27945482
                        className="modal-title"
                        id="exampleModalLabel"
                      >
                        <img
                          data-v-27945482
                          loading="lazy"
                          src={logo}
                          alt="logo"
                        />
                      </h2>
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      data-v-27945482
                      className="forget-login"
                    >
                      <div data-v-27945482 className="login-now">
                        <div data-v-27945482 className="login-flow-heading" />
                        <div data-v-27945482 id="msgFromServer" />
                        <input data-v-27945482 type="hidden" id="csrf-token" />
                        <div
                          data-v-27945482
                          className="number-var mak-gin mb-2.5"
                        >
                          <div data-v-27945482 className="row g-2">
                            <div
                              data-v-27945482
                              className="col-12 col-sm-12 col-md-12"
                            >
                              <div data-v-27945482 className="whatsup-sec">
                                <div
                                  data-v-27945482
                                  className="input-left phone-no-field"
                                >
                                  <div
                                    data-v-27945482
                                    className="country-code-flag-top-wrapper"
                                  >
                                    <div
                                      data-v-27945482
                                      className="country-code-flag-top-sec"
                                    >
                                      <img
                                        data-v-27945482
                                        src="https://flagcdn.com/in.svg"
                                      />{" "}
                                      <span data-v-27945482>+91</span>
                                      <i
                                        data-v-27945482
                                        className="fa-solid fa-caret-down"
                                      />
                                    </div>
                                  </div>
                                  <input
                                    onChange={handleMobileNo}
                                    data-v-27945482
                                    type="tel"
                                    maxLength={10}
                                    className="form-control"
                                    id="mobile"
                                    placeholder="Enter Mobile Number*"
                                    required
                                  />
                                  {counter > 0 ? (
                                    <div
                                      data-v-27945482
                                      className="register-get-otp right-side"
                                    >
                                      <button
                                        style={{ cursor: "text" }}
                                        data-v-27945482
                                        type="button"
                                        id="otp-btn"
                                        className="thm-btn thm-boder-btn otp-btn text-right"
                                      >
                                        <span
                                          data-v-27945482
                                          style={{ textTransform: "initial" }}
                                        >
                                          Resend OTP in 00:{counter}s
                                        </span>
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      data-v-27945482
                                      className="register-get-otp right-side"
                                    >
                                      <button
                                        onClick={handleOTP}
                                        data-v-27945482
                                        type="button"
                                        id="otp-btn"
                                        className={`thm-btn thm-boder-btn otp-btn text-right ${
                                          mobile?.length < 10
                                            ? "disabled-btn"
                                            : ""
                                        }`}
                                        disabled={mobile?.length < 10}
                                      >
                                        <span data-v-27945482>
                                          {getLanguage(LanguageKey.GET_OTP)}
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div data-v-27945482 className="mak-gin password-inpt">
                          <div data-v-27945482 className="phone-no-field">
                            <input
                              {...register("otp", { required: true })}
                              data-v-27945482
                              type="text"
                              className="form-control toggle-password"
                              placeholder="Enter OTP*"
                            />
                          </div>
                        </div>
                        <div data-v-27945482 className="mak-gin password-inpt">
                          <div data-v-27945482 className="phone-no-field">
                            <input
                              data-v-27945482
                              type={showPassword ? "text" : "password"}
                              className="form-control toggle-password"
                              id="password"
                              placeholder="Enter Password*"
                              aria-describedby="password"
                            />
                            <div data-v-27945482 className="score-hide-show">
                              <img
                                onClick={() => setShowPassword((prev) => !prev)}
                                data-v-27945482
                                loading="lazy"
                                className="score-hide-icon"
                                src={
                                  showPassword ? images.eyeShow : images.eyeHide
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div data-v-27945482 className="mak-gin password-inpt">
                          <div data-v-27945482 className="phone-no-field">
                            <input
                              {...register("confirmPassword", {
                                required: true,
                              })}
                              data-v-27945482
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control toggle-password"
                              id="confirm_password"
                              placeholder="Enter Confirm Password*"
                              maxLength={20}
                              aria-describedby="password"
                            />
                            <div data-v-27945482 className="score-hide-show">
                              <img
                                onClick={() =>
                                  setShowConfirmPassword((prev) => !prev)
                                }
                                data-v-27945482
                                loading="lazy"
                                className="score-hide-icon"
                                src={
                                  showConfirmPassword
                                    ? images.eyeShow
                                    : images.eyeHide
                                }
                                alt="img"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          data-v-27945482
                          className="login-cmn-btn login-demo-btn"
                        >
                          <button
                            data-v-27945482
                            type="submit"
                            className="thm-but"
                            id="submitBtn"
                          >
                            <span data-v-27945482>
                              {" "}
                              {getLanguage(LanguageKey.CHANGE_PASSWORD)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </ModalWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
