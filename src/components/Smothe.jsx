const Smothe = ({smoothie})=>{
    const {title, method, rating} = smoothie
    return(
        <div>
            <p>Title: {title}</p>
            <p>Title: {method}</p>
            <p>Rating:{rating}</p>
        </div>
    )
}
export default Smothe;