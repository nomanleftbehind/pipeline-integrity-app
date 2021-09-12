import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../svg/edit-icon.svg';
import { ReactComponent as CancelIcon } from '../../svg/cancel-icon.svg';
import { ReactComponent as OkIcon } from '../../svg/ok-icon.svg';

function TextField({ _id, record, columnName, validator, fetchPipelines }) {
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
    if (validator instanceof RegExp) {
      return validator.test(state);
    } else {
      return true;
    }
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
    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight">
      <div className="cell-wrapper">
        <div className="cell-r">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={toggleEdit}>{edit ? <CancelIcon /> : <EditIcon />}</button>
        </div>
        {edit ?
          <form className="cell-l" name={state} onSubmit={handleSubmit}>
            <div className="form-l">
              {validator instanceof RegExp ?
                <input
                  className={validateForm() ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange}
                /> :
                <select name={columnName} value={state} onChange={handleChange}>
                  {validator.map(option => {
                    return (
                      <option key={option} value={option}>{option}</option>
                    );
                  })}
                </select>}
            </div>
            <div className="form-r">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" type="submit" disabled={!validateForm()}><OkIcon /></button>
            </div>
          </form> :
          <div className="cell-l">
            <div>{record}</div>
          </div>}
      </div>
    </td>
  );
}


export default TextField;