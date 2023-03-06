import Part from "./Part";

const Content  = (props) => {
    return (
        <div>
            {/*<Part part={props.parts1} exercises={props.exercises1}/>
            <Part part={props.parts2} exercises={props.exercises2}/>
            <Part part={props.parts3} exercises={props.exercises3}/>*/}
            {props.parts.map(item => <Part part={item.name} exercises={item.exercises} />)}
        </div>
    );
}

export default Content ;