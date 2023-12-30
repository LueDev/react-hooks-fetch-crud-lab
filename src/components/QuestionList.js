import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {

    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [])

  function handleChangeAnswer(updatedQuestion){
      let updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion;
        } else {
          return question;
        }
      });
      setQuestions((...questions) => updatedQuestions);
      console.log(questions)
    }

  function handleDeleteQuestion(deletedQuestion) {
      let updatedQuestions = questions.filter((question) => question.id !== deletedQuestion);
      setQuestions(updatedQuestions);
      console.log(questions)
  }
  
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */
          questions.map(q => <QuestionItem question={q} onChangeAnswer={handleChangeAnswer} onDeleteQuestion={handleDeleteQuestion}/>)
        }
      </ul>
    </section>
  );
}

export default QuestionList;
