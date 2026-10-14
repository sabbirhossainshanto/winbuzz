import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { Link } from "react-router-dom";
import ModalWrapper from "../../modals/ModalWrapper/ModalWrapper";

const SearchBox = () => {
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
    setSearchText("");
    setData([]);
  };

  return (
    <li data-v-9dda4895 className="input-form">
      <ModalWrapper setModal={handleHideDropdown}>
        <div data-v-9dda4895 action>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            data-v-9dda4895
            type="text"
            className="form-control"
            placeholder="Search Events"
            maxLength={25}
            defaultValue="austr"
          />
          <span data-v-9dda4895 className="search-icon">
            <i data-v-9dda4895 className="fa-solid fa-magnifying-glass" />
          </span>
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
      </ModalWrapper>
    </li>
  );
};

export default SearchBox;
