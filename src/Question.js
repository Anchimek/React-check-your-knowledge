import decode from 'html-entities-decode';

export default function Question(props) {

    function className(answer) {
        if (
            props.allSelected
            && !answer.correct
            && answer.selected
        )
            return 'que-answer incorrect'
        else if (
            props.allSelected
            && answer.correct
        )
            return 'que-answer correct'
        else if (
            answer.selected
        )
            return 'que-answer active'
        else return 'que-answer'
    }
    const createAnswers = props.answers.map(
        (answer, key) => {
            return (
                <button
                    className={className(answer)}
                    key={key}
                    disabled={props.disabled}
                    onClick={ e => {
                        e.preventDefault()
                        props.checkSelected(
                            props.id,
                            answer.id
                    )}
                    }
                >
                    {decode(answer.answer)}
                </button>
            )
        }
    )

    return (
        <>
            <div className='que-face'>
                <h2 className='que-question'>{decode(props.question)}</h2>
                <div className='que-answers'>
                    {createAnswers}
                </div>
            </div>
        </>
    )
}