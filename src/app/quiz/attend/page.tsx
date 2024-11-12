'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Question } from '@/types/types';
import axios from 'axios';

const AttendQuizPage = () => {
  const searchParams = useSearchParams();
  const [participantName, setParticipantName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const getData = async () => {
    const participantName = searchParams.get('participantName');
    const selectedCategory = searchParams.get('selectedCategory');
    try {
      const response = await axios.post('/api/quiz', { participantName, selectedCategory });
      const data = response.data;
      setParticipantName(data.participantName!);
      setSelectedCategory(selectedCategory || '');
      if(data.questions.length)
      setQuestions(data.questions!);
      else
      setQuestions([]);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  const handleOptionChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate the score
      let correct = 0;
      questions.forEach((question, index) => {
        if (answers[index] === question.options[parseInt(question.correctOption)]) {
          correct += 1;
        }
      });
      setCorrectCount(correct);
      setIsCompleted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (isCompleted) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
        <div className=' rounded-3xl border p-8 text-center'>
        <p className=' text-xl'>Total Questions: {questions.length}</p>
        <p className='text-green-700 text-xl'>Correct Answers: {correctCount}</p>
        <p className="text-red-700 text-xl">Incorrect Answers: {questions.length - correctCount}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Quiz for {participantName}</h1>
    
      {currentQuestion ? (
        <div className="w-full max-w-xl bg-white p-10">
          <p className="text-lg font-semibold mb-4">{currentQuestionIndex + 1}. {currentQuestion.question!}</p>
          {currentQuestion.options && (
            <ul className="mb-4">
              {currentQuestion.options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={answers[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 self-center text-end"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
          </button>
        </div>
      ) : (
        questions.length ? <p>Loading questions...</p> : <p>Sorry. No question available for this category</p>
        
      )}
    </div>
  );
};

export default AttendQuizPage;
