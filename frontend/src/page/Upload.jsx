import './Upload.css';
import { useState } from 'react';

export default function Upload() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [ogPrice, setOgPrice] = useState("");
    const [boughtOn, setBoughtOn] = useState("");
    const [condition, setCondition] = useState("");
    const [looking, setLooking] = useState("");



    return (
        <main className="upload">
            <h1>Item upload</h1>
            <div className="item-inputs">
                <div className="item-images">
                    <h3>Main Image</h3>
                    {/* main image will display here */}
                    {/* <img src="/favicon.png" alt="" /> */}
                    <label htmlFor="choose-main" className='choose-file' >Choose File</label>
                    <input type='file' id="choose-main"></input>
                    <h3>Images</h3>
                    <div className="images">
                        {/* other images will display here */}
                        {/* {[...new Array(3)].map(_ => <img src="/favicon.png" alt="" />)} */}
                    </div>
                    <label htmlFor="choose-images" className='choose-file'>Choose File</label>
                    <input type='file' id="choose-images"></input>
                </div>
                <div className="item-infos">
                    <h3>Detail</h3>
                    <span style={{ position: 'relative' }}>
                        <input type="text" id='name' placeholder='Name' onChange={e => setName(e.target.value)} />
                        <label htmlFor="name">{name == '' ? "" : "Name"}</label>
                    </span>
                    <span style={{ position: 'relative', height: '95px'}}>
                        <label htmlFor="description" style={{ color: description == '' ? '#a9a9a9' : 'var(--text-secondary)' }}>Description</label>
                        <textarea name="description" id="description" onChange={e => setDescription(e.target.value)}></textarea>
                    </span>
                    <span style={{ position: 'relative' }}>
                        <input type="text" id='brand' placeholder='Brand' onChange={e => setBrand(e.target.value)} />
                        <label htmlFor="brand">{brand == '' ? "" : "Brand"}</label>
                    </span>
                    <span style={{ position: 'relative' }}>
                        <input type="number" id='ogPrice' placeholder='Origin price' onChange={e => setOgPrice(e.target.value)} />
                        <label htmlFor="ogPrice">{ogPrice == '' ? "" : "Original price"}</label>
                        <p style={{position: 'absolute', top: '10px', right: '10px', fontSize: '14px', fontWeight: 'bold'}}>$</p>
                    </span>
                    <span style={{ position: 'relative' }}>
                        <input type="date" id='boughtOn' placeholder='Bought on' onChange={e => setBoughtOn(e.target.value)} />
                        <label htmlFor="boughtOn">Bought on</label>
                    </span>
                    <span style={{ position: 'relative' }}>
                        <input type="number" id='condition' placeholder='Item Condition' onChange={e => setCondition(e.target.value)} min={1} max={10} />
                        <label htmlFor="condition" className='condition'>{condition == '' ? "" : "Item Condition"}</label>
                        <p style={{position: 'absolute', top: '10px', right: '10px', fontSize: '14px', fontWeight: 'bold'}}>/ 10</p>
                    </span>
                    <span style={{ position: 'relative', height: '95px'}}>
                        <label htmlFor="looking" style={{ color: 'var(--primary)' }}>Looking for (Category or specific)</label>
                        <textarea name="looking" id="looking" onChange={e => setLooking(e.target.value)} style={{color: 'var(--secondary)'}}></textarea>
                    </span>
                    <button id='submit-btn'>Upload</button>
                </div>
            </div>
        </main>
    );
}