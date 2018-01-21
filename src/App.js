import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newGoalForm: undefined,
      goals: require('./mock/goals.json')
    }

    this.showAddGoal = this.showAddGoal.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

      }
    });
  }

  addGoal() {

  }

  render() {
    
    return (
      <div>
        <button onClick={this.showAddGoal}>Add Goal</button>
        {this.state.newGoalForm ? <div className="dialog">
          <form onSubmit={this.handleSubmit}>
            <input 
              name="name"
              onChange={this.handleChange}
              type="text"
              value={this.state.newGoalForm.name}
            />
            <button type="submit">Add</button>
          </form>
        </div> : null}
        <ul>
          {this.state.goals.map((goal, key) => <li key={key}>{goal.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
