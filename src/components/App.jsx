import React, { Component } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positivePercentage: 0,
  };
  onLeaveFeedback = evt => {
    const pressedBtn = evt.currentTarget.name;

    this.setState(prevState => {
      const value = prevState[pressedBtn] + 1;
      const updatedState = { ...prevState, [pressedBtn]: value };

      const total = updatedState.good + updatedState.neutral + updatedState.bad;
      const positive =
        total > 0 ? ((updatedState.good / total) * 100).toFixed(0) : 0;

      return {
        ...updatedState,
        total: total,
        positivePercentage: positive + '%',
      };
    });
  };

  render() {
    const { good, neutral, bad, total, positivePercentage } = this.state;
    const feedbackOptions = Object.keys(this.state).filter(key =>
      ['good', 'neutral', 'bad'].includes(key)
    );
    return (
      <div
        style={{
          width: '500px',
          height: '100vh',
          flexDirection: 'column',
          display: 'flex',
          padding: '20px',
          color: '#010101',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={feedbackOptions}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}
