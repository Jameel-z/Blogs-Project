import { useState, useEffect } from "react";
import axios from "axios";

//create a function to use axios and get data
const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        setData(response.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useAxios;
