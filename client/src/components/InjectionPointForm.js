import React from 'react';

class InjectionPointForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onInjectionPointChange(e);
    // console.log(this.props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onToggleInjectionPointSubmitForm(e);
    this.props.onInjectionPointChangeSubmit(e);
  }

  render() {
    const injectionPoint = this.props.modifiedInjectionPoint ? this.props.modifiedInjectionPoint : this.props.inj_pt_id;
    return (
      <form name={injectionPoint} onSubmit={this.handleSubmit}>
        <select value={injectionPoint} onChange={this.handleChange}>
          {this.props.injectionPointOptions.map(option => {
            return (
              <option key={option._id} value={option._id}>{option.source}</option>
            );
          })}
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InjectionPointForm;