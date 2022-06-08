import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { FieldError } from '../graphql/generated/graphql';


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
  }, [el]);

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
            {`Field: ${field}`}<br />
            {`Message: ${message}`}
          </div>
          {executeFunction && <button onClick={executeFunction}>OK</button>}
          <button onClick={hideFieldError}>{executeFunction ? 'Cancel' : 'OK'}</button>
        </div>
      </div>
    </Modal>
  );
}