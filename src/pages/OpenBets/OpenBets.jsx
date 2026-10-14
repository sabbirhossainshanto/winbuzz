import { LanguageKey } from "../../const";
import { useCurrentBets } from "../../hooks/currentBets";
import useLanguage from "../../hooks/use-language";

const OpenBets = () => {
  const { getLanguage } = useLanguage();
  const { data: currentBets } = useCurrentBets();

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-0deca5ec className="right-side-bar-main-sec my-bets-sec">
          <div data-v-0deca5ec className="profile-head">
            <span data-v-0deca5ec>{getLanguage(LanguageKey.OPEN_BETS)}</span>
            {/* <div data-v-0deca5ec className="download-pdf-excel-sec">
              <a data-v-0deca5ec href="javascript:void(0);">
                <img
                  data-v-0deca5ec
                  src="/assets/pdf-icon-C4G3Hcat.png"
                  alt="pdf-icon"
                />
              </a>
              <a data-v-0deca5ec href="javascript:void(0);">
                <img
                  data-v-0deca5ec
                  src="/assets/excel-icon-TBr4wf_f.png"
                  alt="excel-icon"
                />
              </a>
            </div> */}
          </div>
          {/* <div data-v-0deca5ec className="form-search-sec win-ac-statement-sec">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-2 mb-2">
                <label className="label-upside">From Date :</label>
                <div className="start-end-date-sec">
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 mb-2">
                <label className="label-upside">To Date :</label>
                <div className="start-end-date-sec">
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
            <div className="row select-andapply-sec">
              <div className="col-6 col-sm-6 col-md-2">
                <label className="label-upside">Type :</label>
                <div className="select-search-box">
                  <span className="select-down-arrow">
                    <i className="fa-solid fa-angle-down" />
                  </span>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value={4}>Cricket</option>
                    <option value={1}>Football</option>
                    <option value={2}>Tennis</option>
                    <option value="sportsbook">Sportsbook</option>
                    <option value="matka">Matka</option>
                    <option value="fantasy_cricket">Fantasy Cricket</option>
                    <option value="casino">Casino</option>
                    <option value="premium">Premium</option>
                    <option value="virtual_sport">Virtual Sports</option>
                    <option value={4343}>FIFA CUP WINNER</option>
                    <option value={4344}>WINNER CUP</option>
                    <option value={4345}>ELECTION</option>
                    <option value={27454572}>Kabaddi </option>
                    <option value={27454571}>Esports</option>
                    <option value={26420387}>Mixed Martial Arts</option>
                    <option value={2152880}>Gaelic Games</option>
                    <option value={998917}>Volleyball</option>
                    <option value={468328}>Handball</option>
                    <option value={61420}>Australian Rules</option>
                    <option value={7524}>Ice Hockey</option>
                    <option value={7522}>Basketball</option>
                    <option value={7511}>Baseball</option>
                    <option value={6423}>American Football</option>
                    <option value={6422}>Snooker</option>
                    <option value={27454574}>Table Tennis</option>
                  </select>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-2 ps-1 pe-1">
                <div className="get-statement-sec mt-0">
                  <button type="button">Apply</button>
                </div>
              </div>
            </div>
          </div> */}
          <div
            data-v-0deca5ec
            className="sattle-bet-list bet-list league-list mt-2"
          >
            <ul
              data-v-0deca5ec
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {currentBets?.map((bet) => {
                return (
                  <div
                    key={bet?.betId}
                    data-v-0deca5ec
                    className="accordion-item"
                  >
                    <h2
                      data-v-0deca5ec
                      className="accordion-header"
                      id="flush-headingOne"
                    >
                      <button
                        data-v-0deca5ec
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-0"
                        aria-expanded="false"
                        aria-controls="collapse-0"
                      >
                        <li data-v-0deca5ec>
                          <div
                            data-v-0deca5ec
                            className="list-con bet_details_title_mains"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                              data-v-0deca5ec
                              className="bet_details_sub_title_mains"
                            >
                              <div data-v-0deca5ec className="number-list">
                                {bet?.betType}
                              </div>
                              <div
                                data-v-0deca5ec
                                className="bet_title_list_name"
                              >
                                <div
                                  data-v-0deca5ec
                                  className="bets_name_header"
                                >
                                  {/**/}
                                  <label data-v-0deca5ec>
                                    {bet?.eventName}
                                  </label>
                                </div>
                                <div data-v-0deca5ec className="bet_show_date">
                                  <span
                                    data-v-0deca5ec
                                    className="settle-list-date"
                                  >
                                    {bet?.placeDate}
                                  </span>
                                </div>
                              </div>
                              <div
                                data-v-0deca5ec
                                className="bet_title_list_name"
                              >
                                <div
                                  data-v-0deca5ec
                                  className="bets_name_header"
                                >
                                  {/**/}
                                  <label data-v-0deca5ec>
                                    {getLanguage(LanguageKey.AMOUNT)}:{" "}
                                    {bet?.amount}
                                  </label>
                                </div>
                                <div data-v-0deca5ec className="bet_show_date">
                                  <span
                                    data-v-0deca5ec
                                    className="settle-list-date"
                                  >
                                    {getLanguage(LanguageKey.USER_RATE)}:{" "}
                                    {bet?.userRate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div data-v-0deca5ec className="list-num">
                            <span data-v-0deca5ec>{bet?.amount}</span>
                          </div> */}
                        </li>
                      </button>
                    </h2>
                    <div
                      data-v-0deca5ec
                      id="collapse-0"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div data-v-0deca5ec className="accordion-body">
                        <div data-v-0deca5ec className="openBetsTabs">
                          <div data-v-0deca5ec className="tab-container">
                            <div data-v-0deca5ec className="tab-content">
                              <div
                                data-v-0deca5ec
                                className="form-search-table nw-statement-table-wrapper p-0"
                              >
                                <div
                                  data-v-0deca5ec
                                  className="table-responsive"
                                >
                                  {/**/}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {currentBets.length === 0 && (
                <div
                  data-v-56384811
                  className="tab-content"
                  id="pills-tabContent"
                >
                  <div data-v-56384811 className="no-real-time">
                    {getLanguage(LanguageKey.YOU_HAVE_NO_OPEN_BETS)}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenBets;
