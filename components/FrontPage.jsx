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
 
 