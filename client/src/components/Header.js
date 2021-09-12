import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e);
  }

  render() {
    return (
      <thead className="MuiTableHead-root">
        <tr className="MuiTableRow-root MuiTableRow-head">
          <th className=/*"expand-collapse-row"*/"MuiTableCell-root MuiTableCell-head"></th>
          <th className=/*"add-delete-pipeline"*/"MuiTableCell-root MuiTableCell-head"></th>
          <th className=/*"_id"*/"MuiTableCell-root MuiTableCell-head"></th>
          {Object.entries(this.props.filterText).map(([key, value], index) => {
            return (
              <th scope="col" key={index} className=/*{key}*/"MuiTableCell-root MuiTableCell-head  MuiTableCell-alignRight">
                <div>{key.replace('_', ' ').toUpperCase()}</div>
                <div>
                  <form className={`form-${key}`}>
                    <input
                      name={key}
                      type="text"
                      placeholder="Search..."
                      value={value}
                      autoComplete="off"
                      onChange={this.handleFilterTextChange}
                    />
                  </form>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default Header;