import React, { useEffect, useState } from 'react'
import FrontPage from './components/FrontPage'
import Question from './components/Question'
import './App.css'

export default function App() {
    // set states
    const [questions, setQuestions] = useState([])
    const [isAllAnswersRight, setIsAllAnswersRight] = useState(0)
    const [hasCheckBtnClicked, setHasCheckBtnClicked] = useState(false)
    const [isBegin, setIsBegin] = useState(true)
    const [isQuizStarted, setIsQuizStarted] = useState(false)
    const [hasRendered, setHasRendered] = useState(false)
    const [clickedAll, setClickedAll] = useState([
        {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false
        }
    ])

    // get 5 random questions from an API
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setIsBegin(true)
                setHasCheckBtnClicked(false)
                setHasRendered(false)
            })
        }, [])
    
    console.log("hasCheckBtnClicked", hasCheckBtnClicked)
    console.log("isBegin", isBegin)

    // when the Check button is pressed, call this function
    function checkAllAnswers() {
        console.log("here", hasCheckBtnClicked)

        // if Check button was pressed, set its state to true
        setHasCheckBtnClicked(true)

        console.log("Checking all answers...")
        console.log("How many answers clicked are right: ", isAllAnswersRight)
        if (isAllAnswersRight === 5) {
            console.log("All 5 answers are correct! :-)")
            setIsBegin(false)
            return [true, isAllAnswersRight]
        } else {
            console.log(`Not all answers correct. Only ${isAllAnswersRight} correct out of 5`)
            setIsBegin(false)
            return [false, isAllAnswersRight]
        }
    }

    // check if buttons of all answers have been clicked
    const haveAllBtnsClicked = Object.values(clickedAll[0]).every((value, i, array) => array[i] === true)

    // when Play again button is pressed, reset states and re-fetch data
    function playAgain() {
        console.log("play again function triggered")
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setIsBegin(true)
                setHasCheckBtnClicked(false)
                setIsAllAnswersRight(0)
                setClickedAll([
                  {
                    "1": false,
                    "2": false,
                    "3": false,
                    "4": false,
                    "5": false
                  }
                ])
            })
    }

    // render things to DOM (using conditional rendering)
    return (
        <div className="App">
            <div className="container">
                {!isQuizStarted && (
                    <FrontPage startQuiz={() => setIsQuizStarted(true)} />
                )}
                {isQuizStarted &&
                    questions.map((question, index) => (
                        <div key={question.id}>
                            <Question
                                id={index + 1}
                                question={question.question}
                                correct={question.correct_answer}
                                incorrect={question.incorrect_answers}
                                clickedAll={clickedAll}
                                setClickedAll={setClickedAll}
                                isAllAnswersRight={isAllAnswersRight}
                                setIsAllAnswersRight={setIsAllAnswersRight}
                                hasRendered={hasRendered}
                                setHasRendered={setHasRendered}
                            />
                        </div>  
                    ))
                }
                {isQuizStarted ? // condition 1 begin
                    haveAllBtnsClicked ? // condition 2 begin
                        hasCheckBtnClicked ? // condition 3 begin
                            isAllAnswersRight === 5 ? // condition 4 begin
                                (
                                <>
                                    <h5>All answers are correct!</h5>
                                    <button
                                        onClick={playAgain}
                                        className="play-again-btn"
                                        >Play again
                                    </button>
                                </>
                                )
                                :
                                (
                                <>
                                    <h5>You scored {isAllAnswersRight}/5 correct answers</h5>
                                    <button
                                        onClick={playAgain}
                                        className="play-again-btn"
                                        >Play again
                                    </button>
                                </>
                                ) // /condition 4 end
                            :
                            (   <button
                                    onClick={checkAllAnswers}
                                    className={"check-btn"}
                                >Check answers
                                </button>
                            ) // /condition 3 end
                        :
                        (   <button
                            className={"check-btn-greyed"}
                            >Check Answers
                            </button>
                        ) // /condition 2 end
                 : null // /condition 1 end
                 }
            </div>
        </div>
    )
}