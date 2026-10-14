import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBalance from "../../../hooks/balance";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";
import ModalWrapper from "../../modals/ModalWrapper/ModalWrapper";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { Settings } from "../../../api";
import { LanguageKey } from "../../../const";
import useLanguage from "../../../hooks/use-language";

const Dropdown = () => {
  const { getLanguage } = useLanguage();
  const { closePopupForForever } = useSelector((state) => state?.global);
  const dispatch = useDispatch();
  const { data } = useBalance();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, memberId } = useSelector((state) => state.auth);

  const closeDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <li data-v-9dda4895>
      <ModalWrapper setModal={setShowDropdown}>
        <div data-v-9dda4895 className="dropdown open-menu-btn">
          <button
            style={{ minWidth: "40px" }}
            onClick={closeDropdown}
            data-v-9dda4895
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span data-v-9dda4895 className="user-images">
              <img
                data-v-9dda4895
                className="user-profile-btn__icon"
                src="/icon/mobile-user-icon-QyVL-tME.png"
                alt=""
              />
            </span>
            <span data-v-9dda4895 className="desktop-user-name">
              {user}
            </span>
          </button>
          <ul
            data-v-9dda4895
            className={`dropdown-menu ${showDropdown ? "show" : ""}`}
            aria-labelledby="dropdownMenuButton1"
            style={{
              zIndex: 99999,
              position: "absolute",
              inset: "0px 0px auto auto",
              margin: "0px",
              transform: "translate3d(5px, 25.8333px, 0px)",
            }}
            data-popper-placement="bottom-end"
          >
            <li data-v-9dda4895 className="header-userid">
              <a data-v-9dda4895 to="javascript:void(0);">
                <div data-v-9dda4895 className="header-copy-icon">
                  <h5 data-v-9dda4895>{memberId}</h5>
                  <button
                    onClick={() => handleCopyToClipBoard(memberId)}
                    data-v-9dda4895
                    type="button"
                    className="copy-btn"
                  >
                    <i data-v-9dda4895 className="fa-solid fa-copy" />
                  </button>
                </div>
              </a>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <div data-v-9dda4895 className="displayName-wrap">
                <h3 data-v-9dda4895 className="displayName-title">
                  {getLanguage(LanguageKey.USERNAME)} :
                </h3>
                <span data-v-9dda4895 className="displayName-name">
                  {user}
                </span>
                {/* <span data-v-9dda4895 className="displayName-edit">
                <img
                  data-v-9dda4895
                  loading="lazy"
                  src="/icon/edit-icon-BO4-FlBr.svg"
                  alt="edit-icon"
                />
              </span> */}
              </div>
            </li>

            <li data-v-9dda4895 className="bonus-information-bx">
              <div data-v-9dda4895 className="bonus-sec">
                <div
                  data-v-9dda4895
                  className="credits-list blanace-exposure-bx"
                >
                  <div data-v-9dda4895 className="credits-list-con blanace-bx">
                    <h5 data-v-9dda4895>
                      {getLanguage(LanguageKey.WALLET_AMOUNT)}
                    </h5>
                    <h6 data-v-9dda4895>₹{data?.availBalance}</h6>
                  </div>
                  <div data-v-9dda4895 className="credits-list-con exposure-bx">
                    <h5 data-v-9dda4895>
                      {getLanguage(LanguageKey.NET_EXPOSURE)}
                    </h5>
                    <h6 data-v-9dda4895>{data?.deductedExposure}</h6>
                  </div>
                </div>
                {Settings?.referral && (
                  <div data-v-9dda4895 className="bonusBx-wrap">
                    <div
                      data-v-9dda4895
                      className="credits-chackn-box refer-ean-btn"
                    >
                      <Link
                        data-v-9dda4895
                        onClick={closeDropdown}
                        to="/affiliate"
                        className="cmn-btn"
                      >
                        {getLanguage(LanguageKey.REFER_AND_EARN)}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </li>

            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/deposit"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.DEPOSIT)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/withdraw"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.WITHDRAW)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/deposit-report"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.DEPOSIT_STATEMENT)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/withdraw-report"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.WITHDRAW_STATMENT)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/my-bank-details"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.MY_BANK_DETAILS)}
                </span>
              </Link>
            </li>

            {Settings?.referral && (
              <li data-v-9dda4895 className="menu-rgt-icons">
                <Link
                  data-v-9dda4895
                  onClick={closeDropdown}
                  to="/affiliate"
                  className="dropdown-item"
                >
                  <i
                    style={{ color: "#000" }}
                    data-v-9dda4895
                    className="fa-solid fa-users-rays"
                  />
                  <span data-v-9dda4895 className="menu-rgt-text">
                    {getLanguage(LanguageKey.AFFILIATE)}
                  </span>
                </Link>
              </li>
            )}

            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/bonus-statement"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.BONUS_STATEMENT)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/promotions"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.PROMOTION_AND_BONUSES)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/lossback-bonus"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-users-rays"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.LOSSBACK_BONUS)}
                </span>
              </Link>
            </li>
            {closePopupForForever && (
              <li data-v-9dda4895 className="menu-rgt-icons">
                <Link
                  data-v-9dda4895
                  onClick={closeDropdown}
                  to="/app-only-bonus"
                  className="dropdown-item"
                >
                  <i
                    style={{ color: "#000" }}
                    data-v-9dda4895
                    className="fa-solid fa-users-rays"
                  />
                  <span data-v-9dda4895 className="menu-rgt-text">
                    {getLanguage(LanguageKey.APP_ONLY_BONUS)}
                  </span>
                </Link>
              </li>
            )}

            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/edit-stake"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-gear"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.SETTINGS)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/betting-profit-loss"
                className="dropdown-item"
              >
                <AiOutlineQuestionCircle className="mr-3" />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.BETTING_PROFIT_AND_LOSS)}
                </span>
              </Link>
            </li>

            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                onClick={closeDropdown}
                to="/open-bets"
                data-v-9dda4895
                className="dropdown-item"
              >
                <span data-v-9dda4895 className="icon-menu-sec">
                  <FaBook className="mr-3 text-black" />
                </span>
                <span data-v-9dda4895 className="menu-rgt-text">
                  {" "}
                  {getLanguage(LanguageKey.OPEN_BETS)}
                </span>
              </Link>
            </li>
            <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                onClick={closeDropdown}
                to="/change-password"
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-lock"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.CHANGE_PASSWORD)}
                </span>
              </Link>
            </li>

            {/* <li data-v-9dda4895 className="menu-rgt-icons">
              <Link
                data-v-9dda4895
                data-bs-toggle="modal"
                data-bs-target="#language_selection_pop_up"
                className="dropdown-item"
              >
                <i    style={{ color: "#000" }} data-v-9dda4895 className="fa-solid fa-globe" />
                <span data-v-9dda4895 className="menu-rgt-text">
                  Language
                </span>
              </Link>
            </li> */}
            <li data-v-9dda4895 className="menu-rgt-icons">
              <a
                onClick={() => dispatch(logout())}
                data-v-9dda4895
                className="dropdown-item"
              >
                <i
                  style={{ color: "#000" }}
                  data-v-9dda4895
                  className="fa-solid fa-right-from-bracket"
                />
                <span data-v-9dda4895 className="menu-rgt-text">
                  {getLanguage(LanguageKey.LOGOUT)}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </ModalWrapper>
    </li>
  );
};

export default Dropdown;
