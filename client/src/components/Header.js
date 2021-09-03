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
      <thead>
        <tr>
          <th colSpan="3" className="w16"></th>
          {Object.entries(this.props.filterText).map(([key, value], index) => {
            return (
              <th scope="col" key={index}>
                <div>{key.replace('_', ' ').toUpperCase()}</div>
                <div>
                  <form>
                    <input
                      name={key}
                      type="text"
                      placeholder="Search..."
                      value={value}
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