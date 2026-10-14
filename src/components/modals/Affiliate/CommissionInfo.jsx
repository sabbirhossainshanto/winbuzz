import { Fragment, useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const CommissionInfo = ({ setOpenCommissionModal }) => {
  const { getLanguage } = useLanguage();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenCommissionModal(false);
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
          className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-gray-200 text-black p-2 xs:p-5 rounded-md h-[70%] overflow-hidden"
        >
          <h2 className="mb-5 text-base md:text-xl font-semibold">
            {getLanguage(LanguageKey.HOW_TO_GET_COMMISSION)}
          </h2>
          <div
            onClick={() => setOpenCommissionModal(false)}
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
                data-v-4c49d924
                className="affi-how-bonus-list affi-how-to-get-bonus"
              >
                <h5 data-v-4c49d924>
                  💸 {getLanguage(LanguageKey.HOW_TO_EARN_COMMISSION)}
                </h5>
                <li data-v-4c49d924>
                  You get bonus of the total amount your users lose every day
                  based on below slabs.
                </li>
                <li data-v-4c49d924>The system checks daily at 2:00 AM.</li>
                <li data-v-4c49d924>
                  If your users lost money overall, you get paid.
                </li>
                <li data-v-4c49d924>
                  If your users made profit, no bonus is given for that day.
                </li>
                <li data-v-4c49d924>✅ Example:</li>
                <div data-v-4c49d924 className="table-responsive">
                  <table data-v-4c49d924 className="tablecontant">
                    <thead data-v-4c49d924 className="cmn-head thead-mainn">
                      <tr data-v-4c49d924>
                        <th data-v-4c49d924>User Range</th>
                        <th data-v-4c49d924>Bonus (%)</th>
                      </tr>
                    </thead>
                    <tbody data-v-4c49d924 className="datastabl">
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>1 - 10</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>11 - 50</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>51 - 100</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>101 - 500</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                      <tr data-v-4c49d924>
                        <td data-v-4c49d924>501 - 100000</td>
                        <td data-v-4c49d924>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CommissionInfo;
