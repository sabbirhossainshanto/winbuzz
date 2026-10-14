import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useDispatch } from "react-redux";

const ModalWrapper = ({ children, setModal, redux = false }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  useCloseModalClickOutside(ref, () => {
    if (redux) {
      dispatch(setModal(false));
    } else {
      setModal(false);
    }
  });

  return <div ref={ref}>{children}</div>;
};

export default ModalWrapper;
