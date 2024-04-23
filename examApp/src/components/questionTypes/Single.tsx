import { useState } from "react";
import { AnswerData, QuestionData } from "../../assets/models/models";

const SingleChoiceQuestion: React.FC<{ question: QuestionData; onAnswerSubmit: (answer: AnswerData) => void }> = ({ question, onAnswerSubmit }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
  
    const handleOptionChange = (option: string) => {
      setSelectedOption(option);
    };
  
    const handleSubmit = () => {
      onAnswerSubmit({ questionId: question.id, answer: selectedOption });
    };
  
    return (
      <>
        <div>
        <hr/>
        <p>{question.text}</p>
            {
            question.options?.map((option) => { return (
            <label key={option}>
                <input type="radio" value={option} checked={selectedOption === option} onChange={() => handleOptionChange(option)} />
                {option}
            </label>
            )})
        }
        <hr/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      </>
    );
};

export default SingleChoiceQuestion;
  