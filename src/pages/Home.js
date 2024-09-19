import Smothe from "../components/Smothe";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <div className="grid">
          {smoothies.map(smoothie => (
            <Smothe smoothie={smoothie} key={smoothie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
