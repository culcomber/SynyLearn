import { useState } from 'react';
// @ts-ignore
import { initialTravelPlan, initialTravelPlanFlat } from './places.js';

function PlaceTree({ id, placesFlat, parentId, onComplete }) {
    // 不渲染两层级，通过
    // const childPlaces = place.childPlaces;
    const place = placesFlat[id];
    const childIds = place.childIds;
    return (
        <li>
            {place.title}
            <button onClick={() => {
                onComplete(parentId, id);
            }}>
                Complete
            </button>
            {/*{childPlaces.length > 0 && (
                <ol>
                    {childPlaces.map(place => (
                        <PlaceTree key={place.id} place={place} />
                    ))}
                </ol>
            )}*/}
            {childIds.length > 0 && (
                <ol>
                    {childIds.map(childId => (
                        <PlaceTree
                            key={childId}
                            id={childId}
                            parentId={id}
                            placesFlat={placesFlat}
                            onComplete={onComplete}
                        />
                    ))}
                </ol>
            )}
        </li>
    );
}

export default function TravelPlan() {
    /*const [plan, setPlan] = useState(initialTravelPlan);
    const planets = plan.childPlaces;*/
    // 使用扁平化数据
    const [planFlat, setPlan] = useState(initialTravelPlanFlat);
    const root = planFlat[0];
    const planetIds = root.childIds;

    function handleComplete(parentId, childId) {
        const parent = planFlat[parentId];
        // Create a new version of the parent place
        // that doesn't include this child ID.
        const nextParent = {
            ...parent,
            childIds: parent.childIds
                .filter(id => id !== childId)
        };
        // Update the root state object...
        setPlan({
            ...planFlat,
            // ...so that it has the updated parent.
            [parentId]: nextParent
        });
    }

    return (
        <>
            <h2>Places to visit</h2>
            <ol>
                {/*{planets.map(place => (
                    <PlaceTree key={place.id} place={place} />
                ))}*/}
                {planetIds.map(id => (
                    <PlaceTree
                        key={id}
                        id={id}
                        placesFlat={planFlat}
                        onComplete={handleComplete}
                        parentId={0}
                    />
                ))}
            </ol>
        </>
    );
}