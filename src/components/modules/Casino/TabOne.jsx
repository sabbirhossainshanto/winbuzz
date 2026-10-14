import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TabOne = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedCategory, categories]);
  return (
    <ul
      style={{ scrollBehavior: "smooth" }}
      data-v-15497d74
      className="nav nav-pills casino-provider-list"
      id="pills-tab"
      role="tablist"
    >
      <li
        ref={selectedCategory === "All" ? activeRef : null}
        data-v-15497d74
        className="nav-item"
        role="presentation"
      >
        <button
          onClick={() => {
            navigate(`/casino?product=All&category=All`);
          }}
          data-v-15497d74
          className={`nav-link  ${selectedCategory === "All" ? "active" : "list-menu"}`}
          id="pills-all12-tab"
          role="tab"
        >
          <span data-v-15497d74>All</span>
        </button>
      </li>
      {categories?.map((category) => {
        return (
          <li
            ref={category === selectedCategory ? activeRef : null}
            key={category}
            data-v-15497d74
            className="nav-item"
            role="presentation"
          >
            <button
              onClick={() => {
                navigate(`/casino?product=${category}&category=All`);
              }}
              data-v-15497d74
              className={`nav-link  ${
                selectedCategory === category ? "active" : "list-menu"
              }`}
              id="pills-all12-tab"
              role="tab"
            >
              <span data-v-15497d74>{category}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabOne;
