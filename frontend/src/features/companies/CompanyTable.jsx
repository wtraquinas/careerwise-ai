import { useEffect, useState } from "react";
import { CompanyAPI } from "../../shared/services/api";

export default function CompanyTable() {
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Industry</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.industry}</td>
            <td>{company.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}