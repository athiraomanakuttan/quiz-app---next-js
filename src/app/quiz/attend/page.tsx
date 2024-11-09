'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Question } from '@/types/types';
import axios from 'axios'
const AttendQuizPage = () => {
  const searchParams = useSearchParams();
  const [participantName, setParticipantName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
    const getData = async ()=>{
        const participantName = searchParams.get('participantName');
        const selectedCategory = searchParams.get('selectedCategory');
      try{
        const response = await axios.post('/api/quiz', { participantName, selectedCategory });
        const data = response.data
        setParticipantName(data.participantName!);
        setSelectedCategory(selectedCategory || '');
        setQuestions(data.questions!);
      } catch(err){
        console.log(err)
      }

    
    }
  useEffect(() => {
    getData()
  }, [searchParams]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Quiz for {participantName}</h1>
      <p className="mb-4">Category: {selectedCategory}</p>

      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg font-semibold">{index + 1}. {question.question!}</p>
              {/* Render options if available */}
              {question.options && (
                <ul className="mt-2">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default AttendQuizPage;
