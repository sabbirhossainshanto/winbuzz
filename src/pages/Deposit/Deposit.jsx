import { useState } from "react";
import SelectAmount from "../../components/modules/Deposit/SelectAmount";
import BankAccount from "../../components/modules/Deposit/BankAccount";

const Deposit = () => {
  const [tab, setTab] = useState("amountBox");
  const [amount, setAmount] = useState(null);

  return (
    <>
      {tab === "amountBox" && (
        <SelectAmount amount={amount} setAmount={setAmount} setTab={setTab} />
      )}
      {tab === "bankAccount" && (
        <BankAccount amount={amount} setAmount={setAmount} setTab={setTab} />
      )}
    </>
  );
};

export default Deposit;
