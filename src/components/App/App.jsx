import { useState, useEffect } from 'react';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';
import Description from '../Description/Description';
import styles from './App.module.css';

const getInitialFeedback = () => {
  const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
  return savedFeedback || { good: 0, neutral: 0, bad: 0 };
};

const App = () => {
  const [feedback, setFeedback] = useState(getInitialFeedback);

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedbackPercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className={styles.app}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedbackPercentage={positiveFeedbackPercentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
};

export default App;
