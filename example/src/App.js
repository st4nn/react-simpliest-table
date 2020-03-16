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
