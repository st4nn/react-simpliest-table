import React, { Component } from 'react'

import Table from "./Table";

export default class extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return <Table {...this.props} />
    }
}
