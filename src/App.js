import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import {formatTime} from './utils';

import GoalListItem from './components/goal-list-item';
import GoalForm from './components/goal-form';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newGoalForm: undefined,
      goals: require('./mock/goals.json'),
      progress: require('./mock/progress.json'),
      progressVisible: undefined
    };

    this.showAddGoal = this.showAddGoal.bind(this);
    this.elementUpdated = this.elementUpdated.bind(this);

    this.showProgress = this.showProgress.bind(this);
    this.closeProgress = this.closeProgress.bind(this);
  }

  elementUpdated(element) {
    this.setState({
      ...this.state,
      goals: [...this.state.goals, element],
      newGoalForm: undefined
    });
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
        {this.state.newGoalForm ? <GoalForm value={this.state.newGoalForm} elementUpdated={this.elementUpdated} /> : null}
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
