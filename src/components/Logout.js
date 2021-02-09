import React from 'react';
import Header from './Header';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("token");
    }
    render() {
        return (
            <div>
                <Header />
                <h1>You have been Logout!!</h1>
            </div>
        )
    }
}