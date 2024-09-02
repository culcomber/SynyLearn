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
    type?: AlertType;
    /**关闭alert时触发的事件 */
    onClose?: () => void;
    /**是否显示关闭图标*/
    closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
    const { title, description, type = 'default', onClose, closable = true } = props;
    // 3、定义样式
    const classes = classNames('viking-alert', {
        [`viking-alert-${type}`]: type,
    })
    const titleClass = classNames('viking-alert-title', {
        'bold-title': description
    })
    // 4、关闭逻辑
    const [ hide, setHide ] = useState(false)
    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose()
        }
        setHide(true)
    }

    return (
        <>
            {closable
                ? (
                    <div className={classes}>
                        <p>{title}</p>
                        <p>{description}</p>
                        <button onClick={() => setHide(false)}>关闭</button>
                    </div>
                )
                : <>
                {!hide && (
                        <div className={classes}>
                            <p>{title}</p>
                            <p>{description}</p>
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default Alert;