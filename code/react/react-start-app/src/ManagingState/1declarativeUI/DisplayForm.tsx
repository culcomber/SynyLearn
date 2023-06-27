// @ts-ignore
import Form from "./Form.tsx";
// @ts-ignore
import FormState from "./FormState.tsx";

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
            {statuses.map(status => (
                <section key={status}>
                    <h4>Form ({status}):</h4>
                    <FormState status={status} />
                </section>
            ))}
            <Form></Form>
        </>
    );
}
