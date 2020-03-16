## react-simpliest-table

React Simpliest Table is a [react](https://github.com/facebook/react) table filterable, sortable, and pagination. Was prepared under [Bootstrap](https://getbootstrap.com/) styles.

This React component was inspired by the [DataTables.net](https://datatables.net/) plugin.

### Installation

You can install react-simpliest-table component using the npm package manager:

` npm install --save react-simpliest-table`

#### Dependencies

This component [peer depends](https://docs.npmjs.com/files/package.json#peerdependencies) on the [React](https://reactjs.org/) library

You can install React using _npm_ too:

`npm install --save react`

### Usage

```javascript
import React from 'react';
import Table from 'react-simpliest-table';

const example = ({list = []})=>{
    return (
        <Table
            list={list}
            filterFunction={record => record.name + " " record.second_columns}
            defaultMaxRecordPerPage={25}
            defaultSorter={{ parameter: "name", order: "DESC" }}
            iterateFunction={(record) => {
            return (
                <tr key={record.name}>
                    <td>
                        <img src={record.image} alt={record.name} style={{ width: "45px", height: "45px" }} />
                    </td>
                    <td>{record.name}</td>
                    <td>{record.second_column}</td>
                </tr>
            )
            }}
            fields={[{
                text: ""
            },{
                text: "Name",
                parameter: "name"
            }, {
                text: "Second Columnd",
                parameter: "second_column"
            }]} />
    )
}
```

### Properties

| Property        | Type           | Default  | Description |
| --------------- |:--------------:|:--------:|:------------|
| list      | array | [] | The whole list to filter |
| filterFunction | function | null | Specified the fields where the input filter should find coincidences, filter value will be compared with the returned value on this function |
| iterateFunction | function | null | Defines how the tbody will be builded, the function must returns one array of tr elements |
| fields | array | [] | Contains the header elements |
| defaultMaxRecordPerPage | integer      |    25 | Describes how many records per page will be render |
| defaultSorter | json | null | When there are sorter columns, this is the default sorter param, the object should has this structure: `{ "parameter": "index_name_in_the_list", "order": ("ASC" || "DESC")`|
|labels | json | See down on Custom Labels | Allows to change the text labels or put your own translation |


#### Fields property

Contains the header elements, You must use the follow properties, is and json array.

For example:

```
[{
    text: ""
},{
    text: "Name",
    parameter: "name"
}, {
    text: "Second Columnd",
    parameter: "second_column"
}]
```


##### Params

| Property        | Type           | Default  | Description |
| --------------- |:--------------:|:--------:|:------------|
| text            | string         | null *is required* | Text to show on the thead td |
| parameter       | string         | null | index to find in the list object, allows the sort function | 
| sortable        | boolean        | true | Defines if the column allow sort |
##### Examples

###### Empty header

```javascript
    {
        "text": ""
    }
```

###### No sortable header

```javascript
    {
        "text": "This is no sortable title",
        "sortable": false
    }
```

###### Sortable header

```javascript
    {
        "text": "This is no sortable title",
        "parameter": "my_title_index"
    }
```

In this case, the table will be sorted by the _my_title_index_ in the _list object_ ascending or descending.

#### Custom labels

Is a Json object with the labels description, by default the labels is in english, so you should be change it by your own language.

The default object is:

```javascript

{
    "all": "All",
    "records_per_page": "Records per page",
    "showing": "Showing",
    "to": "to",
    "of": "of",
    "rows": "rows",
    "no_data": "No records yet,",
    "no_data_filtered": "No value matches your filter",
    "filter": "Filter",
}
````

If you want to change it, here there is an example:

```javascript
   <Table
        list={list}
        filterFunction={record => record.name + " " record.second_columns}
        labels={
            "all": "Mostrar todos",
            "records_per_page": "Registros por página",
            "showing": "Está mostrando",
            "to": "a",
            "of": "de",
            "rows": "filas",
            "no_data": "Tu listado está vacío",
            "no_data_filtered": "Sin coincidencias filtradas",
            "filter": "Pon tu filtro aquí"
        }
```

### Demo

You can see an example [here](https://github.com/st4nn/react-simpliest-table/blob/master/example/src/App.js)

### License

This component is released with [ISC License](https://en.wikipedia.org/wiki/ISC_license)