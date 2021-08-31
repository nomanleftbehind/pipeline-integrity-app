import React from 'react';
// import '../styles/injection-point-form.css';
// import { ReactComponent as OkIcon } from '../svg/ok-icon.svg';

class InjectionPointForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onInjectionPointChange(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onToggleInjectionPointSubmitForm(e);
    this.props.onInjectionPointChangeSubmit(e);
  }

  render() {
    const injectionPoint = this.props.modifiedInjectionPoint ? this.props.modifiedInjectionPoint : this.props.inj_pt_id;
    return (
      <form className="hide-submit" name={injectionPoint} onSubmit={this.handleSubmit}>
        <select value={injectionPoint} onChange={this.handleChange}>
          {this.props.injectionPointOptions.map(option => {
            return (
              <option key={option._id} value={option._id}>{option.source}</option>
            );
          })}
        </select>
        <label>
          <input type="submit" />
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 16.292969 8.2929688 L 10 14.585938 L 7.7070312 12.292969 L 6.2929688 13.707031 L 10 17.414062 L 17.707031 9.7070312 L 16.292969 8.2929688 z" /></svg>
        </label>
      </form>
    );
  }
}

export default InjectionPointForm;