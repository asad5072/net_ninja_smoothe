import { useParams, useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const {id}= useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState('')

  const handleUpdate = async (e)=>{
    e.preventDefault();
    if(!title || !method || !rating){
      setFormError('Please fill up all the fields.')
      return
    }
    const {data, error} = await supabase
      .from('recipes')
      .update({title, method, rating})
      .eq('id', id)
      .select()
    
      if(error){
        setFormError('Please fill up all form correctly!')
      }
      if(data){
        setFormError(null)
        navigate('/')
      }

  }


  useEffect(() =>{
    const fetchSmoothies = async()=>{
      const {data, error} = await supabase
        .from('recipes')
        .select()
        .eq('id', id)
        .single()

        if(error){
          navigate('/', {replace: true})
        }
        if(data){
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
          console.log(data, "data")
        }
    }
    fetchSmoothies()
  },[id, navigate])
  return (
    <div className="page update">
      <p>id: {id}</p>
      <form onSubmit={handleUpdate}>
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
        <button>Update</button>
      </form>
      {formError && <p>{formError}</p>}
    </div>
  )
}

export default Update