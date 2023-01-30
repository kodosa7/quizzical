import React from 'react'
import FrontPage from './components/FrontPage'
import Question from './components/Question'
import './App.css'

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [hasClicked, setHasClicked] = React.useState(false)

    // get 5 random questions from an API
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        }, [])
    

    function checkAllAnswers() {
        // handle the check button here
    }

    return (
        <div className="App">
            <div className="container">
                {/* <FrontPage /> */}
                {questions.map((question, index) => (
                    <div key={question.id}>
                        <Question
                            id={index + 1}
                            question={question.question}
                            correct={question.correct_answer}
                            incorrect={question.incorrect_answers}
                            hasClicked={hasClicked}
                        />
                    </div>  
                ))}

                <button className="check-btn" onClick={checkAllAnswers}>Check answers</button>
            </div>
        </div>
    )
}