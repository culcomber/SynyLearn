// @ts-ignore
import Form from "./Form.tsx";
// @ts-ignore
import FormState from "./FormState.tsx";
// @ts-ignore
import EditProfile from "./EditProfile.tsx";

let statuses = [
    'empty',
    'typing',
    'submitting',
    'success',
    'error',
];

export default function DisplayForm() {
    return (
        <>
            <h2 className={'part-color'}>4.1 Reacting to Input with State</h2>
            {statuses.map(status => (
                <section key={status}>
                    <h4 className={'title-color'}>Form ({status}):</h4>
                    <FormState status={status} />
                </section>
            ))}
            <Form></Form>
            <br/>
            <EditProfile></EditProfile>
            <hr />
        </>
    );
}
