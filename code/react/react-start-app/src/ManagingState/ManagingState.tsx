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
// @ts-ignore
import DisappearingInputText from "./3LiftStateUp/DisappearingInputText.tsx";
// @ts-ignore
import SwapTwoFormFields from "./3LiftStateUp/SwapTwoFormFields.tsx";
// @ts-ignore
import ContactManager from "./3LiftStateUp/ContactManager.tsx";
// @ts-ignore
import Gallery from "./3LiftStateUp/Gallery.tsx";
// @ts-ignore
import ContactList from "./3LiftStateUp/ContactList.tsx";
// @ts-ignore
import TaskApp from "./4ExtractingStateReducer/TaskApp.tsx";
// @ts-ignore
import Messenger from "./4ExtractingStateReducer/Messenger.tsx";
// @ts-ignore
import ProfilePage from "./5PassingDataContext/ProfilePage.tsx";
// @ts-ignore
import TaskReducerContext from "./4ExtractingStateReducer/TaskReducerContext.tsx";

let statuses = [
    'empty',
    'typing',
    'submitting',
    'success',
    'error',
];

function DisplayPart({title, children}) {
    return (
        <>
            <h2 className={'part-color'}>{title}</h2>
            {children}
            <hr/>
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
                        <FormState status={status}/>
                    </section>
                ))}
                <Form/>
                <br/>
                <EditProfile/>
            </DisplayPart>
            <DisplayPart title='4.2 Reacting to Input with State'>
                <TravelPlan/>
                <MailClient/>
            </DisplayPart>
            <DisplayPart title='4.3 Sharing State Between Components'>
                <FilterableList/>
            </DisplayPart>
            <DisplayPart title='4.4 Preserving and Resetting State'>
                <br/>
                <h4 className={'title-color'}>1. Fix disappearing input text</h4>
                <DisappearingInputText/>
                <br/>
                <h4 className={'title-color'}>2. Swap two form fields</h4>
                <SwapTwoFormFields/>
                <br/>
                <h4 className={'title-color'}>3. Reset a detail form</h4>
                <ContactManager/>
                <br/>
                <h4 className={'title-color'}>4. Clear an image while it’s loading</h4>
                <Gallery/>
                <br/>
                <h4 className={'title-color'}>5. Fix misplaced state in the list</h4>
                <ContactList/>
                <br/>
            </DisplayPart>
            <DisplayPart title='4.5 Extracting State Logic into a Reducer'>
                <TaskApp/>
                <br/>
                <Messenger/>
            </DisplayPart>
            <DisplayPart title='4.5 Extracting State Logic into a Reducer'>
                <ProfilePage/>
                <br/>
            </DisplayPart>
            <DisplayPart title='4.6 Passing Data Deeply with Context'>
                <TaskReducerContext />
                <br/>
            </DisplayPart>
        </div>
    );
}