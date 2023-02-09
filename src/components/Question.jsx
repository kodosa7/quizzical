import React, { useEffect, useState } from "react"

export default function Question(props) {
    const [isPressed, setIsPressed] = useState({})
    
    useEffect(() => {
        setIsPressed({
            [props.correct]: false
        })
    }, [])

    // make an object with answers and shuffle its order randomly
    function shuffledAnswersObject() {
        const allAnswersObject = {}
        allAnswersObject[props.correct] = true
        props.incorrect.map(item => 
            allAnswersObject[item] = false
        )
        const obj = allAnswersObject
        const sortedObj = Object.fromEntries(
            Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0]))
          )
        return sortedObj
    }

    // checks every single answer button
    function checkButton(e) {
        let answer = e.target.innerHTML

        setIsPressed({
            [answer]: true
        })
        console.log(props.id)

        props.setClickedAll(prevClickedAll => {
            const updatedClickedAll = { ...prevClickedAll[0] }
            updatedClickedAll[props.id] = true
            const allBtnsClicked = Object.values(updatedClickedAll).every(value => value === true)
            return [updatedClickedAll, allBtnsClicked]
        })

        console.log("clicked answer:", answer)
        console.log("correct answer:", props.correct)
        
        if (props.correct === answer) {
            console.log("*** CORRECT ANSWER!")
            props.setIsAllAnswersRight(prevState => prevState + 1)
        } else {
            console.log("*** INCORRECT ANSWER :-(")
        }
    }

    return (
        <div className="questions-container">
            <div className="questions">
                <h3 dangerouslySetInnerHTML={{ __html: props.question }}></h3>
                <div>
                    {Object.entries(shuffledAnswersObject()).map((item, index) =>
                        
                        {
                            return (
                                !props.hasFinalColors ?
                                    (
                                    <button
                                        className={`answer-btn ${isPressed[item[0]] ? "pressed" : ""}`}
                                        onClick={checkButton}
                                        key={index}
                                        >{item[0]}
                                    </button>
                                    )
                                :
                                    isPressed[item[0]] ?
                                        (
                                        <button
                                            className={`answer-btn ${Object.entries(shuffledAnswersObject())[index][1] ? "result--correct" : ""}`}
                                            key={index}
                                            >{item[0]}
                                        </button>
                                        )
                                    :
                                        (
                                        <button
                                            className={`answer-btn ${Object.entries(shuffledAnswersObject())[index][1] ? "result--clicked-incorrect" : ""}`}
                                            key={index}
                                            >{item[0]}
                                        </button>
                                        )
                                    )}
                    )}
                </div>
                <div className="line"></div>
            </div>
        </div>
    )
}