import { AnswerData, QuestionData } from "../assets/models/models";
import LongAnswerQuestion from "./questionTypes/Long";
import MultipleChoiceQuestion from "./questionTypes/Multi";
import ShortAnswerQuestion from "./questionTypes/Short";
import SingleChoiceQuestion from "./questionTypes/Single";

const Question: React.FC<{ question: QuestionData; onAnswerSubmit: (answer: AnswerData) => void }> = ({ question, onAnswerSubmit }) => {
    switch (question.type) {
      case 'singleChoice':
        return <SingleChoiceQuestion question={question} onAnswerSubmit={onAnswerSubmit} />;
      case 'multipleChoice':
        return <MultipleChoiceQuestion question={question} onAnswerSubmit={onAnswerSubmit} />;
      case 'shortAnswer':
        return <ShortAnswerQuestion question={question} onAnswerSubmit={onAnswerSubmit} />;
      case 'longAnswer':
        return <LongAnswerQuestion question={question} onAnswerSubmit={onAnswerSubmit} />;
      default:
        return null;
    }
  };

  export default Question;
