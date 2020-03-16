
* [Basic Table](https://github.com/st4nn/react-simpliest-table/blob/master/example/src/components/BasicTable)

* [With Pagination](https://github.com/st4nn/react-simpliest-table/blob/master/example/src/components/Paginate)

* [Internationalization](https://github.com/st4nn/react-simpliest-table/blob/master/example/src/components/Internationalization)

* [Custom Styles](https://github.com/st4nn/react-simpliest-table/blob/master/example/src/components/CustomStyles)

```javascript
import React from 'react';

import Introduction from "components/Introduction";
import BasicTable from "components/BasicTable";
import Paginate from "components/Paginate";
import Internationalization from "components/Internationalization";
import CustomStyles from "components/CustomStyles";

function App() {
  return (
    <div className="App">
      <div style={{ "padding": "1em", "backgroundColor": "#fff" }}>
        <Introduction />

        <BasicTable />

        <Paginate />

        <Internationalization />

        <CustomStyles />
      </div>
    </div>
  );
}

export default App;
```