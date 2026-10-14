import HorseGreyhound from "../../components/modules/HorseGreyhound/HorseGreyhound";
import { useGroupQuery } from "../../redux/features/events/events";

const HorseRacing = () => {
  const { data } = useGroupQuery(
    { sportsType: 7 },
    {
      pollingInterval: 1000,
    },
  );
  return (
    <div
      className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap
 horse-greyhound"
    >
      {" "}
      <HorseGreyhound data={data} title="Horse Racing" eventTypeId={7} />
    </div>
  );
};

export default HorseRacing;
