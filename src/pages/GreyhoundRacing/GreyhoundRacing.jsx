import HorseGreyhound from "../../components/modules/HorseGreyhound/HorseGreyhound";
import { useGroupQuery } from "../../redux/features/events/events";

const GreyhoundRacing = () => {
  const { data } = useGroupQuery(
    { sportsType: 4339 },
    {
      pollingInterval: 1000,
    },
  );
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap horse-greyhound">
      <HorseGreyhound data={data} title="Greyhound Racing" eventTypeId={4339} />
    </div>
  );
};

export default GreyhoundRacing;
