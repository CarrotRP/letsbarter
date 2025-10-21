import DetailInput from '../component/DetailInput';
import AreaInput from '../component/AreaInput';
import './Upload.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router';
import Dropdown from '../component/Dropdown';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Toaster from "../component/Toaster";
import { useTranslation } from 'react-i18next';
import { BASE_URL } from "../config/apiConfig";

export default function Upload() {
    const { id } = useParams();
    const { user } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    //uploading status
    const [isSending, setIsSending] = useState(false);
    //form detail
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [ogPrice, setOgPrice] = useState("");
    const [boughtOn, setBoughtOn] = useState("");
    const [condition, setCondition] = useState("");
    const [looking, setLooking] = useState("");

    //images
    const [mainImg, setMainImg] = useState(null);
    const [images, setImages] = useState([]);

    //category list
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        //getting category
        fetch(`${BASE_URL}/category/`)
            .then(res => res.json())
            .then(data => {
                setCategoryList(data);
                setCategory(data[0]._id);
            });

        //on edit, get current item detail
        if (id) {
            fetch(`${BASE_URL}/item/${id}`)
                .then(res => res.json())
                .then(data => {
                    setName(data?.name);
                    setDescription(data.description);
                    setCategory(data.category_id);
                    setOgPrice(data.original_price);
                    setBoughtOn(data.bought_on?.split('T')[0]);
                    setCondition(data.item_condition);
                    setLooking(data.looking_for);
                    setBrand(data.brand);

                    if (data.main_img) {
                        setMainImg({ file: null, preview: data.main_img, isMain: true });
                    }

                    if (data.imgs) {
                        setImages([{ file: null, preview: data.main_img, isMain: true }, ...data.imgs.map(path => ({
                            file: null,
                            preview: `${path}`
                        }))])
                    }
                });
        }
    }, [id]);

    const handleUploadClick = () => {
        if(condition <= 10 && mainImg){
            var url, method;
            const formData = new FormData();
    
            //display issending so user knows, its sending
            setIsSending(true);
    
            // Append main image
            if (mainImg) formData.append("main_img", mainImg.file);
    
            // Append multiple images
            images.filter(img => !img.isMain).forEach(img => {
                formData.append("images", img.file);
            });
            
            images.filter(img => !img.file && !img.isMain).forEach(img => {
                formData.append("existing_images", img.preview);
            })
    
            // Append other fields
            formData.append("name", name);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("brand", brand)
            formData.append("original_price", ogPrice);
            formData.append("bought_on", boughtOn);
            formData.append("item_condition", condition);
            formData.append("looking_for", looking);
            formData.append("owner_id", user._id);
    
            const estimate_value = ogPrice * condition / 10;
    
            formData.append("estimate_value", estimate_value);
    
            if (id) {
                url = `${BASE_URL}/item/${id}`;
                method = 'PATCH'
            } else {
                url = `${BASE_URL}/item/upload`;
                method = "POST";
            }
            fetch(url, {
                method: method,
                credentials: "include",
                body: formData, // <--- send FormData directly
                // DO NOT set Content-Type, browser will handle multipart/form-data
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('error happened')
                    }
                })
                .then(data => {
                    setIsSending(false);
                    navigate('/home');
                })
                .catch(err => console.error(err)
                );
        } else if(condition > 10){
            toast(<Toaster text='item condition should'/>, {autoClose: 5000, toastId: 'no-dupe3'});
        } else if(!mainImg){
            toast(<Toaster text='no img'/>, {autoClose: 5000, toastId: 'no-dupe4'})
        }
    };

    //select and preview img (main img)
    const handleMainImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['png', 'jpg', 'jpeg'].includes(file.name.toLowerCase().split('.').pop())) {
                toast(<Toaster text="invalid file type" />, { autoClose: 5000, toastId: 'no-dupe' });
            } else {
                setMainImg({ file, preview: URL.createObjectURL(file), isMain: true });

                setImages(prev => prev.filter(img => !img.isMain));
                setImages(prev => [...prev, { file, preview: URL.createObjectURL(file), isMain: true }]);
                e.target.value = null;
            }
        }
    }

    //select and preview imgs (all imgs including main one)
    const handleImgChange = (e) => {
        const files = Array.from(e.target.files);

        //limit image selection
        if (images.length + files.length > 4) {
            toast(<Toaster text='can only upload' />, { autoClose: 5000, toastId: 'no-dupe' })
            return;
        }

        if(files.find(file => !['png', 'jpg', 'jpeg'].includes(file.name.toLowerCase().split('.').pop()))){
            toast(<Toaster text='invalid file type'/>, {autoClose: 5000, toastId: 'no-dupe2'});
            e.target.value = null;
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]); // append new images

        e.target.value = null;
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
        }
    };

    return (
        <main className="upload">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />
            <h1>{t('item upload')}</h1>
            <div className="item-inputs">
                <div className="item-images">
                    <h3>{t('main image')}</h3>
                    <p className='main1' style={{ color: 'var(--primary)' }}>{t('1 main')}</p>
                    {/* main image will display here */}
                    {mainImg &&
                        <div className='main1-img' style={{ position: 'relative', width: '150px' }}>
                            <img src={mainImg.preview} alt="" />
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
                    <label htmlFor="choose-main" className='choose-file' style={{ cursor: 'pointer' }}>{t('choose file')}</label>
                    <input type='file' id="choose-main" accept=".png, .jpg, .jpeg" onChange={handleMainImgChange}></input>
                    <h3>{t('images')}</h3>
                    <div className="images">
                        <p className='images4' style={{ color: 'var(--primary)', position: 'absolute' }}>{t('4 images')}</p>
                        {/* other images will display here */}
                        {images.map((src, i) =>
                            <div style={{ position: 'relative', marginTop: '20px' }}>
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
                    <label htmlFor="choose-images" className='choose-file' style={{ cursor: 'pointer', marginTop: '40px' }}>{t('choose file')}</label>
                    <input type='file' id="choose-images" multiple accept=".png, .jpg, .jpeg" onChange={handleImgChange}></input>
                </div>
                <div className="item-infos">
                    <h3>{t('detail')}</h3>
                    <DetailInput type="text" data='name' placeholder={t('main')} setter={setName} getter={name} />
                    <Dropdown getter={category} setter={setCategory} categoryList={categoryList}></Dropdown>
                    <AreaInput data="description" label={t('description')} setter={setDescription} getter={description} />
                    <DetailInput type="text" data='brand' placeholder={t('brand')} setter={setBrand} getter={brand} />
                    <DetailInput type="number" data='price' placeholder={t('original price')} setter={setOgPrice} getter={ogPrice} p="$" />
                    <DetailInput type="date" data='boughtOn' placeholder={t('bought on')} setter={setBoughtOn} getter={boughtOn} />
                    <DetailInput type="number" data='condition' placeholder={t('condition')} setter={setCondition} getter={condition} p="/ 10" />
                    <AreaInput data="looking" label={t('looking for')} setter={setLooking} getter={looking} color1='var(--primary)' color2='var(--secondary)' />
                    <span style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
                        <button id='submit-btn' onClick={handleUploadClick} 
                        style={{justifySelf: 'center', width: id ? '200px' : '300px', backgroundColor: isSending ? 'rgba(0,0,0,0.2)' : 'var(--secondary)', 
                        cursor: isSending ? 'disabled' : 'pointer', pointerEvents: isSending ? 'none' : 'auto'}}>
                            {id ? 
                                isSending ? t('updating') : t('update') : 
                                isSending ? t('uploading') : t('upload')}</button>
                        {id && <button style={{border: 'none', borderRadius: '10px', padding: '10px', width: '200px', cursor: isSending ? 'disabled' : 'pointer', pointerEvents: isSending ? 'none' : 'auto'}} onClick={() => navigate(-1)}>{t('cancel')}</button>}
                    </span>
                </div>
            </div>
        </main>
    );
}