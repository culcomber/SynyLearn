import React, {useState} from "react";
import classNames from "classnames";

// 1、定义基本类型
export type AlertType = 'success' | 'default' | 'danger' | 'warning'
// 2、定义组件类型
export interface AlertProps {
    /**标题 */
    title: string;
    /**描述 */
    description?: string;
    /**类型 四种可选 针对四种不同的场景 */
    alertType?: AlertType;
    /**关闭alert时触发的事件 */
    onClose?: () => void;
    /**是否显示关闭图标*/
    closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
    const { title, description, alertType, onClose, closable } = props;
    // 3、定义样式
    const classes = classNames('alert', {
        [`alert-${alertType}`]: alertType,
    })
    // 4、关闭逻辑
    const [close, setClose] = useState(true);

    return (
        <>
            {closable
                ? (
                    <div className={classes}>
                        <p>{title}</p>
                        <p>{description}</p>
                    </div>
                )
                : <>
                    {close && (
                        <div className={classes}>
                            <p>{title}</p>
                            <p>{description}</p>
                            <button onClick={() => setClose(false)}>关闭</button>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default Alert;