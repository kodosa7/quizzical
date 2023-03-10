import React, { useEffect, useState } from "react"

export default function Questions(props) {
    const [isShuffled, setIsShuffled] = useState(true)  // added state to keep track of shuffling
    const [isPressed, setIsPressed] = useState({})  // added state

    useEffect(() => {
        setIsPressed({
            [props.correct]: true
        })
    }, [])

    function unshuffledAnswersObject() {
        const allAnswersObject = {}
        allAnswersObject[props.correct] = true
        props.incorrect.map(item => 
            allAnswersObject[item] = false
        )
        return allAnswersObject
    }

    let entries = Object.entries(unshuffledAnswersObject())
    if (isShuffled) {
        entries = entries.sort(() => Math.random() - 0.5)  // shuffle entries randomly
    }
    const shuffledAnswersObject = Object.fromEntries(entries)
    console.log("shuffledAnswersObject", shuffledAnswersObject)


    function checkButton(e) {
        let answer = e.target.innerHTML
        setIsPressed({
            [answer]: true
        })
        setIsShuffled(false)  // set shuffled to false when button is clicked
    }


    return (
        <div className="questions-container">
            <div className="questions">
                <h3 dangerouslySetInnerHTML={{ __html: props.question }}></h3>
                {Object.entries(shuffledAnswersObject).map((item, index) => 
                    <button
                        onClick={checkButton}
                        className={`answer-btn ${isPressed[item[0]] ? "pressed" : ""}`}  // added class to change color
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item[0]}}
                    ></button>)}
                <div className="line"></div>
            </div>
        </div>
    )
}