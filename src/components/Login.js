import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Header from './Header';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        let loggedIn = false;
        this.state = {
            email: '',
            password: '',
            loggedIn
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        if (!email) {
            alert("Email is required");
        } else if (!password) {
            alert("Password is required");
        } else if (
            email === "prachi@momoshub.com" &&
            password === "123456"
        ) {
            axios.post('https://stg-api.momoshub.com/api/v1/auth/login', {
                user: email,
                password: password
            }).then(res => {
                localStorage.setItem("token", res.accessToken);
                this.setState({ loggedIn: true })
            })
        } else {
            alert("Wrong email or password combination");
        }

    }
    render() {
        if (this.state.loggedIn) return <Redirect to="/home" />
        return (
            <>
                <Header />
                <div className="Login">
                    <form className="form" onSubmit={this.submitForm}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="nome@email.com" onChange={this.onChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={this.onChange} />
                        </div>
                        <button className="primary">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}