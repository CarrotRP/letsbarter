import { useEffect, useState } from "react";
import CategorySection from "../component/CategorySection";
import HomeComponent from "../component/HomeComponent";
import './Home.css';

export default function Home() {
    const [items, setItems] = useState();
    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        //fetch items
        fetch('http://localhost:3000/item/')
        .then(res => res.json())
        .then(data => {
            setItems(data)});
        
        //fetch categories
        fetch('http://localhost:3000/category')
        .then(res => res.json())
        .then(data => setCategoryList(data));
    }, []);

    return (
        <main className="homepage">
            <CategorySection categoryList={categoryList}/>
            <HomeComponent sectionName="Latest Items" items={items} setter={setItems}/>
            <HomeComponent sectionName="Urgent Offer"/>
        </main>
    );
}