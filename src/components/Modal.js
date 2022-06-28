import '../Modal.css';
import { UserInputContext } from '../contexts';
import { useContext } from 'react';

const Modal = () => {
  const { setOpenModal, sendData } = useContext(UserInputContext);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>When you click "Continue" your custom van configuaration, rough estimate, and contact info will be sent to our sales team. They will then reach out to you to schedule a call and take a deposit. </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={sendData}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;