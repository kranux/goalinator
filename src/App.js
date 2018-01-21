import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import {formatTime} from './utils';

import GoalListItem from './components/goal-list-item';

const formItem = (label, input) => (
  <div className="form-item">
    <label>{label}</label>
    {input}
  </div>
);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newGoalForm: undefined,
      goals: require('./mock/goals.json'),
      progress: require('./mock/progress.json'),
      progressVisible: undefined
    }

    this.showAddGoal = this.showAddGoal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.showProgress = this.showProgress.bind(this);
    this.closeProgress = this.closeProgress.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      ...this.state,
      goals: [...this.state.goals, this.state.newGoalForm],
      newGoalForm: undefined
    });
    event.preventDefault();
  }

  handleChange(event) {
    const parsedValue = event.target.type === 'checkbox' ? Boolean(event.target.checked) : event.target.value;
    const newGoalForm = this.state.newGoalForm;
    newGoalForm[event.target.name] = parsedValue

    this.setState({newGoalForm});
  }

  showAddGoal() {
    this.setState({
      newGoalForm: {
        name: '',
        startlValue: 0,
        startTime: new Date(),
        goalDate: undefined,
        goalValue: 0
      }
    });
  }

  showProgress(goal) {
    this.setState({
      progressVisible: {
        goal,
        items: this.state.progress.filter(progress => progress.goal === goal.id)
      }
    })
  }

  closeProgress() {
    this.setState({
      progressVisible: undefined
    });
  }

  render() {
    
    return (
      <div>
        <button onClick={this.showAddGoal}>Add Goal</button>
        {this.state.newGoalForm ? <div className="dialog">
          <form onSubmit={this.handleSubmit}>
            {formItem('Name', 
              <input 
                name="name"
                onChange={this.handleChange}
                type="text"
                value={this.state.newGoalForm.name}
              />)}
            {formItem('Start value', 
              <input
                name="startValue"
                onChange={this.handleChange}
                type="number"
                value={this.state.newGoalForm.startValue}
              />)}
            {formItem('Start date',
              <input
                name="startTime"
                onChange={this.handleChange}
                type="date"
                value={formatTime(this.state.newGoalForm.startTime)}
              />)}
            {formItem('Goal value', 
              <input
                name="goalValue"
                onChange={this.handleChange}
                type="number"
                value={this.state.newGoalForm.goalValue}
              />)}
            {formItem('Goal date',
              <input
                name="goalTime"
                onChange={this.handleChange}
                type="date"
                value={formatTime(this.state.newGoalForm.goalTime)}
              />)}
            <button type="submit">Add</button>
          </form>
        </div> : null}
        <ul>
          {this.state.goals.map((goal, key) =>
            <GoalListItem goal={goal} key={key} showProgress={this.showProgress} />
          )}
        </ul>
        {this.state.progressVisible ? (
          <div>
            <a onClick={this.closeProgress}>x</a>
            <h2>{this.state.progressVisible.goal.name}</h2>
            <ul>
              {this.state.progressVisible.items.map((goal, key) => <li key={key}>{formatTime(goal.time)}: {goal.value}</li>)}
            </ul>
          </div>
        ): null}
      </div>
    );
  }
}

export default App;
