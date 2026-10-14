import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import images from "../../../assets/images";
import useGetIndex from "../../../hooks/useGetIndex";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import { Settings } from "../../../api";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const ShareAffiliateLink = ({ setShowShareAffiliateLink }) => {
  const { getLanguage } = useLanguage();
  const { data } = useGetIndex();
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowShareAffiliateLink(false);
  });

  const handleNavigateToSocialLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div
      id="popup-modal"
      className="z-[1000] fixed top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div
        ref={ref}
        className="z-2 popUpBoxShadow popUpOpenAnimation absolute w-[90%] sm:w-[85%] md:w-[70%] lg:w-[450px] rounded-[5px] bg-gray-200 text-black p-2 xs:p-5 rounded-md  overflow-hidden  pb-10"
      >
        <h2 className="mb-5 text-base md:text-xl font-semibold">
          {getLanguage(LanguageKey.SHARE_AFFILIATE_LINK_OR_CODE)}
        </h2>
        <div
          onClick={() => setShowShareAffiliateLink(false)}
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
            <div className="modal-body" style={{ width: "100%" }}>
              <div className="share-link-img-sec">
                <img src={images.share} alt="af-share-img" />
              </div>
              <div className="af-share-link-wrapper">
                <p>{getLanguage(LanguageKey.SHARE_LINK)}</p>
                <div className="af-share-link-sec">
                  <span>{data?.link}</span>
                  <button
                    onClick={() => handleCopyToClipBoard(data?.text)}
                    className="thm-but btn-gradient"
                  >
                    {getLanguage(LanguageKey.COPY)}
                  </button>
                </div>
              </div>
              {(Settings?.branchWhatsapplink ||
                Settings?.whatsapplink ||
                Settings?.instagramLink ||
                Settings?.telegramLink) && (
                <div className="af-share-link-wrapper">
                  <div className="affilate-cmn-footer">
                    <div className="shre-text-title">
                      <p>{getLanguage(LanguageKey.SHARE_THIS_LINK_VIA)}</p>
                    </div>
                    <div className="af-share-social-link-sec">
                      {(Settings?.branchWhatsapplink ||
                        Settings?.whatsapplink) && (
                        <a
                          onClick={() =>
                            handleNavigateToSocialLink(
                              Settings?.branchWhatsapplink ||
                                Settings?.whatsapplink,
                            )
                          }
                        >
                          <img
                            src="data:image/webp;base64,UklGRmIEAABXRUJQVlA4WAoAAAAwAAAAIwAAIwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIpwAAAAFnoKhtIzbXA7Dvtwg0IgJjVBfa6zac2NbmJh8dXHR8XHZAtbFoFLrNQuiwgfhxsVG9/buamf9X+Ij+TwCsx4boFoD7I2vESMi5dChizixex9EDIya2b3Q8DUCRcAbkkhXQS1LsSDx+yRaZLCxlp0Z2o7/ayG6V7JDJwpdssZON0UtSIJesACWZAeh4GgBinm94HUcPDCjODPbEtYT7Z4vA3TdEtwBWAFZQOCDEAQAAEAoAnQEqJAAkAD5tMJRHJCMiIScraIANiWwAsR/HeE+q/kBxAPc3e0TN14/U1tgPMB+yXrK+gDeAPQA6Ub++kU2BcTpZNHBVP8YGpxszvIw9qSCQHg6HuVAA5sw9WcUPSGl2av9kvX7vR3WwzsZcjp6Sq8zQ+au5ZAeyGUb1Qx+oEPx6OGWDhlJnPY5fzkiX/PTiqcmwW53p8FWbETKF17blSslQWFlpLzVqYZqPldlLLS/dZV/uzRw+CPLmXOBGJU9fnLr/8itDfVB7qnNI3GpWHiLrvk5lLMr8PWg7tBlh4QP34PJga49+/8XqiNlPnvCGFoXE62ek7kjZQV4yNtxXo7Gaa8YXZzhrOtAHe4Flnc26qUNh02x/lTUIG19BrUeTe5ph4IUiUKXCapze0VWusl3qf84jRJdGvW7ogPRthHX1rbIRgRuAIK9eD6ZB5BrXr/JmxU8sVPZaNPiWBTryT3bPZMHivakNj0C/nP67oxO2GpWvsl+55RnQPLUpwWhXGL+ruloMas4k11eCi4AzfNF+PNrVtZwmDW4w5GqL+JH6XLgBD15T4JSEADvNu6Y+xivU2XlsEs7N/+9CgPAAAAA="
                            alt="whatsapp"
                          />
                        </a>
                      )}
                      {Settings?.instagramLink && (
                        <a
                          onClick={() =>
                            handleNavigateToSocialLink(Settings?.instagramLink)
                          }
                        >
                          <img src={images.instagram} alt="instagram-share" />
                        </a>
                      )}
                      {Settings?.telegramLink && (
                        <a
                          onClick={() =>
                            handleNavigateToSocialLink(Settings?.telegramLink)
                          }
                        >
                          <img
                            src="data:image/webp;base64,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"
                            alt="telegram-share"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAffiliateLink;
