import React from 'react';
import $ from "jquery";
import api from "../api";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

import {Link} from "react-router-dom";
import Cookies from "universal-cookie";


function ReviewForm(params) {

    console.log("review forms params", params);
    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        console.log("data",data);
        let action = {
            type: 'UPDATE_REVIEW_FORM',
            data: data,
        };
        console.log("update action",action);
        params.dispatch(action);
    }

    let cookie = new Cookies();

    function submit() {
        if(params.params.review_form.thoughts===""){
            params.dispatch({type: 'ERROR', msg: 'Please enter some thoughts!'});
        } else {
            console.log("thoughts", params.params.review_form.thoughts);
            //api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
            let id = cookie.get('id');
            api.add_review(id,params.params.details.imdbID,
                params.params.details.Title, params.params.review_form.thoughts);
        }
    }

    if(params.params.review_form.thoughts==="") {
        return (
            <div>
                <div>A review for {params.params.details.Title}</div>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid" value={params.params.details.imdbID}/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title" value={params.params.details.Title}/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Thoughts:</Label>
                        <Input type="text" name="description" placeholder="My thoughts"
                               value={params.params.review_form.description} onChange={update}/>
                    </FormGroup>
                    <Button onClick={submit} type="button" className="btn btn-primary">Submit</Button>
                </FormGroup>
            </div>
        );
    } else {
        return (
            <div>
                <div>A review for {params.params.details.Title}</div>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid" value={params.params.details.imdbID}/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title" value={params.params.details.Title}/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Thoughts:</Label>
                        <Input type="text" name="description" placeholder="My thoughts"
                               value={params.params.review_form.description} onChange={update}/>
                    </FormGroup>
                    <Link to={"/profile"} exact={"true"}>
                        <Button onClick={submit} type="button" className="btn btn-primary">Submit</Button>
                    </Link>
                </FormGroup>
            </div>
        );
    }
}

function state2props(state) {
    console.log("rerender", state);
    return { review_form: state.review_form };
}

export default connect(state2props)(ReviewForm);
