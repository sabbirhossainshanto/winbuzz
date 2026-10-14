import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userToken } from "../../redux/features/auth/authSlice";
import { API, Settings } from "../../api";
import { AxiosSecure } from "../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { Loader } from "rsuite";

const IFrame = () => {
  const [loading, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState("");
  const { gameId } = useParams();

  const token = useSelector(userToken);

  /* get iframe url */
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCasinoVideo = async () => {
      setLoading(true);
      const payload = {
        gameId: gameId,
        isHome: false,
        mobileOnly: true,
        casinoCurrency: Settings.casino_currency,
      };

      try {
        setLoading(true);
        const res = await AxiosSecure.post(API.liveCasinoIFrame, payload);
        const data = res?.data;

        setIFrame(data?.gameUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    };
    getCasinoVideo();
  }, [gameId, token]);

  if (loading) {
    return (
      <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap"
      style={{ minHeight: "100vh" }}
    >
      <iframe
        style={{ width: "100%", height: "100%" }}
        scrolling="yes"
        allowfullscreen="true"
        title="game"
        id="casino-link"
        className="embed-responsive-item"
        src={iFrame}
      ></iframe>
    </div>
  );
};

export default IFrame;
