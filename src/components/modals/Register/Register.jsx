import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { Fragment, useEffect, useState } from "react";
import {
  setShowBanner,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { Settings } from "../../../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  useGetOtpMutation,
  useRegisterMutation,
} from "../../../redux/features/auth/authApi";
import { setUser } from "../../../redux/features/auth/authSlice";
import images from "../../../assets/images";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";
import { FaRegUser } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

const Register = () => {
  const [tab, setTab] = useState(
    Settings.registration_mobile ? "mobile" : "username",
  );
  const { getLanguage } = useLanguage();
  const affnook_token = localStorage.getItem("affnook_token");
  const { logo } = useLogo();
  const [countDown, setCountDown] = useState(null);
  const referralCode = localStorage.getItem("referralCode");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getOTP] = useGetOtpMutation();
  const [handleRegister] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [order, setOrder] = useState({});

  const closeModal = () => {
    dispatch(setShowRegisterModal(false));
  };

  const showLogin = () => {
    closeModal();
    dispatch(setShowLoginModal(true));
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }
  }, [countDown]);

  const handleOTP = async () => {
    const res = await getOTP({ mobile }).unwrap();
    if (res?.success) {
      setCountDown(45);
      setOrder({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: data?.username,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: order.orderId,
      otpMethod: order.otpMethod,
      affnook_token: affnook_token || null,
      registration_mobile: Settings.registration_mobile,
      registration_username: Settings.registration_username,
    };

    const result = await handleRegister(registerData).unwrap();

    if (result.success) {
      if (window?.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: "User Signup",
          status: "success",
        });
      }
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const memberId = result?.result?.memberId;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;
      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      localStorage.setItem("token", token);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowRegisterModal(false));
        toast.success("Register successful");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

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
        style={{ display: "block", background: "none", padding: "0px" }}
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
              <ModalWrapper setModal={setShowRegisterModal} redux={true}>
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

                        {Settings.registration_mobile &&
                          Settings.registration_username && (
                            <div
                              style={{
                                width: "100%",
                                background:
                                  "color-mix(in srgb, var(--primary-bg) 30%, transparent)",
                                marginBottom: "12px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  position: "relative",
                                  width: "100%",
                                }}
                              >
                                <div
                                  onClick={() => setTab("mobile")}
                                  style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    width: "100%",
                                    gap: "6px",
                                    color: "white",
                                    background:
                                      tab === "mobile"
                                        ? "var(--primary-bg)"
                                        : undefined,
                                  }}
                                >
                                  <FaMobileAlt />

                                  <span>
                                    {getLanguage(LanguageKey.BY_PHONE)}
                                  </span>
                                </div>

                                <div
                                  onClick={() => setTab("username")}
                                  style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "5px",
                                    width: "100%",
                                    gap: "6px",
                                    color: "white",
                                    background:
                                      tab === "username"
                                        ? "var(--primary-bg)"
                                        : undefined,
                                  }}
                                >
                                  <FaRegUser />

                                  <span>
                                    {getLanguage(LanguageKey.BY_USERNAME)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                        {tab === "mobile" && Settings.registration_mobile && (
                          <Fragment>
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
                                      {countDown > 0 ? (
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
                                              style={{
                                                textTransform: "initial",
                                              }}
                                            >
                                              Resend OTP in 00:{countDown}s
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

                            <div
                              data-v-27945482
                              className="mak-gin password-inpt"
                            >
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
                          </Fragment>
                        )}

                        {tab === "username" &&
                          Settings.registration_username && (
                            <div
                              data-v-27945482
                              className="mak-gin password-inpt"
                            >
                              <div data-v-27945482 className="phone-no-field">
                                <input
                                  {...register("username", { required: true })}
                                  data-v-27945482
                                  type="text"
                                  className="form-control toggle-password"
                                  placeholder="Enter Username*"
                                />
                              </div>
                            </div>
                          )}

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

                        <div data-v-27945482 className="mak-gin password-inpt">
                          <div data-v-27945482 className="phone-no-field">
                            <input
                              {...register("referralCode")}
                              data-v-27945482
                              type="text"
                              className="form-control toggle-password"
                              placeholder="Enter referral code(Optional)"
                              aria-describedby="password"
                              defaultValue={referralCode}
                              readOnly={referralCode}
                            />
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
                              {getLanguage(LanguageKey.REGISTER)}
                            </span>
                          </button>
                        </div>
                        {Settings?.whatsapplink &&
                          Settings.registration_whatsapp && (
                            <Fragment>
                              <div
                                data-v-27945482
                                className="login-flow-heading"
                              >
                                <p data-v-27945482>
                                  {getLanguage(
                                    LanguageKey.GET_YOUR_INSTANT_ID_FROM_WHATSAPP,
                                  )}
                                </p>
                              </div>
                              <div
                                data-v-27945482
                                className="whatsapp-btn Continue-with mt-0 pt-0 mb-0 pb-0"
                              >
                                <div
                                  data-v-27945482
                                  className="button-whatsapp mt-0 pt-0 mb-0 pb-0"
                                >
                                  <a
                                    onClick={getWhatsAppId}
                                    data-v-27945482
                                    className="btn-whatsapp"
                                    target="_blank"
                                  >
                                    <i
                                      data-v-27945482
                                      className="fa-brands fa-whatsapp"
                                    />
                                    {getLanguage(LanguageKey.WHATSAPP)}
                                  </a>
                                </div>
                              </div>
                            </Fragment>
                          )}

                        <p data-v-27945482 className="forpass-in box-right">
                          Already Have Account?{" "}
                          <a
                            data-v-27945482
                            onClick={showLogin}
                            data-bs-toggle="modal"
                          >
                            {getLanguage(LanguageKey.LOGIN)}
                          </a>
                        </p>
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

export default Register;
