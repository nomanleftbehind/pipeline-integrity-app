// eslint-disable-next-line
import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';




// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement('div');
//   }

//   componentDidMount() {
//     modalRoot.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     modalRoot.removeChild(this.el);
//   }

//   render() {
//     return ReactDOM.createPortal(
//       this.props.children,
//       this.el,
//     );
//   }
// }

interface IModalProps {
  children: ReactNode
}

function Modal({ children }: IModalProps) {
  
  
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
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


interface IModalDeletePipelineProps {
  segment: string;
  license: string;
  deletePipeline: () => void;
  hideModalDeletePipeline: () => void;
}

export function ModalDeletePipeline({ license, segment, deletePipeline, hideModalDeletePipeline }: IModalDeletePipelineProps) {

  return (
    <Modal>
      <div className="modal">
        <div className="modal-box">
          <div>
            Are you sure you want to delete {`${license}-${segment}`} pipeline?
          </div>
          <button onClick={deletePipeline}>Delete</button>
          <button onClick={hideModalDeletePipeline}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

interface IModalDuplicateInjectionPoint {
  hideDuplicateInjectionPointModal: () => void
}

export function ModalDuplicateInjectionPoint({ hideDuplicateInjectionPointModal }: IModalDuplicateInjectionPoint) {

  return (
    <Modal>
      <div className="modal">
        <div className="modal-box">
          <div>
            Selected source already is injection point to the respective pipeline!
          </div>
          <button onClick={hideDuplicateInjectionPointModal}>OK</button>
        </div>
      </div>
    </Modal>
  );
}