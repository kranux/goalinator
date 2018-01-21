import React from 'react';

import BaseForm from '../base-form';
import {formatTime} from '../../utils';

export default class GoalForm extends BaseForm {

  render() {
    return this.wrapFormElement([
     this.wrapInputElement('Name',
      <input
        name="name"
        onChange={this.handleChange}
        type="text"
        value={this.state.name}
      />),
      this.wrapInputElement('Start value',
        <input
          name="startValue"
          onChange={this.handleChange}
          type="number"
          value={this.state.startValue}
        />),
      this.wrapInputElement('Start date',
        <input
          name="startTime"
          onChange={this.handleChange}
          type="date"
          value={formatTime(this.state.startTime)}
        />),
      this.wrapInputElement('Goal value',
        <input
          name="goalValue"
          onChange={this.handleChange}
          type="number"
          value={this.state.goalValue}
        />),
      this.wrapInputElement('Goal date',
        <input
          name="goalTime"
          onChange={this.handleChange}
          type="date"
          value={formatTime(this.state.goalTime)}
        />)
    ]);
  };
}
