import React from 'react';
import {DisplayPart} from "../../components/DisplayPart";
import {UseMountExample} from "./UseMountExample/UseMountExample";
import {UseUnmountExample} from "./UseUnmountExample/UseUnmountExample";
import {UseUpdateEffectExample} from "./useUpdateEffectExample/UseUpdateEffectExample";
import {UseDebounceExample} from "./UseDebounceExample/UseDebounceExample";
import {UseThrottleExample} from "./UseThrottleExample/UseThrottleExample";

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
            <DisplayPart title='UseDebounceExample 防抖'>
                <UseDebounceExample />
            </DisplayPart>
            <DisplayPart title='useThrottleExample 节流'>
                <UseThrottleExample />
            </DisplayPart>
        </div>
    );
}