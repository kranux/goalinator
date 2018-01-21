import React from 'react';

import {formatTime} from '../../utils';


const formItem = (label, input) => (
  <div className="form-item">
    <label>{label}</label>
    {input}
  </div>
);

export default class GoalForm extends React.Component {

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
          {formItem('Name',
            <input
              name="name"
              onChange={this.handleChange}
              type="text"
              value={this.state.name}
            />)}
          {formItem('Start value',
            <input
              name="startValue"
              onChange={this.handleChange}
              type="number"
              value={this.state.startValue}
            />)}
          {formItem('Start date',
            <input
              name="startTime"
              onChange={this.handleChange}
              type="date"
              value={formatTime(this.state.startTime)}
            />)}
          {formItem('Goal value',
            <input
              name="goalValue"
              onChange={this.handleChange}
              type="number"
              value={this.state.goalValue}
            />)}
          {formItem('Goal date',
            <input
              name="goalTime"
              onChange={this.handleChange}
              type="date"
              value={formatTime(this.state.goalTime)}
            />)}
          <button type="submit">Add</button>
        </form>
      </div>);
  };
}
