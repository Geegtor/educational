import React, { useState } from 'react';
import { AnswerData, additionalData, testQuestions } from '../assets/models/models';
import Question from './Question';
import { formatTime } from '../utils/helpers';
import Progress from './Progress';
import { useTimer } from '../utils/useTimerHook';
import { useExameAsnwer } from '../utils/useExamAnswerHook';

const TestContainer: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [timer, setTimer] = useTimer();
  const [answers, setAnswers]  = useExameAsnwer(setCurrentQuestionIndex);

  const handleAnswerSubmit = (answer: AnswerData) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetTest = () => {
    setAnswers([])
    setTimer(additionalData.timeForTest)
  }

  const currentQuestion = testQuestions[currentQuestionIndex];

  return (
    <div>
      {(currentQuestion && timer > 0) ? (
        <>  
          <h3>Time remaining: {formatTime(timer)} </h3>
          <h4>Question {currentQuestion.id}</h4>
          <Question question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
          <Progress 
            currentQuestionIndex={currentQuestionIndex} 
            totalQuestions={testQuestions.length}
          />
        </>
      ) : (
        <>
          <p>Test completed!</p>
          {
            answers.map((e, i) => (
              <React.Fragment key={"1" + e.questionId}>
                <h4>{++i} question answer:</h4>
                <p>{ 
                    Array.isArray(e.answer) ?
                      e.answer?.join(",") :
                      e.answer
                    }
                </p>
              </React.Fragment>
            ))
          }
          <button onClick={resetTest}>Reset</button>
        </>        
      )}
    </div>
  );
};

export default TestContainer;
