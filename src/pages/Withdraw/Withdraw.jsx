import { useState } from "react";
import ChooseAmount from "../../components/modules/Withdraw/ChoseAmount";
import BankAccount from "../../components/modules/Withdraw/BankAccount/BankAccount";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState("choseAmount");
  return (
    <>
      {tab === "choseAmount" && (
        <ChooseAmount amount={amount} setAmount={setAmount} setTab={setTab} />
      )}
      {tab === "bank" && <BankAccount amount={amount} />}
    </>
  );
};

export default Withdraw;
