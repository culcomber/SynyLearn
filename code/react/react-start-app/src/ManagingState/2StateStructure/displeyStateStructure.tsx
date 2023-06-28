// @ts-ignore
import TravelPlan from "./TravelPlan.tsx";
// @ts-ignore
import MailClient from "./MailClient.tsx";

export default function DisplayStateStructure() {
    return (
        <>
            <h2 className={'part-color'}>4.2 Reacting to Input with State</h2>
            <TravelPlan></TravelPlan>
            <MailClient></MailClient>
            <hr />
        </>
    );
}
