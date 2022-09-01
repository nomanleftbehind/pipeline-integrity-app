import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { FieldError, RiskAllocationProgressSubscription } from '../graphql/generated/graphql';


interface IModalProps {
  children: ReactNode
}

export function Modal({ children }: IModalProps) {

  const [isBrowser, setIsBrowser] = useState(false);
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    setIsBrowser(true);
    if (modalRoot) modalRoot.appendChild(el);
    return () => {
      if (modalRoot) modalRoot.removeChild(el);
    }
  }, [el, modalRoot]);

  if (isBrowser && modalRoot) {
    return ReactDOM.createPortal(
      children,
      el
    );
  } else {
    return null;
  }
}


interface IModalFieldErrorProps {
  fieldError: FieldError;
  hideFieldError: () => void;
  executeFunction?: () => void;
}

export function ModalFieldError({ fieldError: { field, message }, hideFieldError, executeFunction }: IModalFieldErrorProps) {
  return (
    <Modal>
      <div className='modal'>
        <div className='modal-box'>
          <div>
            {/* {`Field: ${field}`}<br />
            {`Message: ${message}`} */}
            {message}
          </div>
          {executeFunction && <button onClick={executeFunction}>OK</button>}
          <button onClick={hideFieldError}>{executeFunction ? 'Cancel' : 'OK'}</button>
        </div>
      </div>
    </Modal>
  );
}

interface IModalAllocationProgressProps {
  progress: RiskAllocationProgressSubscription['riskAllocationProgress'];
}

export function ModalAllocationProgress({ progress: { progress, numberOfItems } }: IModalAllocationProgressProps) {
  return (
    <Modal>
      <div className='modal'>
        <div className='modal-box'>
          <div>
            {`Allocated ${progress} out of ${numberOfItems}`}
          </div>
          <div style={{ width: '100%', border: '1px solid black', padding: '1px' }}>
            <div style={{ width: `${(progress / numberOfItems) * 100}%`, backgroundColor: 'blue', height: '20px' }}></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export const openAllocationProgressModal = ({ progress, numberOfItems }: RiskAllocationProgressSubscription['riskAllocationProgress']) => {
  return progress !== 0 && numberOfItems !== 0;
}