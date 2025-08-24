import CategoryCard from "./CategoryCard";
import { Link } from "react-router";

export default function CategorySection(){

    return(
        <section>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '32px', margin: '10px 0' }}>Browse by Category</h1>
            <section className="categories">
                {[...new Array(4)].map(v => {
                    return (
                        <Link to="#" style={{color: 'var(--text-secondary)'}}>
                            <CategoryCard/>
                        </Link>
                    );
                })}
            </section>
        </section>
    );
}