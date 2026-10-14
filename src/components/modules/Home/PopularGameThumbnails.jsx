import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const PopularGameThumbnails = ({ highlight_casino }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return dispatch(setShowLoginModal(true));
    navigate(
      `/casino?provider=${casino?.product}&category=${casino?.category}`,
    );
  };
  return (
    <div data-v-56384811 className="listing-mobile-page mt-2">
      <div data-v-56384811 className="mobile-home-page">
        <div
          data-v-56384811
          className="mobile-exch-main-box grid-cols-2 md:grid-cols-4"
        >
          {highlight_casino?.map((item) => {
            return (
              <div
                onClick={() => handleNavigateToIFrame(item)}
                key={item?.id}
                className="exch-coupon-card popularDiv static-cls"
                style={{ cursor: "pointer" }}
              >
                <a>
                  <img
                    loading="lazy"
                    src={`/${item?.url_thumb}`}
                    alt="game-img-1"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularGameThumbnails;
