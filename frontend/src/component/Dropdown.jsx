import './Dropdown.css';
import { useState } from 'react';

export default function Dropdown(props) {
    const {getter, setter, categoryList} = props;

    const select_style = {
        textAlign: 'end',
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: 'var(--darken-background)',
        border: 'none',
        textTransform: 'capitalize',
    }

    return (
        <span style={{position: 'relative'}}>
            <label htmlFor="category" style={{pointerEvents: 'none'}}>Category</label>
            <select name="category" id="category" style={select_style} value={getter} onChange={e => (setter(e.target.value))}>
                {categoryList.map((v, i) => {
                    return <option value={v._id}>{v.name}</option>
                })}
            </select>
        </span>
    );
}