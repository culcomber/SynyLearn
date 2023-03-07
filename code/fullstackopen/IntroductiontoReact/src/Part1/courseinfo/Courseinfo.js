import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Courseinfo = () => {
    /*const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14*/

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            },
            {
                name: 'Redux',
                exercises: 11,
            }
        ]
    }

    return (
        <div>
            {/*<Header course={course} />
            <Content
                part1={part1}
                part2={part2}
                part3={part3}
                exercises1={exercises1}
                exercises2={exercises2}
                exercises3={exercises3}
            />
            <Total
                exercises1={exercises1}
                exercises2={exercises2}
                exercises3={exercises3}
            />*/}
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Courseinfo;