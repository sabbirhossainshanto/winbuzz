import { useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../redux/features/global/globalSlice";
import useBalance from "../../hooks/balance";
import { useState } from "react";
import { useBonusMutation } from "../../hooks/bonus";
import toast from "react-hot-toast";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const Promotions = () => {
  const { getLanguage } = useLanguage();
  const { refetch } = useBalance();
  const [coupon, setCoupon] = useState(null);
  const { mutateAsync } = useBonusMutation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    token ? navigate(link) : dispatch(setShowLoginModal(true));
  };

  const claimCoupon = async () => {
    if (token) {
      if (!coupon) {
        return toast.error("Please enter a coupon code");
      }
      const data = await mutateAsync({
        type: "claimCoupon",
        coupon_code: coupon,
      });

      if (data?.success) {
        refetch();
        toast.success(data?.result);
        setCoupon(null);
      } else {
        toast.error(data?.error);
      }
    } else {
      dispatch(setShowLoginModal(true));
    }
  };
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div className="hidden lg:flex sticky top-0 z-[1000]  w-full flex-col gap-y-1.5 lg:pt-0">
        <div className="flex items-center gap-2 justify-between w-full">
          <div>
            <nav
              className="flex items-center justify-center w-max space-x-1 text-sm text-white/80 pt-2 pl-2"
              aria-label="Breadcrumb"
            >
              <div onClick={() => navigate(-1)} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={23}
                  height={23}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="var(--primary-bg)"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
                <a
                  className="ml-1 text-base transition-all ease-in-out duration-300 hover:underline text-primary font-semibold"
                  aria-current="page"
                >
                  {getLanguage(LanguageKey.PROMOTIONS)}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className=" w-full h-max  py-3 px-2.5 flex flex-col gap-y-[15px]">
        {/* <section
          title="Bonus Balance"
          className="w-full bg-bg_color_bonusInfo rounded-[10px] px-1.5 py-1 relative overflow-hidden"
        >
          <div className="w-full h-full text-white grid grid-cols-2 gap-x-2 z-[100] relative">
            <div className="col-span-1 flex justify-start items-start bg-bg_color_giftCardInputBg h-full text-white flex-col px-3 py-0.5 rounded-lg relative">
              <div className="blur-[5px] bg-bg_color_giftCardInputBg w-full h-1/2 absolute bottom-0 left-0 z-0" />
              <h6 className="text-white text-basefont-medium leading-[18px] tracking-[0.3px]">
                BONUS EARNED
              </h6>
              <p className=" text-white text-base font-bold leading-[28px] tracking-[0.3px]">
                <span className="font-roboto">₹</span> X,XXX.XX
              </p>
            </div>
            <div className="col-span-1 flex justify-start items-start bg-bg_color_giftCardInputBg h-full text-white flex-col px-3 py-0.5 rounded-lg">
              <h6 className="text-white text-basefont-medium leading-[18px] tracking-[0.3px]">
                FREE MONEY EARNED
              </h6>
              <p className=" text-white text-base font-bold leading-[28px] tracking-[0.3px]">
                <span className="font-roboto">₹</span> X,XXX.XX
              </p>
            </div>
          </div>
          <div className="absolute left-[-10px] bottom-[-44px]  w-max h-max z-0">
            <div className="shadow-giftCard  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[54px] rotate-[30deg]" />
            <div className="relative overflow-hidden w-[115px] h-[115px] rotate-[30deg] z-0">
              <img
                src={images.giftCard}
                alt="giftCard"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                className="  w-full max-w-[115px] h-full max-h-[115px]"
                loading="lazy"
                title="GiftCard"
              />
            </div>
          </div>
          <div className=" flex items-center justify-end gap-x-1.5 mt-1 z-10">
            <button
              onClick={() => handleNavigate("/deposit")}
              title="Deposit"
              id="deposit"
              className="relative overflow-hidden text-white pr-2.5 pl-1 py-0 h-[30px] rounded-md flex items-center justify-center  bg-bg_color_quaternary"
              aria-label="Deposit"
              type="button"
            >
              <p className="flex items-center w-full h-full gap-x-0.5  text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="currentColor"
                >
                  <g clipPath="url(#clip0_3211_5978)">
                    <path
                      d="M7.5 3.4165V11.5832"
                      stroke="url(#paint0_linear_3211_5978)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.41675 7.5H11.5834"
                      stroke="url(#paint1_linear_3211_5978)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_3211_5978"
                      x1="7.5"
                      y1="12.0936"
                      x2="8.61792"
                      y2="12.0771"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop offset={1} stopColor="currentColor" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3211_5978"
                      x1="3.41675"
                      y1="8.5625"
                      x2="8.06294"
                      y2="3.99737"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop offset={1} stopColor="currentColor" />
                    </linearGradient>
                    <clipPath id="clip0_3211_5978">
                      <rect
                        width={14}
                        height={14}
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </p>
              <p className="text-sm font-bold leading-[18px] tracking-[0.3px]">
                Deposit
              </p>
              <p />
            </button>
            <button
              title="My Bonuses"
              id="my-bonuses"
              className="relative overflow-hidden text-white px-2.5 py-0 h-[30px] rounded-md flex items-center justify-center  bg-bg_color_quaternary"
              aria-label="My Bonuses"
              type="button"
            >
              <p className="flex items-center w-full gap-x-0.5  text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={17}
                  viewBox="0 0 16 17"
                  fill="currentColor"
                >
                  <g clipPath="url(#clip0_3216_6314)">
                    <path
                      d="M10.8506 9.91291L8.61975 8.23979V4.8316C8.61975 4.48891 8.34275 4.21191 8.00006 4.21191C7.65737 4.21191 7.38037 4.48891 7.38037 4.8316V8.54966C7.38037 8.74485 7.47209 8.92891 7.62825 9.04541L10.1069 10.9044C10.2185 10.9881 10.3486 11.0284 10.4781 11.0284C10.6671 11.0284 10.853 10.9435 10.9745 10.7799C11.1803 10.5066 11.1245 10.118 10.8506 9.91291Z"
                      fill="url(#paint0_linear_3216_6314)"
                    />
                    <path
                      d="M8 0.5C3.58853 0.5 0 4.08853 0 8.5C0 12.9115 3.58853 16.5 8 16.5C12.4115 16.5 16 12.9115 16 8.5C16 4.08853 12.4115 0.5 8 0.5ZM8 15.2607C4.27266 15.2607 1.23934 12.2273 1.23934 8.5C1.23934 4.77266 4.27266 1.73934 8 1.73934C11.728 1.73934 14.7607 4.77266 14.7607 8.5C14.7607 12.2273 11.7273 15.2607 8 15.2607Z"
                      fill="url(#paint1_linear_3216_6314)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_3216_6314"
                      x1="7.38037"
                      y1="11.4544"
                      x2="11.5202"
                      y2="11.1827"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop offset={1} stopColor="currentColor" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3216_6314"
                      x1="-1.1269e-07"
                      y1="17.5"
                      x2="17.6354"
                      y2="15.3782"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="currentColor" />
                      <stop offset={1} stopColor="currentColor" />
                    </linearGradient>
                    <clipPath id="clip0_3216_6314">
                      <rect
                        width={16}
                        height={16}
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </p>
            </button>
          </div>
        </section> */}
        <div className=" flex md:flex-row flex-col ring-1 ring-lossback_1 items-center w-full rounded-lg  bg-bg_color_lossback_card_bg ">
          <div className="px-4 relative py-3 w-full md:w-fit overflow-hidden">
            <div className="relative text-center z-20 text-white font-black leading-normal text-sm tracking-wider uppercase">
              {getLanguage(LanguageKey.LOSSBACK_BONUS)}
            </div>
            <div className="h-[120%] aspect-square absolute bottom-0 translate-y-1/3 md:translate-y-1/2 left-0 z-10">
              <div className="relative overflow-hidden w-full h-full">
                <img
                  src={images.cashBundle}
                  alt="Lossback Bonus"
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                  className="  w-full h-full object-cover"
                  loading="lazy"
                  title="Lossback Bonus"
                />
              </div>
            </div>
          </div>
          <div className="md:w-0.5 w-[96%] h-0.5 md:h-8 rounded-full bg-cm_primary" />
          <div className="flex items-center gap-1.5 w-full lg:w-fit flex-1 px-2 py-2 md:py-0">
            {!token && (
              <div className="flex flex-1 flex-col text-white leading-normal tracking-wider z-50">
                <div className="text-base flex items-center gap-1 text-text_color_lossback_amt font-black w-full">
                  <div className="flex-1 bg-bg_color_avlnowLossback animate-pulse text-text_color_lossback_amt px-3 py-1 text-xs font-bold flex items-center gap-1 rounded-full">
                    {getLanguage(LanguageKey.LOGIN_TO_VIEW_CLAIM)}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleNavigate("/lossback-bonus")}
              className="relative overflow-hidden bg-bg_color_lossbackSeeAll ml-auto active:scale-[99%] transition-all duration-300 text-white whitespace-nowrap text-sm font-bold rounded px-4 py-2"
              type="button"
            >
              {getLanguage(LanguageKey.VIEW_ALL)}
            </button>
          </div>
        </div>
        <div className=" w-full  px-[9px]  flex flex-col justify-center relative overflow-hidden rounded-[10px] bg-bg_color_GiftCardBg gap-y-1.5 pb-[9px]">
          <div className=" absolute top-0 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={67}
              height={16}
              viewBox="0 0 67 16"
              fill="none"
            >
              <path
                d="M67 0H0L3.31268 5.64947C8.18926 13.966 18.3048 17.62 27.3705 14.3397L67 0Z"
                fill="var(--icon-color-secondary)"
                fillOpacity="0.15"
              />
            </svg>
          </div>
          <div className="flex justify-between gap-[9px] items-center h-full">
            <div className="relative overflow-hidden w-full max-w-[70px] max-h-[auto]">
              <img
                src={images.redeemCardGift}
                alt="ReddemCodeGift"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 625px"
                className="  w-full h-full object-contain"
                loading="eager"
                title="ReddemCodeGift - 10Sports"
                width={60}
                height={60}
              />
            </div>
            <div className="flex flex-col items-start text-white gap-[0.5px]">
              <div className="text-sm md:text-base font-bold  ">
                {getLanguage(LanguageKey.COUPON_CODE)}
              </div>
              <div className="leading-4 text-xs  md:text-sm tracking-wide font-normal opacity-80  text-white">
                {getLanguage(LanguageKey.TYPE_OR_PASTE_COUPON_CODE)}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center w-full text-sm text-white font-normal  bg-bg_color_giftCardInputBg py-1 pl-[10px] pr-[6px] rounded-md border  focus-within:outline-none placeholder:text-white focus-within:shadow-sm cursor-text border-transparent focus-within:border-transparent ">
              <input
                value={coupon || ""}
                onChange={(e) => setCoupon(e.target.value)}
                className="undefined flex-grow min-w-0 border-none focus:outline-none bg-transparent"
                placeholder="Enter coupon code here"
              />
              <div className="flex-shrink-0 w-max">
                <button
                  onClick={claimCoupon}
                  className="relative overflow-hidden w-max px-2 py-1  text-white bg-primary-color text-xs md:text-sm font-bold leading-4 rounded-md flex items-center justify-center relative cursor-pointer disabled:opacity-70 flex items-center gap-x-1 shadow-sm"
                  type="button"
                >
                  <div className="flex items-center gap-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x={3} y={8} width={18} height={4} rx={1} />
                      <path d="M12 8v13" />
                      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                    </svg>
                    <span>{getLanguage(LanguageKey.REDEEM)}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
