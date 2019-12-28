import React from 'react';

const SearchBox = React.forwardRef((props, ref) => {
    const { onClearSearch, onChangeSearchText, ...inputAttributes } = props;

    const closeButtonStyle = {
        position: "absolute",
        display: "inline-block",
        right: 2,
        border: 0,
        padding: 0,
        margin: "5px",
        backgroundColor: "transparent",
        cursor: "pointer",
        outline: "none",
        height: 16,
        width: 16
    }

    return (<div style={{ width: "100%", position: "relative" }}>
        <input autoFocus ref={ref} type="text" placeholder="Search data"
            style={{
                width: "100%", border: "1px solid #ccc", padding: "5px 10px",
                boxSizing: "border-box",
            }}
            onChange={e => onChangeSearchText(e.target.value)}
            {...inputAttributes} />
        <button type="button" onClick={onClearSearch} style={closeButtonStyle}><span className="close"></span></button>
    </div>)
});

export default SearchBox;