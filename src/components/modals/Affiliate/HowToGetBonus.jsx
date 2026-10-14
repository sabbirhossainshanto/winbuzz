import { Fragment, useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const HowToGetBonus = ({ setOpenGetBonusModal }) => {
  const { getLanguage } = useLanguage();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenGetBonusModal(false);
  });

  return (
    <Fragment>
      <div className="modal-backdrop fade show"></div>
      <div
        id="popup-modal"
        className="fixed bottom-0 left-0 right-0 top-0 overflow-hidden flex h-[100dvh] w-dvw items-center justify-center  overflow-y-hidden z-[10000]"
      >
        <div
          ref={ref}
          className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-gray-200 text-black p-2 xs:p-5 rounded-md h-[70%] overflow-hidden  pb-10"
        >
          <h2 className="mb-5 text-base md:text-xl font-semibold">
            {getLanguage(LanguageKey.HOW_TO_GET_BONUS)}
          </h2>
          <div
            onClick={() => setOpenGetBonusModal(false)}
            className="transition-all mb-2 ease-in-out duration-200 hover:scale-105 absolute top-2 right-2 text-black"
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
          <div className="flex gap-10 items-start h-[95%] w-full overflow-auto">
            <div
              title="mobileLogin"
              className="flex flex-col items-start gap-y-4 w-full"
            >
              <ul
                className="affi-how-bonus-list affi-how-to-get-bonus "
                data-v-4c49d924
              >
                <h5 data-v-4c49d924>🧾 Affiliate Program – How It Works</h5>
                <li data-v-4c49d924>
                  Earn daily bonus by inviting users to play!
                </li>
                <h5 data-v-4c49d924>🎯 How to Add Users</h5>
                <p data-v-4c49d924>You can add users in two easy ways:</p>
                <h6 data-v-4c49d924> 1️⃣ Referral Link</h6>
                <li data-v-4c49d924>
                  Your unique invitation link is shown on your dashboard.
                </li>
                <li data-v-4c49d924>
                  Anyone who signs up using this link will be automatically
                  added to your team.
                </li>
                <li data-v-4c49d924>
                  You can copy, share, or download a QR code.
                </li>
                <h6 data-v-4c49d924> 2️⃣ Add New User (Manual)</h6>
                <li data-v-4c49d924>
                  Tap on Add New User and fill in the user&apos;s info.
                </li>
                <li data-v-4c49d924>
                  The user will instantly be created under your downline.
                </li>
                <h5 data-v-4c49d924>📊 Your Affiliate Panel Features</h5>
                <h6 data-v-4c49d924>🔹Dashboard</h6>
                <li data-v-4c49d924>Total users added</li>
                <li data-v-4c49d924>Total users who deposited</li>
                <li data-v-4c49d924>Total commission earned</li>
                <li data-v-4c49d924>Today’s top 5 losing users</li>
                <li data-v-4c49d924>Referral link &amp; QR code</li>
                <li data-v-4c49d924>Add user button</li>
                <h6 data-v-4c49d924>🔹User List</h6>
                <li data-v-4c49d924>See all your downline users</li>
                <li data-v-4c49d924>
                  View their balance and registration date
                </li>
                <li data-v-4c49d924>Tap Add New User to add more</li>
                <li data-v-4c49d924>Filter users by registration date</li>
                <h6 data-v-4c49d924>🔹Profit &amp; Loss</h6>
                <li data-v-4c49d924>See user profit/loss by date range</li>
                <li data-v-4c49d924>
                  Breakdown by event (casino, sports, etc.)
                </li>
                <li data-v-4c49d924>
                  Total profit, total loss, and net P&amp;L
                </li>
                <li data-v-4c49d924>
                  This is used to calculate your daily bonus
                </li>
                <h6 data-v-4c49d924>🔹Reports</h6>
                <li data-v-4c49d924>View daily commission report</li>
                <li data-v-4c49d924>
                  Check how much bonus you earned each day
                </li>
                <li data-v-4c49d924>Filter by date range</li>
                <h6 data-v-4c49d924>📌 Important Rules</h6>
                <p data-v-4c49d924>
                  ✅ You earn commission only if your users lost money overall
                  for that day.
                </p>
                <p data-v-4c49d924>
                  ✅ Bonus is added daily after 2:00 AM automatically.
                </p>
                <p data-v-4c49d924>
                  ✅ No commission if user total P&amp;L is positive (i.e.,
                  users made profit).
                </p>
                <p data-v-4c49d924>
                  ✅ You can use both link and manual user addition — both work
                  the same.
                </p>
                <p data-v-4c49d924>
                  🚫 Don&apos;t misuse the system or create fake users — this
                  may result in suspension.
                </p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HowToGetBonus;
