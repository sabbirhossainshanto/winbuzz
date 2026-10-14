import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";

const Thumbnails = ({ data }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    token
      ? navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`)
      : dispatch(setShowLoginModal(true));
  };
  return (
    <div data-v-15497d74 className="tab-content" id="pills-tabContent">
      <div
        data-v-15497d74
        className="tab-pane fade show active"
        id="pills-all11"
        role="tabpanel"
      >
        <div data-v-15497d74 className="all-in-casino-img">
          {data?.map((casino, i) => {
            return (
              <div
                onClick={() => handleNavigateToIFrame(casino)}
                key={`${casino?.id}-${casino?.category}-${casino?.product}-${i}`}
                className="all-star-model-img"
                style={{ cursor: "pointer" }}
              >
                <a>
                  <img
                    loading="lazy"
                    src={casino?.url_thumb}
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

export default Thumbnails;
