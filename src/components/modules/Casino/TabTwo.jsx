import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TabTwo = ({ subCategories, product, selectedSubCategory }) => {
  const activeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedSubCategory, subCategories, product]);
  return (
    <ul
      style={{ scrollBehavior: "smooth" }}
      data-v-15497d74
      className="nav nav-pills sub-casino-provider-list"
      id="pills-tab"
      role="tablist"
    >
      <li
        ref={selectedSubCategory === "All" ? activeRef : null}
        onClick={() => {
          navigate(`/casino?product=${product}&category=All`);
        }}
        data-v-15497d74
        className="nav-item"
        role="presentation"
      >
        <button
          data-v-15497d74
          className={`nav-link list-menu ${selectedSubCategory === "All" ? "active" : ""}`}
          id="pills-all-int-tab"
        >
          <span data-v-15497d74>
            <img
              data-v-15497d74
              loading="lazy"
              src="https://tezcdn.io/casino/int-casino-icon/all.webp"
              alt=""
              data-fallback-applied="true"
            />
          </span>{" "}
          <span> All</span>
        </button>
      </li>
      {subCategories?.map((category) => {
        return (
          <li
            ref={category === selectedSubCategory ? activeRef : null}
            onClick={() => {
              navigate(`/casino?product=${product}&category=${category}`);
            }}
            key={category}
            data-v-15497d74
            className="nav-item"
            role="presentation"
          >
            <button
              data-v-15497d74
              className={`nav-link list-menu ${selectedSubCategory === category ? "active" : ""}`}
              id="pills-all-int-tab"
            >
              <span data-v-15497d74>
                <img
                  data-v-15497d74
                  loading="lazy"
                  src={`/icon/${category?.split(" ").join("").toLowerCase()}.svg`}
                  alt=""
                  data-fallback-applied="true"
                />
              </span>{" "}
              {category}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabTwo;
