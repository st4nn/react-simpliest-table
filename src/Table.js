import React from "react";
import PropTypes from 'prop-types';

import jsonArraySort from "./libs/jsonArraySort";
import SortableHeader from "./libs/SortableHeader";

import "./assets/table.css";
import "./assets/fonts/styles.css";

const propTypes = {
    list: PropTypes.array.isRequired,
    iterateFunction: PropTypes.func.isRequired,
    filterFunction: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    defaultSorter: PropTypes.object,
    defaultMaxRecordPerPage: PropTypes.number,
    labels: PropTypes.array.isRequired
};

function useSeachResults(results, filterFunction) {
    const [query, setQuery] = React.useState("");
    const [filteredResults, setFilteredResults] = React.useState(results);

    React.useMemo(() => {
        const result = results.filter(user => {
            return filterFunction(user)
                .toLowerCase()
                .includes(query.toLocaleLowerCase());
        });
        setFilteredResults(result);
    }, [results, query, filterFunction]);

    return { query, setQuery, filteredResults };
}

const Table = ({
        list = [],
        iterateFunction,
        filterFunction,
        fields = [],
        defaultSorter = { parameter: "", order: "asc" },
        defaultMaxRecordPerPage = 25,
        labels = {}
    }) => {

    const language = {
        "all": "Todos",
        "records_per_page": "registros por página",
        "showing": "Mostrando",
        "to": "a",
        "of": "de",
        "rows": "filas",
        "no_data": "No hay registros aún,",
        "no_data_filtered": "Ningún valor coincide con tu filtro",
        "filter": "Filtro,",
        ...labels
    };

    const
        { query, setQuery, filteredResults } = useSeachResults(list, filterFunction),
        [sortParameter, setSortParameter] = React.useState(defaultSorter);

    const 
        [maxRecordPerPage, setMaxRecordPerPage] = React.useState(defaultMaxRecordPerPage),
        [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(()=>{
        setCurrentPage(1);
    }, [maxRecordPerPage, list])

    if (sortParameter.order === "DESC") {
        filteredResults.sort(jsonArraySort(sortParameter.parameter).DESC);
    } else {
        filteredResults.sort(jsonArraySort(sortParameter.parameter).ASC);
    }

    let finalList = filteredResults;
    const paginateData = {
        startShow : 1,
        lastShow : 2,
        maxPage : 100,
        buttons: null
    };

    if (maxRecordPerPage !== "ALL"){
        const 
            start = ((currentPage - 1) * maxRecordPerPage);

        finalList = filteredResults.slice(start, (start + maxRecordPerPage))
        
        paginateData.startShow = 1 + ((currentPage - 1) * maxRecordPerPage);
        paginateData.lastShow = filteredResults.length < maxRecordPerPage ? filteredResults.length : (currentPage * maxRecordPerPage )
        paginateData.maxPage = Math.ceil(filteredResults.length / maxRecordPerPage);
    } else{
        paginateData.startShow = 1;
        paginateData.lastShow = filteredResults.length;
        paginateData.maxPage = 1;
    }

    if (paginateData.maxPage < 3) {
        paginateData.buttons = (
            <React.Fragment>
                <button disabled={currentPage === 1} className={(currentPage === 1 ? "selected" : "")} onClick={e => { setCurrentPage(1) }}>1</button>
                <button disabled={currentPage === 2} className={(currentPage === 2 ? "selected" : "")} onClick={e => { setCurrentPage(2) }}>2</button>
            </React.Fragment>
        )
    } else {
        if (currentPage === 1){
            paginateData.buttons = (
                <React.Fragment>
                    <button disabled={true} className={"selected"} onClick={e => { setCurrentPage(1) }}>1</button>
                    <button onClick={e => { setCurrentPage(2) }}>2</button>
                    <button onClick={e => { setCurrentPage(3) }}>3</button>
                </React.Fragment>
            )
        } else{
            if (currentPage === paginateData.maxPage){
                paginateData.buttons = (
                    <React.Fragment>
                        <button onClick={e => { setCurrentPage(currentPage - 2) }}>{currentPage - 2}</button>
                        <button onClick={e => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</button>
                        <button disabled={true} className={"selected"} onClick={e => { setCurrentPage(1) }}>{currentPage}</button>
                    </React.Fragment>
                )
            } else{
                paginateData.buttons = (
                    <React.Fragment>
                        <button onClick={e => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</button>
                        <button disabled={true} className={"selected"} onClick={e => { setCurrentPage(1) }}>{currentPage}</button>
                        <button onClick={e => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</button>
                    </React.Fragment>
                )
            }
        }
    }

    return (
        <React.Fragment>
            <div className="mg-t-20 mg-b-30 table-header">
                <div className="table-paginate-settings">
                    <select value={maxRecordPerPage} onChange={e=>{setMaxRecordPerPage(e.target.value)}}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value="ALL">{language.all}</option>
                    </select>
                    <span>{language.records_per_page}</span>
                </div>
                <div className="az-header-events-center">
                    <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); }}
                        type="search"
                        className="form-control"
                        placeholder={language.filter}
                        disabled={(list.length === 0)} />
                    <button className="btn"><i className="icon-search"></i></button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mg-b-0">
                    <thead>
                        <SortableHeader
                            sortParameter={sortParameter}
                            setSortParameter={setSortParameter}
                            fields={fields}
                        />
                    </thead>
                    <tbody>
                        {
                            finalList.map(function (user, index) {
                                return iterateFunction(user, index);
                            })
                        }
                        {finalList.length === 0 && (
                            <tr>
                                <td colSpan={fields.length}>{language.no_data_filtered}</td>
                            </tr>
                        )}

                        {list.length === 0 && (
                            <tr>
                                <td colSpan={fields.length}>{language.no_data}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="table-paginate">
                <div className="table-paginate-results">
                    {`${language.showing} `}
                    {paginateData.startShow} 
                    {` ${language.to} `}
                    {paginateData.lastShow}
                    {` ${language.of} `} 
                    {filteredResults.length} 
                    {` ${language.rows}`}
                    {query !== "" && (` (filtrados de ${list.length} registros)`)}
                </div>
                <div className="table-paginate-buttons">
                    {(maxRecordPerPage !== "ALL" && (maxRecordPerPage < filteredResults.length)) && (
                        <React.Fragment>
                            <button onClick={e => { setCurrentPage(1) }}><i className="icon-left-open-big" /> </button>
                            <button disabled={currentPage <= 1} onClick={e => { setCurrentPage((currentPage - 1)) }}><i data-icon="a" className="icon-left-bold" /> </button>
                            {paginateData.buttons}
                            <button disabled={currentPage >= (paginateData.maxPage)} onClick={e => { setCurrentPage((currentPage + 1)) }}><i className="icon-right-bold" /> </button>
                            <button onClick={e => { setCurrentPage(paginateData.maxPage) }}><i className="icon-right-open-big" /> </button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

Table.propTypes = propTypes;

export default Table;
