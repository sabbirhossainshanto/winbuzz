import { useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../assets/images";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const ChangePassword = () => {
  const { getLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [handleChangePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
      nonce: crypto.randomUUID(),
    };

    const res = await handleChangePassword(payload).unwrap();
    if (res.success) {
      localStorage.removeItem("changePassword");
      toast.success(res?.result?.message);
      navigate("/");
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-e3bafc35 className="profile-change-password-wrapper">
          <div data-v-e3bafc35 className="heading__title">
            {getLanguage(LanguageKey.CHANGE_PASSWORD)}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            data-v-e3bafc35
            className="profile-change-password-sec"
          >
            <div data-v-e3bafc35 className="row">
              <div
                data-v-e3bafc35
                className="col-12 col-sm-12 col-md-9 col-lg-9"
              >
                <div data-v-e3bafc35 className="password-rgt">
                  <input
                    {...register("password", { required: true })}
                    data-v-e3bafc35
                    type={!showPassword ? "password" : "text"}
                    autoComplete="current-password"
                    className="form-control"
                    placeholder="Enter Old Password*"
                  />
                  <div data-v-e3bafc35 className="score-hide-show">
                    <img
                      onClick={() => setShowPassword((prev) => !prev)}
                      data-v-e3bafc35
                      loading="lazy"
                      className="score-hide-icon"
                      src={showPassword ? images.eyeShow : images.eyeHide}
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div
                data-v-e3bafc35
                className="col-12 col-sm-12 col-md-9 col-lg-9"
              >
                <div data-v-e3bafc35 className="password-rgt">
                  <input
                    {...register("newPassword", {
                      required: true,
                    })}
                    data-v-e3bafc35
                    autoComplete="new-password"
                    type={!showNewPass ? "password" : "text"}
                    className="form-control"
                    placeholder="Enter New Password*"
                  />
                  <div data-v-e3bafc35 className="score-hide-show">
                    <img
                      onClick={() => setShowNewPass((prev) => !prev)}
                      data-v-e3bafc35
                      loading="lazy"
                      className="score-hide-icon"
                      src={showNewPass ? images.eyeShow : images.eyeHide}
                      alt="img"
                    />
                  </div>
                </div>
              </div>
              <div
                data-v-e3bafc35
                className="col-12 col-sm-12 col-md-9 col-lg-9"
              >
                <div data-v-e3bafc35 className="password-rgt">
                  <input
                    {...register("newPasswordConfirm", {
                      required: true,
                    })}
                    data-v-e3bafc35
                    type={!showConfirmPass ? "password" : "text"}
                    autoComplete="new-password"
                    className="form-control"
                    placeholder="Enter Confirm New Password*"
                  />
                  <div data-v-e3bafc35 className="score-hide-show">
                    <img
                      onClick={() => setShowConfirmPass((prev) => !prev)}
                      data-v-e3bafc35
                      loading="lazy"
                      className="score-hide-icon"
                      src={showConfirmPass ? images.eyeShow : images.eyeHide}
                      alt="img"
                    />
                  </div>
                </div>
              </div>

              <div
                data-v-e3bafc35
                style={{ textAlign: "left" }}
                className="stack-save-btn change-passwword-btn"
              >
                <button
                  style={{ width: "100px" }}
                  data-v-e3bafc35
                  type="submit"
                  className="cmn-btn"
                >
                  {getLanguage(LanguageKey.SAVE)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
