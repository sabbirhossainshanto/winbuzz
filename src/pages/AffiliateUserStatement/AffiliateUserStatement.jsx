import { useLocation } from "react-router-dom";
import { useGetIndex } from "../../hooks";
import { from_date, to_date } from "../../utils/default-date";
import images from "../../assets/images";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const AffiliateUserStatement = () => {
  const { getLanguage } = useLanguage();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const punter_id = params.get("punter_id");

  const { data } = useGetIndex({
    type: "get_affiliate_statement",
    from_date,
    to_date,
    punter_id,
  });

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
      <div className="flex flex-col h-full">
        <section
          data-v-fd406c30
          className="nw-affi-user-wrapper affi-pd-bot px-2"
        >
          <div data-v-fd406c30 className>
            <div data-v-fd406c30 className="nw-affi-user-list-wrapper">
              <h3 data-v-fd406c30 className="nw-affi-heading-text">
                {getLanguage(LanguageKey.USER_STATEMENT)}
              </h3>
              <div
                data-v-fd406c30
                className="table-responsive nw-affi-user-table"
              >
                <table data-v-fd406c30 className="table">
                  <thead data-v-fd406c30>
                    <tr data-v-fd406c30>
                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src={images.calendar}
                          alt="affi-calendar"
                        />{" "}
                        {getLanguage(LanguageKey.DATE)}
                      </th>
                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZVJREFUWIXtl08rhUEUxn8HO4qVKAtEwsKflSxYyEe4X4PIRkpkK/kcvoIit9ydv0UWtq66K3S3t8finVvX28vMdSdv5NnMvOc9c55nZs6pOZAzLMsoqQeYBzoj8VSBkpm9ej0lDUt6VnyUJQ2l+ToyNKwCfcAV8Njq1h1GgBlgBVj70lPSkVNciESOpIKLeZT+1xaL5LsIEiBpWtJULgIc8QVwWRch6Swg6U6jCEjradLfi6wq+AAzu5E06+a3blz8MQF1EbEI08i9CrwnIKkXKLrPBTOrSFoH5jxLS2Z22LIAYAoYa5gfAxtAv2fdPBBFwAmwR1IBJ862DEx41t0HxA6qghqwnbLdAXchBD78iiRsB3ZJrmDHzGqSJgm4AndSrQkAloAtNy+SJOEx/iR8AgZiCLgGHkhO4NrZ9gkow4DYQUlYAcZTtoOQ4CHIPQn/3HvgRdJoVAFpPU36e/H/Hsi9CrJO4NmNmxF7g3piPnk9lbRm5SZarlCUJQ2m+T5rTrtJHhRdLey6EVXg3MzeIsWLh3fh94EUshpERQAAAABJRU5ErkJggg=="
                          alt="affi-calendar"
                        />{" "}
                        {getLanguage(LanguageKey.TYPE)}
                      </th>
                      <th data-v-fd406c30>
                        <img
                          data-v-fd406c30
                          src={images.commission}
                          alt="affi-commision-icon"
                        />{" "}
                        {getLanguage(LanguageKey.AMOUNT)}
                      </th>
                    </tr>
                  </thead>
                  <tbody data-v-fd406c30>
                    {data?.result?.length > 0 ? (
                      data?.result?.map((item) => {
                        return (
                          <tr key={item?.punter_id} data-v-fd406c30="">
                            <td data-v-fd406c30="">{item?.date_added}</td>

                            <td data-v-fd406c30="">{item?.type}</td>
                            <td data-v-fd406c30="">
                              <span
                                data-v-fd406c30=""
                                className={`${
                                  item?.amount > 0
                                    ? "text-text_Success"
                                    : "text-text_Danger"
                                }`}
                              >
                                {item?.amount}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr data-v-fd406c30 className="tabetdat">
                        <td data-v-fd406c30 colSpan={5}>
                          <div
                            data-v-fd406c30
                            className="text-center affiliate-no-recoard-data"
                          >
                            {getLanguage(LanguageKey.NO_RECORD_FOUND)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AffiliateUserStatement;
