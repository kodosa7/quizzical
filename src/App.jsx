import React from 'react'
import FrontPage from './components/FrontPage'
import Questions from './components/Questions'
import './App.css'

export default function App() {
    const [questions, setQuestions] = React.useState([])

    // get 5 random questions from an API
    function getQuestionsFromAPI() {
        React.useEffect(() => {
            console.log("useEffect ran")
            fetch('https://opentdb.com/api.php?amount=5')
                .then(res => res.json())
                .then(data => setQuestions(data.results))
            }, [])
    }
    
    
    // const data = getQuestionsFromAPI()
    
    function renderQuestions() {
        getQuestionsFromAPI()
        console.log("renderQuestions launched")
        console.log("all questions are:", questions)

        if (!questions.length) return <div>Loading questions...</div>

        return questions.map((question, index) => (
            <div key={question.id}>
                <p>Question {index + 1}: {question.question}</p>
                <p>Correct answer: {question.correct_answer}</p>
                <p>Incorrect: {question.incorrect_answers.join(", ")}</p>
            </div>
        ))
    }
    
    renderQuestions()

    function checkAllAnswers() {

    }

    return (
        <div className="App">
            <div className="container">
                {/* <FrontPage /> */}
                {questions.map((question, index) => (
                    <div key={question.id}>
                        <Questions
                            id={index + 1}
                            question={question.question}
                            correct={question.correct_answer}
                            incorrect={question.incorrect_answers}
                        />
                    </div>  
                ))}

                <button className="check-btn" onClick={checkAllAnswers}>Check answers</button>
            </div>
        </div>
    )
}