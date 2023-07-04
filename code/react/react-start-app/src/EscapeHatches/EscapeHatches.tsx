// @ts-ignore
import ValuesRefs from "./1ValuesRefs/ValuesRefs.tsx";
// @ts-ignore
import Stopwatch from "./1ValuesRefs/Stopwatch.tsx";
// @ts-ignore
import ChatRef from "./1ValuesRefs/ChatRef.tsx";
// @ts-ignore
import DomRefs from "./2DOMwithRefs/DomRefs.tsx";
// @ts-ignore
import TodoListRef from "./2DOMwithRefs/TodoListRef.tsx";
// @ts-ignore
import VideoPlayer from "./2DOMwithRefs/VideoPlayer.tsx";
// @ts-ignore
import CatFriends from "./2DOMwithRefs/CatFriends.tsx";
// @ts-ignore
import FetchingIinside from "./3SynchronizingEffects/FetchingIinside.tsx";

function DisplayPart({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr/>
        </>
    );
}

export default function EscapeHatches() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayPart title='5.1 Referencing Values with Refs'>
                <ValuesRefs/>
                <br/><br/>
                <Stopwatch/>
                <br/><br/>
                <ChatRef/>
                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.2 Manipulating the DOM with Refs'>
                <DomRefs/>
                <br/><br/>
                <TodoListRef/>
                <VideoPlayer/>
                <br/><br/>
                <CatFriends/>
                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.3 Synchronizing with Effects'>
                <FetchingIinside />
                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.4 You Might Not Need an Effect'>

                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.5 Lifecycle of Reactive Effects'>

                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.6 Separating Events from Effects'>

                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.7 Removing Effect Dependencies'>

                <br/><br/>
            </DisplayPart>
            <DisplayPart title='5.8 Reusing Logic with Custom Hooks'>

                <br/><br/>
            </DisplayPart>
        </div>
    );
}