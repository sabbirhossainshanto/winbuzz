import { Loader } from "rsuite";
import TabOne from "../../components/modules/Casino/TabOne";
import TabTwo from "../../components/modules/Casino/TabTwo";
import Thumbnails from "../../components/modules/Casino/Thumbnails";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetIndex } from "../../hooks";
const Casino = () => {
  const [search] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product = params.get("product");
  const category = params.get("category");
  const { data } = useGetIndex({
    type: "99_all_casino",
  });

  const allTables = data?.data?.allTables;
  const allGames = useMemo(() => {
    if (!allTables) return [];
    return Object.values(allTables).flatMap((provider) =>
      Object.values(provider).flat(),
    );
  }, [allTables]);
  // const tablesGames =
  //   tables &&
  //   Object.values(tables).flatMap((provider) => Object.values(provider).flat());

  const categories =
    allGames && Array.from(new Set(allGames?.map((game) => game?.product)));

  // const a =
  //   allGames && allGames?.find((game) => game.product === "BIKINI GAMES");
  // console.log(a);
  // console.log(categories);

  const subCategories = useMemo(() => {
    if (allGames && categories && product === "All") {
      return Array.from(new Set(allGames?.map((game) => game?.category)));
    }
    if (allGames && categories && product !== "All") {
      const allCategory = allGames?.filter((game) => game?.product === product);
      return Array.from(new Set(allCategory?.map((game) => game?.category)));
    }
  }, [categories, allGames, product]);

  const filteredData = useMemo(() => {
    if (allGames && categories && subCategories) {
      if (search) {
        return allGames?.filter((game) => game?.category?.includes(search));
      }
      if (!search) {
        if (product === "All" && category === "All") {
          return allGames;
        }
        if (product === "All" && category !== "All") {
          return allGames?.filter((game) => game?.category === category);
        }
        if (product !== "All" && category === "All") {
          return allGames?.filter((game) => game?.product === product);
        }
        if (product !== "All" && category !== "All") {
          return allGames?.filter(
            (game) => game?.product === product && game?.category === category,
          );
        }
      }
    }
  }, [allGames, categories, category, subCategories, product, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product, category, location.search]);

  if (!data) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div>
        <div data-v-15497d74 className="right-side-bar-main-sec">
          <div data-v-15497d74 className="section-listing-page">
            <section data-v-15497d74 className="bet-details-sec">
              {/* <div data-v-15497d74 className="casino-header-search">
                <input
                  data-v-15497d74
                  type="text"
                  className="form-control"
                  placeholder="Search Casino"
                />

                <button data-v-15497d74 className="btn search-casino-cta">
                  <i data-v-15497d74 className="fa-solid fa-magnifying-glass" />
                </button>
              </div> */}
              <div data-v-15497d74 className="int-casino-main-body-sec">
                <div data-v-15497d74 className="int-casino-main-tabs">
                  <div
                    data-v-15497d74
                    className="tab-content"
                    id="pills-tabContent"
                  >
                    <div
                      data-v-15497d74
                      className="tab-pane fade show active"
                      id="pills-all-int"
                      role="tabpanel"
                      aria-labelledby="pills-all-int-tab"
                    >
                      <div data-v-15497d74 className="all-game-details-page">
                        <TabOne
                          categories={categories}
                          selectedCategory={product}
                        />
                        <TabTwo
                          product={product}
                          selectedSubCategory={category}
                          subCategories={subCategories}
                        />
                        <Thumbnails data={filteredData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casino;
