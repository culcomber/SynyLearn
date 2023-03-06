import Part from "./Part";

const Content  = (props) => {
    return (
        <div>
            {/*<Part part={props.parts1} exercises={props.exercises1}/>
            <Part part={props.parts2} exercises={props.exercises2}/>
            <Part part={props.parts3} exercises={props.exercises3}/>*/}
            {/*forEach()数组每个元素都执行一次回调函数。map()通过指定函数处理数组的每个元素，并返回处理后的数组*/}
            {props.parts.map(item => <Part part={item.name} exercises={item.exercises} />)}
        </div>
    );
}

export default Content ;