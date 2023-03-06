import {useState} from "react";

/*函数组件简略写法*/
const Header = props => <h1>{props.name}</h1>

/*解构赋值参数*/
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

/*条件渲染*/
const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad;
    const average = (good - bad) / total
    const positive = good * (100/total)

    return(<>
        {
            total === 0
                ? <div>
                    No feedback given
                </div>
                : <div>
                    <table>
                        <tbody>
                        <StatisticLine text="good" value ={good} />
                        <StatisticLine text="neutral" value ={neutral} />
                        <StatisticLine text="bad" value ={bad} />
                        <StatisticLine text="all" value={total} />
                        <StatisticLine text="average" value={average.toFixed(2)} />
                        <StatisticLine text="positive" value={positive.toFixed(2)} />
                        </tbody>
                    </table>
                </div>
        }
    </>)
}


const Unicafe = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGoodClick = () => {
        setGood(good + 1);
    };
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };
    const handleBadClick = () => {
        setBad(bad + 1);
    };

    /*可以整合数据*/
    /*const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGoodClick = () =>
        setClicks({...clicks, good: clicks.good + 1})

    const handleNeutralClick = () =>
        setClicks({...clicks, neutral: clicks.neutral + 1})

    const handleBadClick = () =>
        setClicks({...clicks, bad: clicks.bad + 1})*/

    const StatisticLine = ({ value, text }) => {
        return text === "positive" ? <tr><td>{text}</td><td>{value}%</td></tr> : <tr><td>{text}</td><td>{value}</td></tr>;
    }

    return (
        <div>
            <Header name="Customer feedback" />
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <Header name="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default Unicafe;