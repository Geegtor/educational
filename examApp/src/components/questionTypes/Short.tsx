import { useState } from "react";
import { AnswerData, QuestionData } from "../../assets/models/models";

const ShortAnswerQuestion: React.FC<{ question: QuestionData; onAnswerSubmit: (answer: AnswerData) => void }> = ({ question, onAnswerSubmit }) => {
    const [answer, setAnswer] = useState<string>('');
  
    const handleSubmit = () => {
      onAnswerSubmit({ questionId: question.id, answer });
    };
  
    return (
      <div>
        <hr/>
        <p>{question.text}</p>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <hr/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };
  
  export default ShortAnswerQuestion
