import { useState, useEffect } from "react";
import { Card, Container, Dropdown, DropdownButton } from "react-bootstrap";

export default function Maps() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Filter data based on search term and selected region
      const filteredData = data.filter((country) => {
        const nameMatch = country.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const regionMatch =
          !selectedRegion || country.region === selectedRegion;
        return nameMatch && regionMatch;
      });
      setSearchResults(filteredData);
    }
  }, [data, searchTerm, selectedRegion]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container>
      <div className="flex justify-between mt-[10%]">
        <div className="buttons">
          <input
            type="text"
            placeholder="Search for a country"
            className="form-control bg-gray-800"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div>
          <DropdownButton
            id="dropdown-basic-button"
            className="bg-gray-900 border-none rounded-lg border-gray-900 sm:w-auto max-w-full"
            title="Filter by Region"
          >
            <Dropdown.Item
              href="#/action-1"
              className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
              onClick={() => handleRegionChange("Africa")}
            >
              Africa
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-2"
              className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
              onClick={() => handleRegionChange("Americas")}
            >
              Americas
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
              onClick={() => handleRegionChange("Asia")}
            >
              Asia
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-4"
              className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
              onClick={() => handleRegionChange("Europe")}
            >
              Europe
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-5"
              className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
              onClick={() => handleRegionChange("Oceania")}
            >
              Oceania
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      <div>
        {searchResults.map((country) => (
          
          <Card>
            <div key={country.name}>
              <h2>{country.name}</h2>
              <p>Region: {country.region}</p>
              <p>Area: {country.area}</p>
            </div>
          </Card>
          
        ))}
      </div>
      </Container>
    </>
  );
}
