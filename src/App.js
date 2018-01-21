import React, { Component } from 'react';
import uuid from 'uuid/v1';

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
    const goal = {
      ...element,
      id: uuid(),
      value: element.startValue
    };
    const progress = {
      id: uuid(),
      goal: goal.id,
      value: goal.value,
      time: goal.startTime
    };
    this.setState({
      goals: [...this.state.goals, goal],
      progress: [...this.state.progress, progress],
      newGoalForm: undefined
    });
  }

  progressElementUpdated(element) {
    this.setState({
      progress: [...this.state.progress, {...element, id: uuid()}],
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
        items: this.getItems(goal)
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

  getItems(goal) {
    return this.state.progress.filter(progress => progress.goal === goal.id);
  }

  render() {

    return (
      <div>
        <button onClick={this.showAddGoal}>Add Goal</button>
        {this.state.newGoalForm ?
          <GoalForm
            elementUpdated={this.goalElementUpdated}
            value={this.state.newGoalForm}
          /> : null}
        {this.state.registerProgressForm ?
          <ProgressForm
            elementUpdated={this.progressElementUpdated}
            value={this.state.registerProgressForm}
          /> : null}
        <ul>
          {this.state.goals.map(goal =>
            <GoalListItem
              goal={goal}
              items={this.getItems(goal)}
              key={goal.id}
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
              {this.state.progressVisible.items.map(goal => <li key={goal.id}>{formatTime(goal.time)}: {goal.value}</li>)}
            </ul>
          </div>
        ): null}
      </div>
    );
  }
}

export default App;
