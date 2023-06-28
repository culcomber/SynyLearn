// @ts-ignore
import FormState from "./1declarativeUI/FormState.tsx";
// @ts-ignore
import Form from "./1declarativeUI/Form.tsx";
// @ts-ignore
import EditProfile from "./1declarativeUI/EditProfile.tsx";
// @ts-ignore
import TravelPlan from "./2StateStructure/TravelPlan.tsx";
// @ts-ignore
import MailClient from "./2StateStructure/MailClient.tsx";
// @ts-ignore
import FilterableList from "./3LiftStateUp/FilterableList.tsx";

let statuses = [
    'empty',
    'typing',
    'submitting',
    'success',
    'error',
];

function DisplayPart ({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr />
        </>
    );
}

export default function ManagingState() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayPart title='4.1 Reacting to Input with State'>
                {statuses.map(status => (
                    <section key={status}>
                        <h4 className={'title-color'}>Form ({status}):</h4>
                        <FormState status={status} />
                    </section>
                ))}
                <Form></Form>
                <br/>
                <EditProfile></EditProfile>
            </DisplayPart>
            <DisplayPart title='4.2 Reacting to Input with State'>
                <TravelPlan></TravelPlan>
                <MailClient></MailClient>
            </DisplayPart>
            <DisplayPart title='4.3 Sharing State Between Components'>
                <FilterableList></FilterableList>
            </DisplayPart>
        </div>
    );
}