import { Fragment, useState } from "react";
import images from "../../../assets/images";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import AddNewUser from "../../modals/Affiliate/AddNewUser";
import useGetIndex from "../../../hooks/useGetIndex";
import { LuCirclePlus } from "react-icons/lu";
import { MdOutlineContentCopy } from "react-icons/md";
import { Settings } from "../../../api";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const InviteSection = () => {
  const { getLanguage } = useLanguage();
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const { data } = useGetIndex();

  return (
    <Fragment>
      {showAddNewUserModal && (
        <AddNewUser setShowAddNewUserModal={setShowAddNewUserModal} />
      )}
      <div data-v-4c49d924 className="nw-affi-invite-sec mb-5">
        <div className="nw-affi-invite-content-wrapper" data-v-4c49d924>
          <div className="nw-affi-invite-content" data-v-4c49d924>
            <h2 data-v-4c49d924>
              {getLanguage(LanguageKey.INVITE_YOUR_FRIENDS)}
            </h2>
            <p data-v-4c49d924>
              {getLanguage(
                LanguageKey.TO_JOIN_AND_YOU_CAN_RECEIVE_HUGE_BONUSES,
              )}
            </p>
          </div>
          <div className="nw-affi-invite-img" data-v-4c49d924>
            <img
              src={images.affiInvite}
              alt="affi-invite-img"
              data-v-4c49d924
            />
          </div>
        </div>
        {Settings?.referral_create_account && (
          <div className="nw-affi-add-new-user-btn-sec" data-v-4c49d924>
            <button
              onClick={() => setShowAddNewUserModal(true)}
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>
                <LuCirclePlus size={18} />
                {getLanguage(LanguageKey.ADD_NEW_USER)}
              </span>
            </button>
          </div>
        )}

        <div data-v-4c49d924 className="nw-affi-qr-invite-wrapper">
          <div data-v-4c49d924 className="nw-affi-qr-invite-code">
            <div data-v-4c49d924 className="nw-affi-qr-invite-heading">
              <img
                data-v-4c49d924
                src={images.affiInviteGift}
                alt="invite-gift"
              />
              <h3 data-v-4c49d924>
                {getLanguage(LanguageKey.INVITATION_CODE)}
              </h3>
            </div>
            <div data-v-4c49d924 className="nw-affi-share-link-sec">
              <span data-v-4c49d924>{data?.link}</span>
              <button
                style={{
                  background: "none",
                }}
                onClick={() => handleCopyToClipBoard(data?.text)}
                data-v-4c49d924
                className="thm-but thm-bdr-btn"
              >
                <MdOutlineContentCopy className="text-black" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InviteSection;
