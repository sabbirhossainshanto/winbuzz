import useBalance from "../../../hooks/balance";

const Balance = () => {
  const { data } = useBalance();

  return (
    <li data-v-9dda4895 className="balance-bx">
      {/* <span data-v-9dda4895 className="mobile-user-name">
        demo746
      </span> */}
      <div data-v-9dda4895 className="balance-head">
        <div data-v-9dda4895 className="bal-text">
          <span data-v-9dda4895>Bal:₹{data?.availBalance}</span>
        </div>
        <div data-v-9dda4895 className="exp-text">
          <span data-v-9dda4895>Exp: {data?.deductedExposure}</span>
        </div>
      </div>
    </li>
  );
};

export default Balance;
