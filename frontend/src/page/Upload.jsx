import DetailInput from '../component/DetailInput';
import AreaInput from '../component/AreaInput';
import './Upload.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router';

export default function Upload() {
    const { user } = useOutletContext();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [ogPrice, setOgPrice] = useState("");
    const [boughtOn, setBoughtOn] = useState("");
    const [condition, setCondition] = useState("");
    const [looking, setLooking] = useState("");

    //images
    const [mainImg, setMainImg] = useState(null);
    const [images, setImages] = useState([]);

    const handleUploadClick = () => {
        const formData = new FormData();

        // Append main image
        if (mainImg) formData.append("main_img", mainImg.file);

        // Append multiple images
        images.filter(img => !img.isMain).forEach(img => {
            formData.append("images", img.file);
        });

        // Append other fields
        formData.append("name", name);
        formData.append("description", description);
        formData.append("original_price", ogPrice);
        formData.append("bought_on", boughtOn);
        formData.append("item_condition", condition);
        formData.append("looking_for", looking);
        formData.append("owner_id", user._id);

        fetch("http://localhost:3000/item/upload", {
            method: "POST",
            credentials: "include",
            body: formData, // <--- send FormData directly
            // DO NOT set Content-Type, browser will handle multipart/form-data
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    };


    //select and preview img (main img)
    const handleMainImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImg(URL.createObjectURL(file));

            setImages(prev => prev.filter(img => !img.isMain));
            setImages(prev => [...prev, { file, preview: URL.createObjectURL(file), isMain: true }]);
        }
        console.log(mainImg, images)
    }

    //select and preview imgs (all imgs including main one)
    const handleImgChange = (e) => {
        const files = Array.from(e.target.files);

        //limit image selection
        if (images.length + files.length > 4) {
            alert(`You can only upload up to 4 images`);
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]); // append new images
    };

    //remove main img
    const handleRemoveMainImage = () => {
        setMainImg(null); // clear main image

        // Remove from images array too
        setImages(prev => prev.filter(img => !img.isMain));
    };

    //remove other imgs (main one included)
    const handleRemoveImage = (index) => {
        const imgToRemove = images[index];

        // Remove from images array
        setImages(prev => prev.filter((_, i) => i !== index));

        // If it's the main image, also clear mainImg and mainImgFile
        if (imgToRemove.isMain) {
            setMainImg(null);
            setMainImgFile(null);
        }
    };

    return (
        <main className="upload">
            <h1>Item upload</h1>
            <div className="item-inputs">
                <div className="item-images">
                    <h3>Main Image</h3>
                    {/* main image will display here */}
                    {mainImg &&
                        <div style={{ position: 'relative', width: '150px' }}>
                            <img src={mainImg} alt="" />
                            <button
                                type="button"
                                style={{
                                    position: "absolute",
                                    top: '5px',
                                    right: '-5px',
                                    background: "var(--secondary)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    width: '20px',
                                    height: '20px'
                                }}
                                onClick={handleRemoveMainImage}>
                                x
                            </button>
                        </div>}
                    <label htmlFor="choose-main" className='choose-file' >Choose File</label>
                    <input type='file' id="choose-main" accept='image/*' onChange={handleMainImgChange}></input>
                    <h3>Images</h3>
                    <div className="images">
                        {/* other images will display here */}
                        {images.map((src, i) =>
                            <div style={{ position: 'relative' }}>
                                <img key={i} src={src.preview} alt="" />
                                <button
                                    type="button"
                                    style={{
                                        position: "absolute",
                                        top: '5px',
                                        right: '-5px',
                                        background: "var(--secondary)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        width: '20px',
                                        height: '20px'
                                    }}
                                    onClick={() => handleRemoveImage(i)}>
                                    x
                                </button>
                            </div>
                        )}
                    </div>
                    <label htmlFor="choose-images" className='choose-file'>Choose File</label>
                    <input type='file' id="choose-images" multiple accept='image/*' onChange={handleImgChange}></input>
                </div>
                <div className="item-infos">
                    <h3>Detail</h3>
                    <DetailInput type="text" data='name' placeholder='Name' setter={setName} getter={name} />
                    <AreaInput data="description" label="Description" setter={setDescription} getter={description} />
                    <DetailInput type="text" data='brand' placeholder='Brand' setter={setBrand} getter={brand} />
                    <DetailInput type="number" data='price' placeholder='Original Price' setter={setOgPrice} getter={ogPrice} p="$" />
                    <DetailInput type="date" data='boughtOn' placeholder='Bought on' setter={setBoughtOn} getter={boughtOn} />
                    <DetailInput type="number" data='condition' placeholder='Condition' setter={setCondition} getter={condition} p="/ 10" />
                    <AreaInput data="looking" label="Looking for (Category or specific)" setter={setLooking} getter={looking} color1='var(--primary)' color2='var(--secondary)' />
                    <button id='submit-btn' onClick={handleUploadClick}>Upload</button>
                </div>
            </div>
        </main>
    );
}