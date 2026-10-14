import { FaSpinner } from "react-icons/fa";

const ImageUploadMessage = ({ imageUploadMessage }) => {
  return (
    <div
      id="popup-modal"
      className="z-[1000] fixed top-0 right-[0.5px] md:right-0 overflow-hidden flex w-full h-screen min-h-[100dvh] items-center justify-center bg-bg_CasinoPopupBg"
    >
      <div className="relative w-[90%]  sm:w-[85%] md:w-[70%] lg:w-[450px] max-w-[450px] rounded-[20px]   bg-gray-200  popUpOpenAnimation">
        <div className="flex gap-10 items-start h-[95%] w-full overflow-auto pb-10">
          <div
            title="mobileLogin"
            className="flex flex-col items-center justify-center gap-y-4 w-full text-black mt-5"
          >
            <span> {imageUploadMessage}</span>
            <FaSpinner className="animate-spin" size={30} color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadMessage;
