import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { setUser } from "../../../redux/features/auth/authSlice";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import toast from "react-hot-toast";
import { useLogo } from "../../../context/ApiProvider";
import images from "../../../assets/images";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const Login = () => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state?.global);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
      nonce: crypto.randomUUID(),
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        dispatch(setShowLoginModal(false));
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
      apk: closePopupForForever ? true : false,
      nonce: crypto.randomUUID(),
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const showRegister = () => {
    closeLoginModal();
    dispatch(setShowRegisterModal(true));
  };

  const showForgotPassword = () => {
    closeLoginModal();
    dispatch(setShowForgotPasswordModal(true));
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div data-v-b55734cb className="login-model-pop-up-sec login-model-popup">
      <div
        data-v-b55734cb
        className="modal fade show"
        id="login-btn"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        aria-modal="true"
        role="dialog"
        style={{
          display: "block",
          background: "none",
          padding: "0px",
        }}
      >
        <div
          data-v-b55734cb
          className="modal-dialog modal-dialog-centered"
          style={{ minHeight: "100vh", margin: "0px auto", width: "100%" }}
        >
          <div
            data-v-b55734cb
            className="modal-content"
            style={{
              border: "none",
              background: "none",
              minHeight: "100vh",
              borderRadius: "0px",
            }}
          >
            <button
              onClick={closeLoginModal}
              data-v-b55734cb
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i data-v-b55734cb className="fa-solid fa-xmark" />
            </button>
            <div
              data-v-b55734cb
              className="modal-body"
              style={{ padding: "0px" }}
            >
              <ModalWrapper setModal={setShowLoginModal} redux={true}>
                <div
                  data-v-b55734cb
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
                    data-v-b55734cb
                    className="login-body-lft"
                    style={{ padding: "10%" }}
                  >
                    <div
                      data-v-b55734cb
                      className="login-header"
                      style={{ marginBottom: "10px" }}
                    >
                      <h2
                        style={{ display: "flex", justifyContent: "center" }}
                        data-v-b55734cb
                        className="modal-title"
                        id="exampleModalLabel"
                      >
                        <img
                          data-v-b55734cb
                          loading="lazy"
                          src={logo}
                          alt="logo"
                        />
                      </h2>
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      data-v-b55734cb
                      className="login-form"
                    >
                      <div data-v-b55734cb className="input-field">
                        <div data-v-b55734cb className="row g-2">
                          <div
                            data-v-b55734cb
                            className="col-12 col-sm-12 col-md-12"
                          >
                            <div data-v-b55734cb className="input-left">
                              <input
                                {...register("username")}
                                data-v-b55734cb
                                type="text"
                                className="form-control"
                                placeholder="Username"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div data-v-b55734cb className="int-container-box">
                        <div data-v-b55734cb className="forgot-password-field">
                          <input
                            style={{ paddingLeft: "4px" }}
                            {...register("password", { required: true })}
                            data-v-b55734cb
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="form-control"
                          />

                          <div data-v-b55734cb className="otp-login-btn"></div>

                          <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            data-v-b55734cb
                            className="score-hide-show"
                          >
                            <img
                              data-v-b55734cb
                              loading="lazy"
                              className="score-hide-icon"
                              src={
                                showPassword ? images.eyeShow : images.eyeHide
                              }
                              alt="img"
                            />
                          </div>
                        </div>
                      </div>
                      <div data-v-b55734cb className="check-box-sec">
                        <div data-v-b55734cb className="box-right">
                          <a
                            style={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                            data-v-b55734cb
                            onClick={showForgotPassword}
                            data-bs-toggle="modal"
                          >
                            {getLanguage(LanguageKey.FORGOT_PASSWORD)}?
                          </a>
                        </div>
                      </div>
                      <div
                        data-v-b55734cb
                        className="login-cmn-btn login-demo-btn"
                        style={{ flexDirection: "column", gap: "10px" }}
                      >
                        <button
                          style={{ color: "white" }}
                          data-v-b55734cb
                          type="submit"
                        >
                          <span data-v-b55734cb>
                            {" "}
                            {getLanguage(LanguageKey.LOGIN)}
                          </span>
                        </button>
                        {Settings.demo_login && (
                          <button
                            style={{ color: "white" }}
                            onClick={loginWithDemo}
                            data-v-b55734cb
                            type="button"
                          >
                            <span data-v-b55734cb>
                              {getLanguage(LanguageKey.DEMO_LOGIN)}
                            </span>
                          </button>
                        )}
                      </div>
                      {Settings.apk_link && (
                        <div
                          data-v-b55734cb
                          className="login-cmn-btn download-apk-btn"
                        >
                          <a
                            style={{ gap: "0px 10px" }}
                            onClick={handleDownload}
                            data-v-b55734cb
                            className="apk-download-anchor"
                          >
                            <span data-v-b55734cb>
                              {getLanguage(LanguageKey.DOWNLOAD_APK)}
                            </span>
                            <img
                              data-v-b55734cb
                              src="/icon/apk_icon-CKpATu5s.svg"
                            />
                          </a>
                        </div>
                      )}

                      <div data-v-b55734cb className="Continue-with">
                        {Settings?.whatsapplink &&
                          Settings.registration_whatsapp && (
                            <Fragment>
                              <div
                                data-v-b55734cb
                                className="login-flow-heading pb-0"
                              >
                                <p data-v-b55734cb>
                                  {getLanguage(
                                    LanguageKey.GET_YOUR_INSTANT_ID_FROM_WHATSAPP,
                                  )}
                                </p>
                              </div>
                              <div data-v-b55734cb className="button-whatsapp">
                                <a
                                  data-v-b55734cb
                                  onClick={() =>
                                    getWhatsAppId(Settings?.whatsapplink)
                                  }
                                  className="btn-whatsapp"
                                >
                                  <i
                                    data-v-b55734cb
                                    className="fa-brands fa-whatsapp"
                                  />{" "}
                                  {getLanguage(LanguageKey.WHATSAPP)}
                                </a>
                              </div>
                            </Fragment>
                          )}

                        {/* <span data-v-b55734cb className="or-separate">
                          OR
                        </span>
                        <h3 data-v-b55734cb className="whats-with">
                          Login With
                        </h3>
                        <div data-v-b55734cb className="login-with-social">
                          <ul data-v-b55734cb className="cmn-ul-list">
                            <li data-v-b55734cb>
                              <a data-v-b55734cb>
                                <img
                                  data-v-b55734cb
                                  loading="lazy"
                                  src="/icon/telegram-a01fJV7_.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li data-v-b55734cb>
                              <a data-v-b55734cb>
                                <img
                                  data-v-b55734cb
                                  loading="lazy"
                                  src="/icon/instagram-CBwtwdWl.png"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li data-v-b55734cb>
                              <a data-v-b55734cb>
                                <img
                                  data-v-b55734cb
                                  loading="lazy"
                                  src="/icon/facebook-ZNZi6boh.png"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                      <div data-v-b55734cb className="acc-and-join-sec">
                        <span data-v-b55734cb>Don&apos;t Have An Account?</span>{" "}
                        <span data-v-b55734cb>
                          <a
                            className="text-primary underline"
                            onClick={showRegister}
                            data-v-b55734cb
                            data-bs-toggle="modal"
                          >
                            {getLanguage(LanguageKey.REGISTER)}
                          </a>
                        </span>
                      </div>
                      <div data-v-b55734cb className="login-footer-logo">
                        <img
                          data-v-b55734cb
                          src="/icon/game-care-C32-PadK.svg"
                          className="footer-logo"
                        />
                        <img
                          data-v-b55734cb
                          src="/icon/restricted-regions-logo-BrkaTLIP.svg"
                          className="footer-logo"
                        />
                        <img
                          data-v-b55734cb
                          src="/icon/underage-logo-NqR90Ywe.svg"
                          className="footer-logo"
                        />
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

export default Login;
