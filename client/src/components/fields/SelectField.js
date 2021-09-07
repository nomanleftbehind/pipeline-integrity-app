import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../svg/cancel-icon.svg';
import { ReactComponent as OkIcon } from '../../svg/ok-icon.svg';

function SelectField({ _id, record, columnName, options, fetchPipelines }) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(record);

  const toggleEdit = () => {
    setEdit(!edit);
    setState(record);
  }

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5002/pipeline/" + _id + "/column", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ record: e.target.name, column: columnName }),
    })
      .then(response => {
        if (response.ok) {
          fetchPipelines();
        } else {
          throw new Error("HTTP status " + response.status);
        }
        console.log(response.ok);
        return response.json()
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    toggleEdit();
  };

  return (
    <td>
      <div>
        <div className="button-container cell-right">
          <button onClick={toggleEdit}>{edit ? <CancelIcon /> : <EditIcon />}</button>
        </div>
        {edit ?
          <div className="cell-left">
            <form className={`form-${columnName}`} name={state} onSubmit={handleSubmit}>
              <div className="cell-left">
                <select name={columnName} value={state} onChange={handleChange}>
                  {options.map(option => {
                    return (
                      <option key={option} value={option}>{option}</option>
                    );
                  })}
                </select>
              </div>
              <div className="button-container cell-right">
                <button type="submit"><OkIcon /></button>
              </div>
            </form>
          </div> :
          <div className="cell-left">
            <span>{record}</span>
          </div>}
      </div>
    </td>
  );
}

export default SelectField;