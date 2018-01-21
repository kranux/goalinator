import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import {formatTime} from './utils';

import GoalListItem from './components/goal-list-item';
import GoalForm from './components/goal-form';
import ProgressForm from './components/progress-form';

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
    this.goalElementUpdated = this.goalElementUpdated.bind(this);

    this.showProgress = this.showProgress.bind(this);
    this.closeProgress = this.closeProgress.bind(this);

    this.showRegisterProgress = this.showRegisterProgress.bind(this);
    this.progressElementUpdated = this.progressElementUpdated.bind(this);
  }

  goalElementUpdated(element) {
    this.setState({
      goals: [...this.state.goals, element],
      newGoalForm: undefined
    });
  }

  progressElementUpdated(element) {
    this.setState({
      progress: [...this.state.progress, element],
      registerProgressForm: undefined
    })
  }

  showAddGoal() {
    this.setState({
      newGoalForm: {
        name: '',
        startValue: 0,
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

  showRegisterProgress(goal) {
    this.setState({
      registerProgressForm: {
        goal: goal.id,
        time: new Date(),
        value: 0
      }
    });
  }

  render() {

    return (
      <div>
        <button onClick={this.showAddGoal}>Add Goal</button>
        {this.state.newGoalForm ?
          <GoalForm
            value={this.state.newGoalForm}
            elementUpdated={this.goalElementUpdated} /> : null}
        {this.state.registerProgressForm ?
          <ProgressForm
            value={this.state.registerProgressForm}
            elementUpdated={this.progressElementUpdated} /> : null}
        <ul>
          {this.state.goals.map((goal, key) =>
            <GoalListItem
              goal={goal}
              key={key}
              showProgress={this.showProgress}
              showRegisterProgress={this.showRegisterProgress}
            />
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
