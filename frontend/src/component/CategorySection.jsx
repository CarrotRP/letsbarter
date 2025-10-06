import { useTranslation } from "react-i18next";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router";

export default function CategorySection(props){
    const { categoryList } = props;
    const {t} = useTranslation();

    return(
        <section>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '32px', margin: '10px 0' }}>{t('browse category')}</h1>
            <section className="categories">
                {categoryList.map(v => {
                    return (
                        <Link to={`/item?category=${v._id}`} state={v.name} style={{color: 'var(--text-secondary)'}} key={v._id}>
                            <CategoryCard name={t(v.name)} img={v.img}/>
                        </Link>
                    );
                })}
            </section>
        </section>
    );
}