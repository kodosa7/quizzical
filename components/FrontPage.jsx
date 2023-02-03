import React from "react"

export default function FrontPage({ startQuiz }) {
    return (
        <div className="front-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
                <button className="start-btn" onClick={startQuiz}>Start quiz</button>
            
        </div>
    )
}


// {showCheckAnswers ? (
//     <button onClick={checkAllAnswers} className="check-answers-btn">
//       Check Answers
//     </button>
//   ) : null}
//  You can toggle the state value of showCheckAnswers whenever you want to show or hide the button.
 
 
 
 
 