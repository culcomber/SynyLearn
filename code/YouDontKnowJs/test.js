const array = [
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
    }
];

console.log(array.reduce((total,item)=> {
    console.log(total, item)
    return total + item.exercises
}))

console.log(array.reduce((total,item)=> {
    console.log(total, item)
    return total + item.exercises
}, 0))