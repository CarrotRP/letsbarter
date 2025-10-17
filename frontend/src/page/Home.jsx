import { useEffect, useState } from "react";
import CategorySection from "../component/CategorySection";
import HomeComponent from "../component/HomeComponent";
import './Home.css';
import Ads from "../component/Ads";
import { BASE_URL } from "../config/apiConfig";

export default function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [items, setItems] = useState([]);
    const [goodItems, setGoodItems] = useState([]);
    //latest items
    const [limit, setLimit] = useState(5);
    const [itemCount, setItemCount] = useState();
    //good shape item
    const [goodLimit, setGoodLimit] = useState(5);
    const [goodCount, setGoodCount] = useState();
    const [localAds, setLocalAds] = useState(true); //local business ads

    const fetchItem = () => {
        //fetch categories
        fetch(`${BASE_URL}/category`)
            .then(res => res.json())
            .then(data => setCategoryList(data));

        //fetch items
        fetch(`${BASE_URL}/item?limit=${limit}&sortOpt=true`)
            .then(res => res.json())
            .then(data => {
                console.log(data.items);
                setItems(data.items);
                setItemCount(data.count);
            });

        //fetch items still good in condition
        fetch(`${BASE_URL}/item?limit=${goodLimit}&condition=good`)
            .then(res => res.json())
            .then(data => {
                setGoodItems(data.items);
                setGoodCount(data.count);
            })
    }

    useEffect(() => {
        //fetch item, also load more for 'see more'
        fetchItem();
    }, [limit]);

    return (
        <main className="homepage">
            {localAds &&
                <div className="ads" style={{ position: 'relative', marginBottom: '160px' }}>
                    <Ads atTop={true} />
                </div>
            }
            <CategorySection categoryList={categoryList} />
            <HomeComponent sectionName="latest" items={items} limit={limit} setLimit={setLimit} itemCount={itemCount} />
            <HomeComponent sectionName="item good" items={goodItems} limit={goodLimit} setLimit={setGoodLimit} itemCount={goodCount} />
        </main>
    );
}