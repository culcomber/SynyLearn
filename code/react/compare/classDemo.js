const withWindowSize = Component => {
// 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
    class WrappedComponent extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                size: this.getSize()
            };
        }
        componentDidMount() {
            window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }
        getSize() {
            return window.innerWidth > 1000 ? "large" : "small";
        }
        handleResize = ()=> {
            const currentSize = this.getSize();
            this.setState({
                size: this.getSize()
            });
        }
        render() {
            // 为了传递一个外部的状态，得不定义一个没有 UI 的外层组件，而这个组件只是为了封装一段可重用的逻辑
            // 将窗口大小传递给真正的业务逻辑组件
            return <Component size={this.state.size} />;
        }
    }
    return WrappedComponent;
};

class MyComponent extends React.Component{
    render() {
        const { size } = this.props;
        if (size === "small") return <SmallComponent />;
        else return <LargeComponent />;
    }
}
// 使用 withWindowSize 产生高阶组件，用于产生 size 属性传递给真正的业务组件
export default withWindowSize(MyComponent);