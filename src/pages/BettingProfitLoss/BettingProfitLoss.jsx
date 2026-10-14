import moment from "moment";
import { useAccountStatementMutation } from "../../hooks/accountStatement";
import { useState } from "react";
import { from_date, to_date } from "../../utils/default-date";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BettingProfitLoss = () => {
  const { getLanguage } = useLanguage();
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(from_date);
  const [toDate, setToDate] = useState(to_date);

  const { mutate, data } = useAccountStatementMutation();
  const totalPnl = data?.result?.reduce((acc, curr) => {
    return acc + curr.memberWin;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      from: moment(fromDate).format("YYYY-MM-DD"),
      to: moment(toDate).format("YYYY-MM-DD"),
      type: "GR",
    };

    mutate(payload);
  };

  const handleNavigateSinglePassbook = (item) => {
    if (item?.plDetails) {
      navigate(`/betting-profit-loss/${item?.marketId}`);
    }
  };
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-82dac09c className="right-side-bar-main-sec my-bets-sec">
          <div
            data-v-275a83f2
            data-v-82dac09c
            className="form-search-sec win-ac-statement-sec"
          >
            <form onSubmit={handleSubmit} data-v-275a83f2 className="row">
              <div data-v-275a83f2 className="col-6 col-sm-6 col-md-2 mb-2">
                <label data-v-275a83f2 className="label-upside">
                  {getLanguage(LanguageKey.FROM_DATE)} :
                </label>
                <div data-v-275a83f2 className="start-end-date-sec">
                  <input
                    onChange={(e) => setFromDate(e.target.value)}
                    value={fromDate}
                    data-v-275a83f2
                    type="date"
                    min
                    max
                    className="form-control"
                  />
                </div>
              </div>
              <div data-v-275a83f2 className="col-6 col-sm-6 col-md-2 mb-2">
                <label data-v-275a83f2 className="label-upside">
                  {getLanguage(LanguageKey.TO_DATE)} :
                </label>
                <div data-v-275a83f2 className="start-end-date-sec">
                  <input
                    onChange={(e) => setToDate(e.target.value)}
                    value={toDate}
                    data-v-275a83f2
                    type="date"
                    min
                    max
                    className="form-control"
                  />
                </div>
              </div>
              {/**/}
              <div data-v-275a83f2 className="col-6 col-sm-6 col-md-2">
                <label data-v-275a83f2 className="label-upside">
                  {getLanguage(LanguageKey.SELECT_TYPE)} :
                </label>
                <div data-v-275a83f2 className="select-search-box">
                  <span data-v-275a83f2 className="select-down-arrow">
                    <i data-v-275a83f2 className="fa-solid fa-angle-down" />
                  </span>
                  <select
                    data-v-275a83f2
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option data-v-275a83f2 value="all">
                      {getLanguage(LanguageKey.ALL)}
                    </option>
                    <option data-v-275a83f2 value="dw">
                      {getLanguage(LanguageKey.DEPOSIT_WITHDRAW_REPORT)}
                    </option>
                    <option data-v-275a83f2 value="sport">
                      {getLanguage(LanguageKey.SPORTS)}
                    </option>
                  </select>
                </div>
              </div>
              <div data-v-275a83f2 className="col-6 col-sm-6 col-md-2">
                <label data-v-275a83f2 className="label-upside">
                  Select Subtype :
                </label>
                <div data-v-275a83f2 className="select-search-box">
                  <span data-v-275a83f2 className="select-down-arrow">
                    <i data-v-275a83f2 className="fa-solid fa-angle-down" />
                  </span>
                  <select
                    data-v-275a83f2
                    disabled
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option data-v-275a83f2 selected>
                      All
                    </option>
                  </select>
                </div>
              </div>
              <div data-v-275a83f2 className="col-6 col-sm-6 col-md-2 mb-2">
                <label data-v-275a83f2 className="label-upside">
                  Search Bet
                </label>
                <div data-v-275a83f2 className="select-search-box">
                  <input
                    data-v-275a83f2
                    type="search"
                    id="open-bet-search"
                    placeholder="Search"
                    className="form-control"
                  />
                </div>
              </div>
              <div
                data-v-275a83f2
                className="col-6 col-sm-6 col-md-2 mb-2 align-self-end"
              >
                <div data-v-275a83f2 className="d-flex get-statement-sec">
                  <button
                    data-v-275a83f2
                    type="submit"
                    className="btn btn-gets text-bg-dark"
                  >
                    {getLanguage(LanguageKey.SUBMIT)}
                  </button>
                  <div data-v-275a83f2 className="dropdown file_downland">
                    <button
                      data-v-275a83f2
                      type="submit"
                      className="btn btn-gets downlode_btn dropdown-toggle text-bg-dark"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        data-v-275a83f2
                        src="/assets/download-btn-aILIEDZm.svg"
                        alt="file"
                      />
                    </button>
                    <ul data-v-275a83f2 className="dropdown-menu">
                      <li data-v-275a83f2>
                        <a data-v-275a83f2 className="dropdown-item downl_file">
                          Download as Excel
                        </a>
                      </li>
                      <li data-v-275a83f2>
                        <a data-v-275a83f2 className="dropdown-item downl_file">
                          Download as PDF
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div
            data-v-82dac09c
            className="form-search-table nw-statement-table-wrapper"
          >
            <div data-v-82dac09c className="table-responsive">
              <table data-v-82dac09c className="datatable table table-bordered">
                <thead data-v-82dac09c>
                  <tr data-v-82dac09c>
                    <th data-v-82dac09c>{getLanguage(LanguageKey.EVENT_ID)}</th>
                    <th data-v-82dac09c>
                      {getLanguage(LanguageKey.SETTLED_TIME)}
                    </th>
                    <th data-v-82dac09c>{getLanguage(LanguageKey.EVENT)}</th>
                    <th data-v-82dac09c>
                      {getLanguage(LanguageKey.MEMBER_WIN)}
                    </th>
                  </tr>
                </thead>
                <tbody data-v-82dac09c>
                  {data?.result?.map((bet) => {
                    return (
                      <tr key={bet?.eventId} data-v-82dac09c>
                        <td data-v-82dac09c>{bet?.eventId}</td>
                        <td data-v-82dac09c>
                          {moment(bet?.settledTime).format("Do-MMM-YYYY")}
                        </td>
                        <td data-v-82dac09c className="kellygreen">
                          {bet?.plDetails ? (
                            <a
                              onClick={() => handleNavigateSinglePassbook(bet)}
                              data-v-b6eed746
                              href="Javascript:void(0);"
                              className="text-dark"
                            >
                              {bet?.narration}
                            </a>
                          ) : (
                            bet?.narration
                          )}
                        </td>
                        <td
                          data-v-82dac09c
                          style={{
                            color: bet?.memberWin > 0 ? "green" : "red",
                          }}
                        >
                          {bet?.memberWin}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/**/}
              </table>
            </div>
          </div>
          {/* <div data-v-82dac09c className="pagination_scetion">
            <div className="pagegneshan-cl">
              Showing <span>1</span> to <span>25</span> of <span>67</span>{" "}
              results
            </div>
            <div className="alignment m-0">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link active" href="#">
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link" aria-label="Next">
                    <span aria-hidden="true">Next »</span>
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BettingProfitLoss;
