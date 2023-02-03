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
    const [isAllAnswersRight, setIsAllAnswersRight] = React.useState(0)
    const [hasCheckBtnClicked, setHasCheckBtnClicked] = React.useState(false)

    // get 5 random questions from an API
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        }, [])
    
    // React.useEffect(() => {
    //     if (hasCheckBtnClicked) return
    //     setHasCheckBtnClicked(true)
    // }, [hasCheckBtnClicked])

    console.log("hasCheckBtnClicked", hasCheckBtnClicked)

    function checkAllAnswers() {
        console.log("here", hasCheckBtnClicked)
        // React.useEffect(() => {setHasCheckBtnClicked(true)}, [])
        
        setHasCheckBtnClicked(true)

        console.log("Checking all answers...")
        console.log("How many answers clicked are right: ", isAllAnswersRight)
        if (isAllAnswersRight === 5) {
            console.log("All 5 answers are correct! :-)")
            return [true, isAllAnswersRight]
        } else {
            console.log(`Not all answers correct. Only ${isAllAnswersRight} correct out of 5`)
            return [false, isAllAnswersRight]
        }
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
                            clickedAll={clickedAll}
                            setClickedAll={setClickedAll}
                            isAllAnswersRight={isAllAnswersRight}
                            setIsAllAnswersRight={setIsAllAnswersRight}
                        />
                    </div>  
                ))}
                {haveAllBtnsClicked ?
                    hasCheckBtnClicked ?
                        // (  <button
                        //     onClick={checkAllAnswers}
                        //     className={"check-btn"}
                        //     >Check answers button not clicked 2
                        // )
                        isAllAnswersRight === 5 ?
                            (<h1>all correct</h1>)
                            :
                            (<h1>not all correct</h1>)
                        :
                        (  <button
                                onClick={checkAllAnswers}
                                className={"check-btn"}
                            >Check answers button not clicked
                            </button>
                        )
                            
                                                
                : (
                    <button
                        // onClick={checkAllAnswers}
                        className={"check-btn-greyed"}
                    >Check Answers
                    </button>
                )
                    
                }
            </div>
        </div>
    )
}