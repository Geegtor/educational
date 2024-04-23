import { useEffect, useState } from "react";
import { AnswerData } from "../assets/models/models";

export function useExameAsnwer(setCurrentQuestionIndex: CallableFunction): [AnswerData[], CallableFunction] {
    const [answers, setAnswers] = useState<AnswerData[]>([]);

    useEffect(() => {
        const savedAnswers = localStorage.getItem('testAnswers');
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers));
        }
      }, []);
    
    useEffect(() => {
        setCurrentQuestionIndex(answers.length);
        localStorage.setItem('testAnswers', JSON.stringify(answers));
    }, [answers])

    return [answers, setAnswers]
}
