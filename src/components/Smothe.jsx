import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"



const Smothe = ({smoothie, onDelete})=>{
    const handleDelete = async()=>{
        const {data, error} = await supabase
        .from('recipes')
        .delete()
        .eq('id', smoothie.id)
        .select()
        
        if(error){
            console.log(error);        
        }
        if(data){
            console.log(data)
            onDelete(smoothie.id)
        }
    }


    const {title, method, rating} = smoothie
    return(
        <div className="border">
            <p>Title: {title}</p>
            <p>Title: {method}</p>
            <p>Rating:{rating}</p>
            <div>
                <Link to={'/' + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}
export default Smothe;