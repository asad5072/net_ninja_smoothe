import { useState } from "react"
import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e)=>{
    console.log(e, 'asad')
    e.preventDefault();
    if(!title || !method || !rating){
      setFormError('Please fill up all the fields correctly')
      return
    }
    // console.log(title, method, rating)
    const {data, error} = await supabase
      .from('recipes')
      .insert([{title, method, rating}])
      .select()
    
    if(error){
      console.log(error)
      setFormError('Please fill up all the fields correctly')
    }
    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input 
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method: </label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input 
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {formError && <p className="">{formError}</p>}
    </div>
  )
}

export default Create