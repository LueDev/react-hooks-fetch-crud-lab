import React, {useState} from "react";

function QuestionItem({ question, onChangeAnswer, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [updatedIndex, setUpdatedIndex] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  /**
   * 1. Add the handleChangeAnswer func
   * 2. Add the handleDeleteQuestion func
   */
  function handleChangeAnswer(event) {
    
    setUpdatedIndex(event.target.value)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
        "prompt": prompt,
        "answers": answers, 
        "correctIndex": updatedIndex
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onChangeAnswer(updatedQuestion));
  }

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteQuestion(id));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChangeAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
