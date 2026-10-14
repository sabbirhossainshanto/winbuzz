import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Settings } from "../../../api";
import MiniGames from "../../modals/MiniGames/MiniGames";
import images from "../../../assets/images";

const SocialLink = () => {
  const [showMiniGamesModal, setShowMiniGamesModal] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const navigateWhatsApp = () => {
    if (token && Settings?.branchWhatsapplink) {
      window.open(Settings?.branchWhatsapplink, "_blank");
    } else {
      window.open(Settings?.whatsapplink, "_blank");
    }
  };
  return (
    <Fragment>
      {(Settings?.whatsapplink || Settings?.branchWhatsapplink) && (
        <section data-v-238a5417 className="help-and-support-box">
          <div
            data-v-238a5417
            className="support-sec"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {Settings?.instagramLink ? (
              <a onClick={() => window.open(Settings?.instagramLink, "_blank")}>
                <img
                  style={{ filter: "none", height: "40px", width: "40px" }}
                  src={images.instagram}
                />
              </a>
            ) : null}
            {Settings?.telegramLink ? (
              <a onClick={() => window.open(Settings?.telegramLink, "_blank")}>
                <img
                  style={{ filter: "none", height: "40px", width: "40px" }}
                  src={images.instagram}
                />
              </a>
            ) : null}
            {Settings?.whatsapplink || Settings?.branchWhatsapplink ? (
              <a onClick={navigateWhatsApp}>
                <img
                  style={{ filter: "none", height: "40px", width: "40px" }}
                  src={images.whatsApp}
                  alt="WhatsAPP"
                />
              </a>
            ) : null}

            <a onClick={() => setShowMiniGamesModal(true)}>
              <img
                style={{ filter: "none", height: "50px", width: "50px" }}
                src="/icon/uv_games-CkYT1PYz.gif"
                alt="WhatsAPP"
              />
            </a>
          </div>
        </section>
      )}
      {showMiniGamesModal && (
        <MiniGames setShowMiniGamesModal={setShowMiniGamesModal} />
      )}
    </Fragment>
  );
};

export default SocialLink;
