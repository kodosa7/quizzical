import React from 'react'
import FrontPage from './components/FrontPage'
import Question from './components/Question'
import './App.css'

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [clickedAll, setClickedAll] = React.useState([
        {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false
        }
    ])

    // get 5 random questions from an API
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        }, [])
    

    function checkAllAnswers() {
        console.log("button clicked")
    }

    // check if buttons of all answers have been clicked
    const haveAllBtnsClicked = Object.values(clickedAll[0]).every((value, i, array) => array[i] === true)

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
                            clickedAll={clickedAll} setClickedAll={setClickedAll}
                        />
                    </div>  
                ))}
                <button
                    onClick={checkAllAnswers}
                    className={`check-btn ${haveAllBtnsClicked ? "" : "greyed"}`}
                >Check answers
                </button>
            </div>
        </div>
    )
}