const ExchangeGames = () => {
  return (
    <section data-v-56384811 className="inplay-item-list_exchangeGames mt-2">
      <div
        data-v-56384811
        className="inplay-popular-header inplay-header-color w-100"
      >
        <div data-v-56384811 className="inplay-popular-header__logo">
          <i
            data-v-56384811
            className="fa fa-play-circle inplay-popular-header__logo-icon"
          />
          <span data-v-56384811 className="inplay-popular-header__logo-text">
            Exchange Games
          </span>
          <ul data-v-56384811 className="live_virtual">
            <li data-v-56384811>
              <input
                data-v-56384811
                type="checkbox"
                className="filter-checkbox"
              />
              <label data-v-56384811>LIVE</label>
            </li>
            <li data-v-56384811>
              <input
                data-v-56384811
                type="checkbox"
                className="filter-checkbox"
              />
              <label data-v-56384811>VIRTUAL</label>
            </li>
          </ul>
        </div>
      </div>
      <div data-v-56384811 className="popular-game-tab">
        <ul
          data-v-56384811
          className="nav nav-tabs"
          id="pills-tab"
          role="tablist"
        >
          <li data-v-56384811 className="nav-item" role="presentation">
            <button
              data-v-56384811
              className="nav-link active"
              id="pills-home-tab"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <p data-v-56384811>Today</p>
            </button>
          </li>
          <li data-v-56384811 className="nav-item" role="presentation">
            <button
              data-v-56384811
              className="nav-link"
              id="pills-profile-tab"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              <p data-v-56384811>Tomorrow</p>
            </button>
          </li>
          <li data-v-56384811 className="nav-item" role="presentation">
            <button
              data-v-56384811
              className="nav-link"
              id="pills-contact-tab"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              <p data-v-56384811>UPCOMING</p>
            </button>
          </li>
        </ul>
        <div data-v-56384811 className="tab-content" id="pills-tabContent">
          <div data-v-56384811 className="no-real-time">
            No real time records found
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangeGames;
