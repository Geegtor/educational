
// Типы для вопросов
export type QuestionType = 'multipleChoice' | 'singleChoice' | 'shortAnswer' | 'longAnswer';

// Тип данных для вопроса
export interface QuestionData {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
}

// Тип данных для ответа на вопрос
export interface AnswerData {
  questionId: number;
  answer: string | string[];
}

// Тип данных для отслеживания прогресса теста
export interface ProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

// Пример тестовых данных 
export const testQuestions: QuestionData[] = [
  { id: 1, text: 'What is your favorite color?', type: 'singleChoice', options: ['Red', 'Blue', 'Green', 'Yellow'] },
  { id: 2, text: 'Select all fruits:', type: 'multipleChoice', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { id: 3, text: 'Enter your age:', type: 'shortAnswer' },
  { id: 4, text: 'Describe your hobby:', type: 'longAnswer' },
];

// Пример объекта с таймером
export const additionalData: Record<string, number>  = {
  timeForTest: 30
}
