import React from 'react';
import {DisplayPart} from "../../components/DisplayPart";
import {UseMountExample} from "./UseMountExample/UseMountExample";
import {UseUnmountExample} from "./UseUnmountExample/UseUnmountExample";
import {UseUpdateEffectExample} from "./useUpdateEffectExample/useUpdateEffectExample";
import {UseDebounceStateExample} from "./UseDebounceStateExample/UseDebounceStateExample";

export default function CustomHooks() {
    return (
        <div style={{margin: '20px 60px'}}>
            <DisplayPart title='UseMountExample 在组件初次渲染时执行逻辑'>
                <UseMountExample />
            </DisplayPart>
            <DisplayPart title='UseUnmountExample 在组件卸载时触发逻辑'>
                <UseUnmountExample />
            </DisplayPart>
            <DisplayPart title='useUpdateEffectExample 在依赖项发生变化时去执行某些逻辑'>
                <UseUpdateEffectExample />
            </DisplayPart>
            <DisplayPart title='UseDebounceStateExample 防抖'>
                <UseDebounceStateExample />
            </DisplayPart>
        </div>
    );
}