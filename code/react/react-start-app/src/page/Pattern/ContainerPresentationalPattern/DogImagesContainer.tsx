import React from "react";
import DogImages from "./DogImages";

export default class DogImagesContainer extends React.Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            dogs: []
        };
    }

    componentDidMount() {
        fetch("https://dog.ceo/api/breed/labrador/images/random/6")
            .then(res => res.json())
            .then(({ message }) => this.setState({ dogs: message }));
    }

    render() {
        // @ts-ignore
        return <DogImages dogs={this.state.dogs} />;
    }
}