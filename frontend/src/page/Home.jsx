import { useEffect, useState } from "react";
import CategorySection from "../component/CategorySection";
import HomeComponent from "../component/HomeComponent";
import './Home.css';

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

    const fetchItem = () => {
        //fetch categories
        fetch('http://localhost:3000/category')
        .then(res => res.json())
        .then(data => setCategoryList(data));
        
        //fetch items
        fetch(`http://localhost:3000/item?limit=${limit}&sortOpt=true`)
        .then(res => res.json())
        .then(data => {
            setItems(data.items);
            setItemCount(data.count);
        });
        
        //fetch items still good in condition
        fetch(`http://localhost:3000/item?limit=${goodLimit}&condition=good`)
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
            <CategorySection categoryList={categoryList}/>
            <HomeComponent sectionName="Latest Items" items={items} limit={limit} setLimit={setLimit} itemCount={itemCount}/>
            <HomeComponent sectionName="Items in Good Shape" items={goodItems} limit={goodLimit} setLimit={setGoodLimit} itemCount={goodCount}/>
        </main>
    );
}