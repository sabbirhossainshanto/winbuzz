import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBankAccountMutation } from "../../redux/features/deposit/event.api";
import { useAccountStatement } from "../../hooks/accountStatement";
import Complaint from "../../components/modals/Complaint/Complaint";
import ShowImage from "../../components/modals/ShowImage/ShowImage";
import { Settings } from "../../api";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const WithdrawReport = () => {
  const { getLanguage } = useLanguage();
  const [deleteWithdraw] = useBankAccountMutation();
  const [complaintId, setComplaintId] = useState(null);
  const [image, setImage] = useState("");
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "WITHDRAW",
    status: "ALL",
  };
  const { data: withdrawStatement, refetch } = useAccountStatement(payload);
  const [category, setCategory] = useState([]);
  //   const [showModal, setShowModal] = useState(false);
  //   const [image, setImage] = useState("");

  useEffect(() => {
    if (withdrawStatement?.result?.length > 0) {
      const categories = Array.from(
        new Set(
          withdrawStatement?.result?.map((item) => item?.date?.split(" ")?.[0]),
        ),
      );
      setCategory(categories);
    }
  }, [withdrawStatement]);

  const handleDeleteWithdraw = async (withdraw_id) => {
    const payload = {
      type: "withdrawDelete",
      withdraw_id,
    };
    const res = await deleteWithdraw(payload).unwrap();

    if (res?.success) {
      refetch();
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  return (
    <>
      {complaintId && (
        <Complaint setComplaintId={setComplaintId} method="withdraw" />
      )}
      {image && <ShowImage image={image} setShowImage={setImage} />}
      <div className="col-12 col-sm-12 col-md-12 col-lg-10 box-shd-gap">
        <div className="rounded-lg flex flex-col gap-y-2 px-2 overflow-clip mt-2 ">
          {withdrawStatement?.result?.length > 0 ? (
            <>
              {category?.map((category) => {
                return (
                  <>
                    <div className="flex justify-center items-center sticky top-12">
                      <div className="text-center bg-bg_Quaternary px-2.5 py-1 font-bold rounded text-[10px] shadow-sm">
                        {category}
                      </div>
                    </div>
                    {withdrawStatement?.result
                      ?.filter(
                        (item) => item?.date?.split(" ")?.[0] === category,
                      )
                      ?.map((data, i) => {
                        return (
                          <div
                            key={i}
                            className="flex  flex-col  border bg-bg_Quaternary rounded overflow-hidden shadow-lg"
                          >
                            <div className="flex justify-between items-start text-[10px] font-bold h-full">
                              <div className="text-base px-3 py-1">
                                {getLanguage(LanguageKey.WITHDRAW)}
                              </div>
                              <div
                                className={`px-3 py-1 text-x xs:text-xs sm:text-sm font-semibold  rounded-bl h-full   
                            
                            ${
                              data?.status === "APPROVED" ? "bg-green-500 " : ""
                            } ${
                              data?.status === "REJECTED" ? "bg-red-500 " : ""
                            } ${
                              data?.status === "PENDING" ? "bg-orange-500 " : ""
                            }
                            `}
                              >
                                {data?.status}
                              </div>
                            </div>
                            <div className="flex  justify-between  mt-2">
                              <span className="flex flex-col justify-center flex-1 px-3">
                                <span className="text-xs font-normal">
                                  {data?.remark}
                                </span>
                              </span>
                              {data?.image && (
                                <span
                                  onClick={() => setImage(data?.image)}
                                  className="flex-1 flex justify-end cursor-pointer px-3"
                                >
                                  <img
                                    className="size-12"
                                    src={data?.image}
                                    alt=""
                                  />
                                </span>
                              )}
                              <span className="text-start text-lg flex flex-col items-end justify-end tracking-tighter  flex-1 ">
                                <span className="font-bold px-3 mb-2">
                                  ₹ {data?.amount}{" "}
                                </span>
                                <div className="flex gap-x-2">
                                  {data.status === "PENDING" &&
                                    data?.reject_request === 0 && (
                                      <button
                                        style={{
                                          backgroundColor: "rgb(255 131 46)",
                                        }}
                                        onClick={() =>
                                          handleDeleteWithdraw(
                                            data?.withdraw_id,
                                          )
                                        }
                                        className="px-2 py-1 text-xs xs:text-xs sm:text-sm font-semibold  rounded-tl rounded-tr h-fit tracking-normal"
                                      >
                                        {getLanguage(
                                          LanguageKey.CANCEL_WITHDRAWAL,
                                        )}
                                      </button>
                                    )}

                                  {data.status === "PENDING" &&
                                    data?.reject_request === 1 && (
                                      <p className="px-2 py-1 text-xs xs:text-xs sm:text-sm font-semibold  rounded-tl rounded-tr h-fit tracking-normal">
                                        {getLanguage(
                                          LanguageKey.WITHDRAW_DELETE_REQUEST_SENT,
                                        )}
                                      </p>
                                    )}
                                  {Settings.complaint && (
                                    <button
                                      style={{
                                        backgroundColor: "rgb(255 131 46)",
                                      }}
                                      onClick={() =>
                                        setComplaintId(data?.referenceNo)
                                      }
                                      className="px-2 py-1 text-xs xs:text-xs sm:text-sm font-semibold  rounded-tl h-fit tracking-normal"
                                    >
                                      {getLanguage(LanguageKey.REPORT_ISSUE)}
                                    </button>
                                  )}
                                </div>
                              </span>
                            </div>
                            <div className="text-xs py-1 text-center text-text_Quinary w-full border-t bg-bg_Ternary6">
                              {data?.date}
                            </div>
                          </div>
                        );
                      })}
                  </>
                );
              })}
            </>
          ) : (
            <div className="flex items-center justify-center pt-20">
              <p>{getLanguage(LanguageKey.NO_TRANSACTION_YET)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WithdrawReport;
