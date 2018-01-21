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
      goals: require('./mock/goals.json'),
      listItemExpanded: undefined,
      newGoalForm: undefined,
      progress: require('./mock/progress.json'),
      historyVisible: undefined
    };

    this.showAddGoal = this.showAddGoal.bind(this);
    this.goalElementUpdated = this.goalElementUpdated.bind(this);

    this.showRegisterProgress = this.showRegisterProgress.bind(this);
    this.progressElementUpdated = this.progressElementUpdated.bind(this);

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleHistoryVisible = this.toggleHistoryVisible.bind(this);
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

  toggleExpanded(goal) {
    this.setState({
      listItemExpanded: this.state.listItemExpanded !== goal.id ? goal.id : undefined
    });
  }

  toggleHistoryVisible(goal) {
    this.setState({
      historyVisible: this.state.historyVisible !== goal.id ? goal.id : undefined
    });
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
              expanded={this.state.listItemExpanded === goal.id}
              goal={goal}
              historyVisible={this.state.historyVisible === goal.id}
              items={this.getItems(goal)}
              key={goal.id}
              showRegisterProgress={this.showRegisterProgress}
              toggleExpanded={this.toggleExpanded}
              toggleHistoryVisible={this.toggleHistoryVisible}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
