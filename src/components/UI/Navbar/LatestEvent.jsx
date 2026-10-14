import { useLatestEvent } from "../../../hooks/latestEvent";

const LatestEvent = () => {
  const { data } = useLatestEvent();

  return (
    <div className="header-ipl-election">
      <div className="header-ipl-sec">
        <a href="/sports/FIFA CUP WINNER/4343" className>
          FIFA CUP WINNER
        </a>
      </div>
      <div className="header-election-sec">
        <a href="/sports/WINNER CUP/4344" className>
          WINNER CUP
        </a>
      </div>
      <div className="header-ipl-sec">
        <a href="/sports/ELECTION/4345" className>
          ELECTION
        </a>
      </div>
      <div className="header-election-sec">
        <a href="/sports/Kabaddi /27454572" className>
          Kabaddi{" "}
        </a>
      </div>
    </div>
  );
};

export default LatestEvent;
