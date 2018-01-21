import {
  calculateDifferenceInDays
} from './utils';

export const calculateProgressInPercent = goal => {
  const lambda = goal.startValue - goal.value;
  const goalLambda = goal.startValue - goal.goalValue;
  return lambda / goalLambda * 100;
}

export const calculateDaysGoneInPercent = goal => {
  const daysLambda = calculateDifferenceInDays(goal.startTime, goal.goalTime);
  const daysSinceStart = calculateDifferenceInDays(goal.startTime, new Date());
  return daysSinceStart / daysLambda * 100;
}

export const calculateDaysLeft = goal =>
  calculateDifferenceInDays(new Date(), goal.goalTime);

export const isGoalToRightDirection = goal => {
  const goalSign = Math.sign(goal.startValue - goal.goalValue);
  const progressSign = Math.sign(goal.startValue - goal.value);
  return goalSign === progressSign;
}

export const isProgressSymetricToTime = goal => {
  return calculateProgressInPercent(goal) >= calculateDaysGoneInPercent(goal);
}
