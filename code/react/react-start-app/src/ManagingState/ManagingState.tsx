// @ts-ignore
import DisplayForm from "./1declarativeUI/DisplayForm.tsx";
// @ts-ignore
import DisplayStateStructure from "./2StateStructure/displeyStateStructure.tsx";

export default function ManagingState() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayForm></DisplayForm>
            <DisplayStateStructure></DisplayStateStructure>
        </div>
    );
}