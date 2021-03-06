```javascript
import React from 'react';

import Table from 'react-simpliest-table';
import list from "config/Films.json";

class BasicTable extends React.Component{
    render(){
        return (
            <React.Fragment>
                <h2>Basic Table</h2>
                <Table
                    list={list}
                    filterFunction={record => `${record.Title} ${record.Director} ${record.description} ${record.dataOwner}`}
                    defaultMaxRecordPerPage={25}
                    defaultSorter={{ parameter: "imdbRating", order: "DESC" }}
                    iterateFunction={(record) => {
                        return (
                            <tr key={record.Title}>
                                <td>
                                    <img src={record.Images[0]} alt={record.Title} style={{ width: "45px", height: "45px" }} />
                                </td>
                                <td>{record.Title}</td>
                                <td>{record.Year}</td>
                                <td>{record.Director}</td>
                                <td>{record.Actors}</td>
                                <td>{record.imdbRating}</td>
                                <td>{record.Released}</td>
                                <td>{record.Runtime}</td>

                            </tr>
                        )
                    }}
                    fields={[{
                        text: ""
                    },
                    {
                        text: "Movie Title",
                        parameter: "Title"
                    }, {
                        text: "Year",
                        parameter: "Year"
                    }, {
                        text: "Film Director",
                        sortable: false
                    }, {
                        text: "Actors",
                        sortable: false
                    }, {
                        text: "Rating of imdb",
                        sortable: false
                    }, {
                        text: "Released date",
                        sortable: false
                    }, {
                        text: "Runtime",
                        parameter: "Runtime"
                    }]} />
            </React.Fragment>
        )
    }
}

export default BasicTable;
```