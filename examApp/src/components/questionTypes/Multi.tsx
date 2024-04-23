import { useState } from "react";
import { AnswerData, QuestionData } from "../../assets/models/models";

const MultipleChoiceQuestion: React.FC<{ question: QuestionData; onAnswerSubmit: (answer: AnswerData) => void }> = ({ question, onAnswerSubmit }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
    const handleOptionChange = (option: string) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    const handleSubmit = () => {
      onAnswerSubmit({ questionId: question.id, answer: selectedOptions });
    };
  
    return (
      <div>
        <hr/>
        <p>{question.text}</p>
        {
            question.options?.map((option) => (
              <label key={option}>
                <input type="checkbox" value={option} checked={selectedOptions.includes(option)} onChange={() => handleOptionChange(option)} />
                {option}
              </label>
            ))
        }
        <hr/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };
    
export default MultipleChoiceQuestion;
