import placeholder from '../assets/placeholder.jpg'

export default function CategoryCard(){
    return(
        <div className="category" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={placeholder} alt="" style={{width: '240px', height: '240px', borderRadius: '50%', objectFit: 'cover'}}/>
            <p style={{fontWeight: 600, fontSize: '18px'}}>Books</p>
        </div>
    );
}