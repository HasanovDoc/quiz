import ShapeNo from "../../assets/ShapeNo";
import ShapeYes from "../../assets/ShapeYes";
import './Results.css'

interface ResultsProps {
    answers: {id: number, answer: string, correct: boolean}[],
    questions: any[], // замените на тип ваших вопросов
    setAnswers: React.Dispatch<React.SetStateAction<{id: number, answer: string, correct: boolean}[]>>
}

export default function Results({answers, questions, setAnswers}: ResultsProps ){
    return (
        <div className="AnswersContainer">
                    <div className="AnswersHeader"></div>
                    <div className="AnswersTableContainer">
                        <table className='AnswersTable'>
                            <thead>
                                <tr>
                                    <th scope="col">Номер</th>
                                    <th scope="col">Ваш ответ</th>
                                    <th scope="col">Правильный ответ</th>
                                    {/* <th scope='col'></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    answers.map((item) => 
                                        <tr className="Answers">
                                            <th>{item.id + 1}</th>
                                            <td className='AnswersItemUnCorrect'>{item.answer}</td>                                           
                                            <td>{questions[item.id]?.answer}</td>
                                            {!item.correct
                                            ? <td><ShapeNo/></td>
                                            : <td><ShapeYes/></td>
                                            }
                                            <td>
                                                <button className='QuizButton AnswersButton' onClick={()=>
                                                    setAnswers(answers.map((answer, index) => {
                                                        if (index === item.id) {
                                                        return {...answer, correct: true};
                                                        }
                                                        return answer;
                                                    }))
                                            }>Засчитать</button>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                            <tfoot className="ResultsScore">
                                <tr>
                                <th scope="row">Общий счет</th>
                                <td>
                                    {answers.reduce((acc, item) => item.correct ? acc + 1 : acc, 0)}/{questions.length}
                                </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
    )
}