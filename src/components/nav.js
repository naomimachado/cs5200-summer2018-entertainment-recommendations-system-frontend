import React from 'react';
import { Form, Button, FormGroup, Input } from 'reactstrap';
import $ from "jquery";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

function Nav(props) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        console.log("data",data);
        let action = {
            type: 'UPDATE_LOGIN_FORM',
            data: data,
        };
        console.log(action);
        props.dispatch(action);

    }

    function login() {
        alert("to do api calls")
    }

    return (
        <div className="navbar">
            <Form inline>
                <FormGroup>
                    <Input type="text" name="username" placeholder="username"
                           value={props.login.username} onChange={update} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="password"
                           value={props.login.password} onChange={update} />
                </FormGroup>
                <Button onClick={login} type="button" className="btn btn-primary">Log In</Button>
            </Form>
            <Link to="/registration" exact="true">New here? Register Now!</Link>
        </div>
    );
}

function state2props(state) {
    console.log("rerender", state);
    return { login: state.login };
}

export default connect(state2props)(Nav);