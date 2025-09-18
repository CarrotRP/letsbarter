import { useEffect, useState } from "react";
import CategorySection from "../component/CategorySection";
import HomeComponent from "../component/HomeComponent";
import './Home.css';

export default function Home() {
    const [items, setItems] = useState();
    
    useEffect(() => {
        fetch('http://localhost:3000/item/')
        .then(res => res.json())
        .then(data => {
            setItems(data)
            console.log(data)});
    }, []);

    return (
        <main className="homepage">
            <HomeComponent sectionName="Latest Items" items={items} setter={setItems}/>
            <HomeComponent sectionName="Urgent Offer"/>
            <CategorySection/>
        </main>
    );
}