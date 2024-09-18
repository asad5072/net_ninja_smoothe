import { Link } from "react-router-dom"

const Smothe = ({smoothie})=>{
    const {title, method, rating} = smoothie
    return(
        <div>
            <p>Title: {title}</p>
            <p>Title: {method}</p>
            <p>Rating:{rating}</p>
            <div>
                <Link to={'/' + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
            </div>
        </div>
    )
}
export default Smothe;