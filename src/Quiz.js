import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function Quiz() {
    const [questions, setQuestions] = React.useState([])
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [allSelected, setAllSelected] = React.useState(false)
    const [newQuestions, setNewQuestions] = React.useState(false)

    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch('https://opentdb.com/api.php?amount=10')
            const data = await res.json()

            setQuestions(data.results.map((question, id) => ({
                id: id,
                question: question.question,
                correct: question.correct_answer,
                disabled: false,
                answers: [question.correct_answer, ...question.incorrect_answers]
            })))

            //shuffling an answers
            setQuestions(oldQuestions => oldQuestions.map(question => {
                const answersArr = shuffle(question.answers)
                return ({
                    ...question,
                    answers: answersArr.map(answer => ({
                        id: nanoid(),
                        answer: answer,
                        selected: false,
                        correct: question.correct === answer
                            ? true : false
                    }))
                })
            }
            ))

            function shuffle(shuffleArr) {
                let currentIndex = shuffleArr.length, randomIndex

                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex)
                    currentIndex--

                    [shuffleArr[currentIndex], shuffleArr[randomIndex]]
                        = [shuffleArr[randomIndex], shuffleArr[currentIndex]]
                }
                return shuffleArr
            }

        }
        getQuestions().catch(error => console.error(error))
    }, [newQuestions])

    function checkSelected(id, targetId) {
        setQuestions(oldQuestions => oldQuestions.map(question => ({
            ...question,
            disabled: question.id === id
                ? !question.disabled
                : question.disabled,
            answers: question.answers.map(answer => {
                return answer.id === targetId
                    ? { ...answer, selected: !answer.selected }
                    : answer
            })
        })))
    }

    const allQuestions = questions.map(
        ({ id, question, correct, answers, disabled }, key) => {
            return (
                <Question
                    key={key}
                    id={id}
                    disabled={disabled}
                    question={question}
                    allSelected={allSelected}
                    correct={correct}
                    answers={answers}
                    checkSelected={checkSelected}
                />
            )
        })

    React.useEffect(() => {
        if (questions.length > 0) {
            const allChosen = questions.every(
                question => question.disabled
            )

            if (allChosen) setButtonDisabled(false)
        }
    }, [questions])

    function checkAnswers(e) {
        e.preventDefault()
        setAllSelected(true)
        setButtonDisabled(true)
    }

    function newGame(e) {
        e.preventDefault()
        setAllSelected(false)
        setNewQuestions(oldState => !oldState)
    }

    return (
        <>
            <form className='que-container'>
                {allQuestions}
                <div className='buttons-container'>
                    <button
                        className='que-button'
                        disabled={buttonDisabled}
                        onClick={checkAnswers}
                    >
                        Check answers
                    </button>
                    <button
                        className='home-button'
                        onClick={e => newGame(e)}
                    >
                        New questions
                    </button>
                </div>
            </form>
        </>
    )
}