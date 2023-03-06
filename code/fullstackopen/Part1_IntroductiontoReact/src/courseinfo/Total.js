const Total  = (props) => {
    return (
        /*<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>*/
        <p>Number of exercises {props.parts.reduce((total, item) => total + item.exercises, props.parts[0].exercises)}</p>
    );
}

export default Total ;