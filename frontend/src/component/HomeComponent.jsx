import { Link } from "react-router";
import ProductCard from "../component/ProductCard";

export default function HomeComponent(props) {

    //products props to send here
    const products = [
        { id: 1, pname: 'Steel Water Bottle', condition: '6', lookfor: 'Books . Pen . Education' },
        { id: 2, pname: 'Sum Old PC', condition: '8', lookfor: 'Books . Foods . Soap' },
        { id: 3, pname: 'Steel Water Bottle', condition: '6', lookfor: 'Books . Pen . Education' },
        { id: 4, pname: 'Steel Water Bottle', condition: '6', lookfor: 'Books . Pen . Education' },
        { id: 5, pname: 'Steel Water Bottle', condition: '6', lookfor: 'Books . Pen . Education' },
    ]

    return (
        <section>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '32px', margin: '10px 0' }}>{props.sectionName}</h1>
            <section className="products">
                {products.map((v, _) => {
                    return (
                        <Link to={`/product/${v.id}`} style={{color: 'var(--text-secondary)'}} key={v.id}>
                            <ProductCard pname={v.pname} condition={v.condition} lookfor={v.lookfor} />
                        </Link>
                    );
                })}
            </section>
            <p style={{ textAlign: 'center', margin: '50px 0px' }}>See more</p>
        </section>
    );
}