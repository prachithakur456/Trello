import React, { PureComponent } from "react";
import Header from './Header';

class Main extends PureComponent {
    render() {
        return <>
            <Header />
            <div>
                <h1>Welcome to Trello App!!</h1>
            </div></>
    }
}

export default Main;