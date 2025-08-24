import CategorySection from "../component/CategorySection";
import HomeComponent from "../component/HomeComponent";
import './Home.css';

export default function Home() {
    return (
        <main className="homepage">
            <HomeComponent sectionName="Latest Items"/>
            <HomeComponent sectionName="Urgent Offer"/>
            <CategorySection/>
        </main>
    );
}