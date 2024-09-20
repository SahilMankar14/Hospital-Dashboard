import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient"; // Adjust the import path as needed

const useCompanyData = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session && session.user) {
          console.log("session:", session);
          const email = session.user.email;
          setUserEmail(email);
          const response = await axios.get(
            `https://main-server-bold-haze-6438.fly.dev/visualization/get_company_id/${email}`
          );
          setCompanies(response.data);
        } else {
          setError("User session is not valid. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Failed to fetch company data");
      }
    };

    fetchCompanies();
  }, []);

  return { companies, userEmail, error };
};

export default useCompanyData;
