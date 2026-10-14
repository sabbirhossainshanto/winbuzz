import { Fragment, useEffect, useState } from "react";
import EventRow from "../../shared/EventRow/EventRow";
import { useGroupQuery } from "../../../redux/features/events/events";
import { eventNames } from "../../../utils/eventNames";
import { filterLiveVirtual } from "../../../utils/filter-live-virtual";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const EventSection = () => {
  const { getLanguage } = useLanguage();
  const [liveVirtual, setLiveVirtual] = useState([]);
  const { data } = useGroupQuery(
    { sportsType: 0 },
    {
      pollingInterval: 1000,
    },
  );

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      const categories = Array.from(
        new Set(
          Object.values(data)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId),
        ),
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [data]);

  const onChangeLiveVirtual = (type, eventTypeId, isChecked) => {
    const obj = { type, eventTypeId, isChecked };

    setLiveVirtual((prev) => {
      const index = prev.findIndex(
        (item) => item.eventTypeId === eventTypeId && item.type === type,
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isChecked,
        };
        return updated;
      }

      return [...prev, obj];
    });
  };
  return (
    <Fragment>
      {categories?.map((category) => {
        const groupedData = filterLiveVirtual(liveVirtual, category, data);
        return (
          <Fragment key={category}>
            <div
              data-v-56384811
              className="inplay-popular-header inplay-header-color"
            >
              <div data-v-56384811 className="inplay-popular-header__logo">
                <i
                  data-v-56384811
                  className="fa fa-play-circle inplay-popular-header__logo-icon"
                />
                <span
                  data-v-56384811
                  className="inplay-popular-header__logo-text"
                >
                  {eventNames[category]}
                </span>
                <ul data-v-56384811 className="live_virtual">
                  <li data-v-56384811>
                    <input
                      onChange={(e) =>
                        onChangeLiveVirtual("live", category, e.target?.checked)
                      }
                      data-v-56384811
                      type="checkbox"
                      className="filter-checkbox"
                    />
                    <label data-v-56384811>
                      {getLanguage(LanguageKey.LIVE)}
                    </label>
                  </li>
                  <li data-v-56384811>
                    <input
                      onChange={(e) =>
                        onChangeLiveVirtual(
                          "virtual",
                          category,
                          e.target?.checked,
                        )
                      }
                      data-v-56384811
                      type="checkbox"
                      className="filter-checkbox"
                    />
                    <label data-v-56384811>
                      {getLanguage(LanguageKey.VIRTUAL)}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <section data-v-56384811>
              <section data-v-56384811 className="bet-details-sec">
                <div data-v-56384811>
                  {data &&
                    groupedData?.map(([keys], index) => {
                      if (!data?.[keys]?.visible) {
                        return null;
                      }

                      return (
                        <EventRow
                          key={index}
                          data={data}
                          keys={keys}
                          category={category}
                        />
                      );
                    })}
                </div>
              </section>
            </section>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default EventSection;
