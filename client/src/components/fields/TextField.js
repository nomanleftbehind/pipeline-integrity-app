import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../svg/cancel-icon.svg';
import { ReactComponent as OkIcon } from '../../svg/ok-icon.svg';

function TextField({ _id, record, columnName, regex, fetchPipelines }) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(record);

  const toggleEdit = () => {
    setEdit(!edit);
    setState(record);
  }

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const validateForm = () => {
    return regex.test(state);
  }

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
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        } else {
          fetchPipelines();
        }
        return response.json();
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
                <input
                  className={validateForm() ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange}
                />
              </div>
              <div className="button-container cell-right">
                <button type="submit" disabled={!validateForm()}><OkIcon /></button>
              </div>
            </form>
          </div> : /*null*/
          <div className="cell-left">
            <span>{record}</span>
          </div>}
      </div>
    </td>
  );
}


export default TextField;