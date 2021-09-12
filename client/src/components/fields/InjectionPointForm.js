import React from 'react';
import { ReactComponent as OkIcon } from '../../svg/ok-icon.svg';

function InjectionPointForm({ inj_pt_id, injectionPointOptions, modifiedInjectionPoint, onToggleInjectionPointSubmitForm, onInjectionPointChange, onInjectionPointChangeSubmit }) {

  const handleChange = (e) => {
    e.preventDefault();
    onInjectionPointChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onToggleInjectionPointSubmitForm(e);
    onInjectionPointChangeSubmit(e);
  }

  const injectionPoint = modifiedInjectionPoint ? modifiedInjectionPoint : inj_pt_id;
  return (
    <form className="cell-l" name={injectionPoint} onSubmit={handleSubmit}>
      <div className="form-l">
        <select value={injectionPoint} onChange={handleChange}>
          {injectionPointOptions.map(option => {
            return (
              <option key={option._id} value={option._id}>{option.source}</option>
            );
          })}
        </select>
      </div>
      <div className="form-r">
        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" type="submit"><OkIcon /></button>
      </div>
    </form>
  );
}

export default InjectionPointForm;