import DetailInput from '../component/DetailInput';
import AreaInput from '../component/AreaInput';
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
                    <DetailInput type="text" data='name' placeholder='Name' setter={setName} getter={name}/>
                    <AreaInput data="description" label="Description" setter={setDescription} getter={description}/>
                    <DetailInput type="text" data='brand' placeholder='Brand' setter={setBrand} getter={brand}/>
                    <DetailInput type="number" data='price' placeholder='Original Price' setter={setOgPrice} getter={ogPrice} p="$"/>
                    <DetailInput type="date" data='boughtOn' placeholder='Bought on' setter={setBoughtOn} getter={boughtOn}/>
                    <DetailInput type="number" data='condition' placeholder='Condition' setter={setCondition} getter={condition} p="/ 10"/>
                    <AreaInput data="looking" label="Looking for (Category or specific)" setter={setLooking} color1='var(--primary)' color2='var(--secondary)'/>
                    <button id='submit-btn'>Upload</button>
                </div>
            </div>
        </main>
    );
}