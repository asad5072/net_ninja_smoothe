import { useParams, useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const {id}= useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')

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
      
    </div>
  )
}

export default Update