import placeholder from '../assets/placeholder.jpg'

export default function CategoryCard(props){
    const {name, img} = props;

    return(
        <div className="category" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={img} alt="" style={{width: '240px', height: '240px', border: '1px solid var(--darken-background)',borderRadius: '50%', objectFit: 'contain'}}/>
            <p style={{fontWeight: 600, fontSize: '18px', textTransform: 'capitalize'}}>{name}</p>
        </div>
    );
}