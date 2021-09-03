import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../svg/cancel-icon.svg';
import { ReactComponent as OkIcon } from '../../svg/ok-icon.svg';

function TExtField({ _id, field, columnName, regex, fetchPipelines }) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(field);

  const toggleEdit = () => {
    // console.log(columnName);
    setEdit(!edit);
    setState(field);
  }

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const validateForm = () => {
    return regex.test(state);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5002/pipeline/" + _id + "/" + columnName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [columnName]: e.target.name }),
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
        // fetchPipelines();
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
        <div className="cell-top">
          <div className="cell-left">
            <span>{field}</span>
          </div>
          <div className="button-container cell-right">
            <button onClick={toggleEdit}>{edit ? <CancelIcon /> : <EditIcon />}</button>
          </div>
        </div>
        <div className="cell-bottom">
          {edit ?
            <form className="edit-text-form" name={state} onSubmit={handleSubmit}>
              <div className="cell-left">
                <input className={validateForm() ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange} />
              </div>
              <div className="button-container cell-right">
                <button type="submit" disabled={!validateForm()}><OkIcon /></button>
              </div>
            </form> : null
          }
        </div>
      </div>
    </td>
  );
}


export default TExtField;