```javascript
import React from 'react';

import Table from 'react-simpliest-table';
import list from "config/Films.json";

import "./styles.css";

class BasicTable extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2>Custom Styles</h2>
                <div className="custom-styles-table">
                    <Table
                        list={list}
                        filterFunction={record => `${record.Title} ${record.Director} ${record.description} ${record.dataOwner}`}
                        defaultMaxRecordPerPage={5}
                        defaultSorter={{ parameter: "imdbRating", order: "DESC" }}
                        iterateFunction={(record) => {
                            return (
                                <tr key={record.Title}>
                                    <td>
                                        <img src={record.Images[0]} alt={record.Title} style={{ width: "45px", height: "45px" }} />
                                    </td>
                                    <td style={{"backgroundColor": "blue", "color": "white" }}>{record.Title}</td>
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
                </div>
            </React.Fragment>
        )
    }
}

export default BasicTable;
```

```css
.custom-styles-table thead tr{
    background: rgba(0, 0, 0, 0.84);
    color: white;
}

.custom-styles-table thead tr th{
    font-size: 0.6rem;
    padding: 1rem 0;
    text-align: center;
    text-transform: uppercase;
}

.custom-styles-table tbody{
    background: rgba(255, 0, 0, 0.2);
}

.custom-styles-table .table-header{
    background: rgba(0, 0, 0, 0.24);
    font-weight: 300;
    padding: 2rem;
    text-transform: uppercase;
}

.custom-styles-table .table-header select{
    background: black;
    color: white;
}

.custom-styles-table .table-header input{
    background: rgba(0, 0, 0, 0.64);
    border: 2px dashed black;
    color: white;
    padding-left: 2rem;
}

.custom-styles-table .table-paginate{
    font-size: 0.7em;
    font-weight: 700;
}

.custom-styles-table .table-paginate button{
    background: red;
    color: blue;
}

.custom-styles-table .table-paginate button.selected{
    background: purple !important;
    color: white;
}
```