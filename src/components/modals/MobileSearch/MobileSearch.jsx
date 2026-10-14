import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { Link } from "react-router-dom";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const MobileSearch = ({ setShowMobileSearch }) => {
  const [searchText, setSearchText] = useState("");
  const token = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  /* filter the search value */
  useEffect(() => {
    const categories = Array.from(new Set(data.map((item) => item.eventType)));

    setCategories(categories);
  }, [data]);

  /* hide the search modal */
  const handleHideDropdown = () => {
    setShowMobileSearch(false);
    setSearchText("");
    setData([]);
  };
  return (
    <Fragment>
      <div className="modal-backdrop fade show"></div>
      <div
        data-v-9dda4895
        className="modal fade header-search-filter-cta show"
        id="headersearch_filter"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div data-v-9dda4895 className="modal-dialog">
          <ModalWrapper setModal={handleHideDropdown}>
            <div data-v-9dda4895 className="modal-content">
              <div data-v-9dda4895 className="modal-header">
                <div data-v-9dda4895 className="input-form">
                  <button
                    onClick={handleHideDropdown}
                    data-v-9dda4895
                    data-bs-dismiss="modal"
                    type="button"
                    className="0 btn-close"
                    aria-label="Close"
                  >
                    <i data-v-9dda4895 className="fa fa-arrow-left" />
                  </button>
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    data-v-9dda4895
                    type="text"
                    maxLength={25}
                    className="form-control"
                    placeholder="Search Events"
                    defaultValue
                  />
                  <span data-v-9dda4895 className="search-icon">
                    <i
                      data-v-9dda4895
                      className="fa-solid fa-magnifying-glass"
                    />
                  </span>
                </div>
              </div>
              <div data-v-9dda4895 className="modal-body">
                {data?.length > 0 && searchText?.length > 2 && (
                  <ul data-v-9dda4895 className="nw-search-modal-result">
                    {categories?.map((category) => (
                      <Fragment key={category}>
                        <li data-v-9dda4895>
                          <span data-v-9dda4895>{category}</span>
                        </li>
                        {data
                          .filter((item) => item.eventType === category)
                          .map((item, i) => (
                            <li key={i} data-v-9dda4895>
                              <Link
                                onClick={handleHideDropdown}
                                to={`/event-details/${item?.eventTypeId}/${item?.eventId}`}
                                data-v-9dda4895
                              >
                                {item?.name} {item?.openDate}
                              </Link>
                            </li>
                          ))}
                      </Fragment>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </ModalWrapper>
        </div>
      </div>
    </Fragment>
  );
};

export default MobileSearch;
