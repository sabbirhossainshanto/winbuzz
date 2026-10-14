import { useNavigate } from "react-router-dom";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Fragment } from "react";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const EditStake = () => {
  const { getLanguage } = useLanguage();
  const [editButtonValue] = useEditButtonValuesMutation();
  const navigate = useNavigate();
  const stakes = JSON.parse(localStorage.getItem("buttonValue"));
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      buttonGameValues: stakes,
    },
  });

  const buttonGameValues = watch("buttonGameValues");

  const onSubmit = async () => {
    const payload = {
      game: buttonGameValues?.map((btn) => ({
        label: parseFloat(btn?.label),
        value: parseFloat(btn?.value),
      })),
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonGameValues;
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div className="profile-change-password-wrapper stake-setting-wrapper">
          <div className="heading__title">
            {getLanguage(LanguageKey.STAKE_SETTINGS)}
          </div>
          <div className="profile-change-password-sec">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="profile-stack-section"
            >
              <div className="app-stack-setting-section">
                {stakes?.map((state, idx) => {
                  return (
                    <Fragment key={idx}>
                      <div className="stack-md-inpt-group">
                        {/* <label>Button Name</label> */}
                        <input
                          {...register(`buttonGameValues.${idx}.label`)}
                          maxLength={8}
                          placeholder={`Stake Name ${idx}`}
                          className="form-control"
                        />
                      </div>
                      <div className="stack-md-inpt-group">
                        {/* <label>Button Value</label> */}
                        <input
                          {...register(`buttonGameValues.${idx}.value`)}
                          maxLength={8}
                          placeholder={`Stake Value ${idx}`}
                          className="form-control"
                        />
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div className="stack-save-btn change-passwword-btn">
                <button type="submit">{getLanguage(LanguageKey.UPDATE)}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStake;
