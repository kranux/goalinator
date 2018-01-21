import React from 'react';

import {formatTime} from '../../utils';


const formItem = (label, input) => (
  <div className="form-item">
    <label>{label}</label>
    {input}
  </div>
);

export default class ProgressForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = props.value;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    this.props.elementUpdated(this.state);
    event.preventDefault();
  }

  handleChange(event) {
    const parsedValue = event.target.type === 'checkbox' ? Boolean(event.target.checked) : event.target.value;
    this.setState({[event.target.name]: parsedValue});
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  }

  render() {
    return(
      <div className="dialog">
        <form onSubmit={this.handleSubmit}>

          {formItem('Time',
            <input
              name="time"
              onChange={this.handleChange}
              type="date"
              value={formatTime(this.state.time)}
            />)}
          {formItem('Value',
            <input
              name="value"
              onChange={this.handleChange}
              type="number"
              value={this.state.value}
            />)}
          <button type="submit">Add</button>
        </form>
      </div>);
  };
}
