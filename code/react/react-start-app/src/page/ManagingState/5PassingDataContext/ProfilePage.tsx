import Heading from './Heading';
import Section from './Section';
import React from 'react';

export default function ProfilePage() {
    return (
        <>
            <Section>
                <Heading>My Profile</Heading>
                <Post
                    title="Hello traveller!"
                    body="Read about my adventures."
                />
                <AllPosts/>
            </Section>
            {/*<Section level={1}>
                <Heading>Title</Heading>
                <Section level={2}>
                    <Heading>Heading</Heading>
                    <Heading>Heading</Heading>
                    <Heading>Heading</Heading>
                    <Section level={3}>
                        <Heading>Sub-heading</Heading>
                        <Heading>Sub-heading</Heading>
                        <Heading>Sub-heading</Heading>
                        <Section level={4}>
                            <Heading>Sub-sub-heading</Heading>
                            <Heading>Sub-sub-heading</Heading>
                            <Heading>Sub-sub-heading</Heading>
                        </Section>
                    </Section>
                </Section>
            </Section>*/}
        </>
    );
}

function AllPosts() {
    return (
        <>
            <Section>
                <Heading>Posts</Heading>
                <RecentPosts/>
            </Section>
        </>

    );
}

function RecentPosts() {
    return (
        <>
            {/*@ts-ignore*/}
            <Section>
                <Heading>Recent Posts</Heading>
                <Post
                    title="Flavors of Lisbon"
                    body="...those pastéis de nata!"
                />
                <Post
                    title="Buenos Aires in the rhythm of tango"
                    body="I loved it!"
                />
            </Section>
        </>
    );
}

function Post({title, body}) {
    return (
        <Section isFancy={true}>
            <Heading>
                {title}
            </Heading>
            <p><i>{body}</i></p>
        </Section>
    );
}


