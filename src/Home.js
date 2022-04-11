export default function Home(props) {
    return (
        <main>
            <div className='main'>
                <h1 className='home-header'>Check your knowledge</h1>
                <p className='instruction'>
                    This quiz consists 10 questions, generated randomly from Open Trivia DB. Select your answers, (choose carefully, beacuse if answer is selected You can't switch to another one) when all are selected, You might check solutions. You also might to generate a new questions.
                </p>
                <button
                    className='home-button'
                    onClick={props.newGame}
                >
                    Start quiz
                </button>
            </div>
        </main>
    )
}