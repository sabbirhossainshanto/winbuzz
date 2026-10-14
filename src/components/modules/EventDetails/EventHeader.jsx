const EventHeader = ({ data }) => {
  // const score = data?.score;

  return (
    <div data-v-4a1ad0c4 className="eventtitle-bx">
      <div className="eventtitle-tv">
        <h2> {data?.result?.[0]?.eventName}</h2>
        <div>
          <time> {data?.result?.[0]?.openDate}</time>
        </div>
      </div>
      {/* {score && score?.tracker !== null && (
        <div className="w-full overflow-hidden h-[125px]">
          <iframe
            id="videoComponent"
            className="w-full h-auto relative overflow-hidden   bg-transparent"
            src={score?.tracker}
            width="100%"
            allowfullscreen=""
          ></iframe>
        </div>
      )} */}
    </div>
  );
};

export default EventHeader;
