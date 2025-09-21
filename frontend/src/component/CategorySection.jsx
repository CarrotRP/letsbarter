import CategoryCard from "./CategoryCard";
import { Link } from "react-router";

export default function CategorySection(props){
    const { categoryList } = props;

    return(
        <section>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '32px', margin: '10px 0' }}>Browse by Category</h1>
            <section className="categories">
                {categoryList.map(v => {
                    return (
                        <Link to={`/item?category=${v._id}`} state={v.name} style={{color: 'var(--text-secondary)'}}>
                            <CategoryCard name={v.name}/>
                        </Link>
                    );
                })}
            </section>
        </section>
    );
}