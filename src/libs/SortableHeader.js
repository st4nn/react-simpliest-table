import React from "react";

const SortableHeader = (props)=>{
    const {sortParameter} = props;
    return (
        <tr>
        {
            props.fields.map((row, index)=>{
                if (row.sortable === false){
                    return (<th key={index}>{row.text}</th>)
                }
                const isSelected = (sortParameter.parameter === row.parameter);
                return (
                    <th key={index} style={{ "cursor": "default" }} onClick={() => { 
                        if (isSelected){
                            const _order = (sortParameter.order === "ASC" ? "DESC" : "ASC");
                            props.setSortParameter({ parameter: row.parameter, order : _order});
                        } else{
                            props.setSortParameter({ parameter: row.parameter, order: "ASC"});
                        }
                    }}>{row.text} {(isSelected) &&
                            (<i className={"icon-" + (sortParameter.order === "DESC" ? "up" : "down") + "-dir"} style={{ float: "right" }} />)
                    }</th>
                )
            })
        }
        </tr>
    );
}

export default SortableHeader;
