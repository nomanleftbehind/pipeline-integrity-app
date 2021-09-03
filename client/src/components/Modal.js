import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}


export function ModalDeletePipeline({ segment, license, deletePipeline, hideModalDeletePipeline }) {

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


export function ModalDuplicateInjectionPoint({ hideDuplicateInjectionPointModal }) {

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