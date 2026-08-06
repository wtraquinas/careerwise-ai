import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import CompanyTable from "./CompanyTable";
import { CompanyAPI } from "../../shared/services/api";

export default function Companies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const response = await CompanyAPI.getAll();
        setCompanies(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();

  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Companies
      </Typography>

      <CompanyTable companies={companies} />
    </>
  );
}