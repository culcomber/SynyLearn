import { LevelContext } from './LevelContext.js';
import { useContext } from 'react';

export default function Section({ children, isFancy }) {
    /*return (
        <section className="section">
            {/!*if any component inside this <Section> asks for LevelContext, give them this level.*!/}
            <LevelContext.Provider value={level}>
                {children}
            </LevelContext.Provider>
        </section>
    );*/
    const level = useContext(LevelContext);

    return (
        <section className={
            'section ' +
            (isFancy ? 'fancy' : '')
        }>
            <LevelContext.Provider value={level + 1}>
                {children}
            </LevelContext.Provider>
        </section>
    );
}


