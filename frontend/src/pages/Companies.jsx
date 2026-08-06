import { useEffect, useState } from "react";
import { CompanyAPI } from "../services/api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await CompanyAPI.getAll();
        setCompanies(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCompanies();
  }, []);

  return (
    <div>
      <h1>Companies</h1>

      {companies.map((company) => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
}