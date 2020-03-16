```javascript
import React from 'react';

import Table from 'react-simpliest-table';
import list from "config/Films.json";

class BasicTable extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h2>Internationalization</h2>
                <Table
                    list={list}
                    filterFunction={record => `${record.Title} ${record.Director} ${record.description} ${record.dataOwner}`}
                    defaultMaxRecordPerPage={5}
                    defaultSorter={{ parameter: "imdbRating", order: "DESC" }}
                    label={{
                        "all": "Todos",
                        "records_per_page": "registros por página",
                        "showing": "Mostrando",
                        "to": "a",
                        "of": "de",
                        "rows": "filas",
                        "no_data": "No hay registros aún,",
                        "no_data_filtered": "Ningún valor coincide con tu filtro",
                        "filter": "Filtro,"
                    }}
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
                        text: "Título de la Película",
                        parameter: "Title"
                    }, {
                        text: "Año de lanzamiento",
                        parameter: "Year"
                    }, {
                        text: "Director",
                        sortable: false
                    }, {
                        text: "Actores",
                        sortable: false
                    }, {
                        text: "Calificación de imdb",
                        sortable: false
                    }, {
                        text: "Fecha de publicación",
                        sortable: false
                    }, {
                        text: "Duración",
                        parameter: "Runtime"
                    }]} />
            </React.Fragment>
        )
    }
}

export default BasicTable;
```