import React from 'react';

import BaseForm from '../base-form'
import {formatTime} from '../../utils';

export default class ProgressForm extends BaseForm {

  render() {
    return this.wrapFormElement([
      this.wrapInputElement('Time',
        <input
          name="time"
          onChange={this.handleChange}
          type="date"
          value={formatTime(this.state.time)}
        />),
      this.wrapInputElement('Value',
        <input
          name="value"
          onChange={this.handleChange}
          type="number"
          value={this.state.value}
        />)
    ]);
  };
}
