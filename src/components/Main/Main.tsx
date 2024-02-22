import React, {useState, ChangeEvent} from 'react'
import './Main.css'
import { questions } from './Questions';
import Results from '../Results/Results';




export default function Main(){ 
    // const [showQuiz, setShowQuiz] = useState(true);
    const [showAnswers, setShowAnswers] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([{id: 0, answer: '', correct: false}]);

    const handleNextQuestion = () => {
        if (currentQuestion !== questions.length - 1) {
            let updatedAnswers = [...answers];
            let answer = updatedAnswers[currentQuestion].answer.trim();
            let correct = false;
            if (answer !== '') {
                let regex = new RegExp(answer, 'i'); // Создаем регулярное выражение из ответа
                correct = regex.test(questions[currentQuestion].answer.trim()); // Сравниваем ответы
            }
            updatedAnswers[currentQuestion].correct = correct;

            setAnswers(updatedAnswers);
            setCurrentQuestion(currentQuestion + 1);

            if (answers.length <= currentQuestion + 1) {
                setAnswers([...answers, {id: currentQuestion + 1, answer: '', correct: false}]);
            }
    } else setShowAnswers(true)

        // if (currentQuestion !== questions.length - 1) 
    };

    const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
        let updatedAnswers = [...answers];
        updatedAnswers[currentQuestion].answer = e.target.value as string;
        setAnswers(updatedAnswers);
    };

    return(
        <section className="MainContainer">
            {!showAnswers
                ? <div className='QuizContainer'>
                    <div className='QuizQuestion'>
                        <div className="QuestionHeader">
                            <h4>{questions[currentQuestion]?.context}</h4>
                            <h4>{currentQuestion + 1}/{questions.length}</h4>
                        </div>
                        <h5>{questions[currentQuestion].title}</h5>
                    </div>
                    <div className='QuizAnswer'>
                        <input className='AnswerInput' placeholder='Ответ' type="text" value={answers[currentQuestion].answer || ''}
                        onChange={handleAnswerChange} />
                    </div>
                    <div className="QuizButtonSendContainer">
                        <button className="QuizButton QuizButtonSend" onClick={handleNextQuestion}>Следующий вопрос</button>
                        <button className="QuizButton QuizButtonEnd" onClick={()=> setShowAnswers(true)}>Завершить</button>
                    </div>
                    {
                        // answers.map((item)=> <h1 className="answers">{item.answer}, {item.correct? 'Правильно' : 'Нет'}</h1>)
                    }
                    
                  </div>
                  : <Results answers={answers} questions={questions} setAnswers={setAnswers}/>
                // : <div className="AnswersContainer">
                //     <div className="AnswersHeader"></div>
                //     <div className="AnswersTableContainer">
                //         <table className='AnswersTable'>
                //             <thead>
                //                 <tr>
                //                     <th scope="col">Номер</th>
                //                     <th scope="col">Ваш ответ</th>
                //                     <th scope="col">Правильный ответ</th>
                //                     {/* <th scope='col'></th> */}
                //                 </tr>
                //             </thead>
                //             <tbody>
                //                 {
                //                     answers.map((item) => 
                //                         <tr className="Answers">
                //                             <th>{item.id + 1}</th>
                //                             <td className='AnswersItemUnCorrect'>{item.answer}</td>                                           
                //                             <td>{questions[item.id]?.answer}</td>
                //                             {!item.correct
                //                             ? <td><ShapeNo/></td>
                //                             : <td><ShapeYes/></td>
                //                             }
                //                             <td>
                //                                 <button className='QuizButton AnswersButton' onClick={()=>
                //                                     setAnswers(answers.map((answer, index) => {
                //                                         if (index === item.id) {
                //                                         return {...answer, correct: true};
                //                                         }
                //                                         return answer;
                //                                     }))
                //                             }>Засчитать</button>
                //                             </td>
                //                         </tr>)
                //                 }
                //             </tbody>
                //         </table>
                //     </div>
                // </div>
            }
            
        </section>
    )
}
