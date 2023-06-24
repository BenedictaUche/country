import { Button, Card, Container } from "react-bootstrap";
import Navbars from "../components/Navbars";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/name/${name}`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const countryData = await response.json();
        setCountry(countryData[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbars />
      <Container>
        <div className="mt-[7rem]">
          <Link to="/home">
            <Button>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </Button>
          </Link>

          <div className="mt-10">
            <Card className="p-4">
              <h2 className="font-bold text-2xl mb-3">{country.name}</h2>
              <p className="font-semibold">Region: {country.region}</p>
              <p className="font-semibold">Area: {country.area}</p>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
