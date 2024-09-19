import Smothe from "../components/Smothe";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderby] = useState('created_at')

  const handleDelete = (id)=>{
    setSmoothies(previousItems =>{
      return previousItems.filter(item => item.id !==id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select();

      if (error) {
        console.error('Error fetching data:', error);
        setFetchError(`Could not fetch the smoothies: ${error.message}`);
        setSmoothies(null);
      } else if (data.length === 0) {
        setFetchError('No data found');
        setSmoothies(null);
      } else {
        setSmoothies(data);
        setFetchError(null);
      }
      setLoading(false);
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="">
      {loading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div>
          <div className="grid">
            {smoothies.map(smoothie => (
              <Smothe smoothie={smoothie} 
                key={smoothie.id}
                onDelete= {handleDelete}
              />
            ))}
          </div>

        </div>        
      )}
    </div>
  );
};

export default Home;
