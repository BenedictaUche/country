import { useState, useEffect, useMemo } from "react";
import { Card, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Maps() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const history = useParams();

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
      // To filter data based on search value and region
      const filteredData = data.filter((country) => {
        const nameMatch = country.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const regionMatch =
          !selectedRegion ||
          selectedRegion === "All Countries" ||
          country.region === selectedRegion;
        return nameMatch && regionMatch;
      });

      //To sort data based on selected option
      const sortedData = filteredData.sort((x, y) => {
        const nameOne = x.name.toLowerCase();
        const nameTwo = y.name.toLowerCase();
        if (sortBy === "name-asc") {
          return nameOne.localeCompare(nameTwo);
        } else if (sortBy === "name-desc") {
          return nameTwo.localeCompare(nameOne);
        }
        return 0;
      });
      setSearchResults(sortedData);
    }
  }, [data, searchTerm, selectedRegion, sortBy]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region === "All Countries" ? null : region);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (loading) {
    return (
      <div className="font-bold text-4xl text-center mt-10">Loading...</div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination calculations
  const offset = currentPage * itemsPerPage;
  const currentItems = searchResults.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <>
      <Container>
        <div className="flex justify-between mt-[10rem] sm:flex-row flex-col mb-10">
          <div className="buttons">
            <input
              type="text"
              placeholder="Search for a country"
              className="form-control bg-white-800 sm:mb-0 mb-5"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>

          <div>
            <DropdownButton
              id="dropdown-sort"
              className="bg-gray-900 border-none rounded-lg border-gray-900 sm:w-auto max-w-full sm:mb-0 mb-5"
              title="Sort by"
            >
              <Dropdown.Item
                href="#/name-asc"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleSortChange("name-asc")}
              >
                Name (Ascending)
              </Dropdown.Item>
              <Dropdown.Item
                href="#/name-desc"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleSortChange("name-desc")}
              >
                Name (Descending)
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <div>
            <DropdownButton
              id="dropdown-basic-button"
              className="bg-gray-900 border-none rounded-lg border-gray-900 sm:w-auto max-w-full"
              title="Filter by Region"
            >
              <Dropdown.Item
                href="#/All Countries"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("All Countries")}
              >
                All Countries
              </Dropdown.Item>
              <Dropdown.Item
                href="#/African Countries"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("Africa")}
              >
                Africa
              </Dropdown.Item>
              <Dropdown.Item
                href="#/Americas"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("Americas")}
              >
                Americas
              </Dropdown.Item>
              <Dropdown.Item
                href="#/Asian Countries"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("Asia")}
              >
                Asia
              </Dropdown.Item>
              <Dropdown.Item
                href="#/European Countries"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("Europe")}
              >
                Europe
              </Dropdown.Item>
              <Dropdown.Item
                href="#/Oceania Countries"
                className="bg-gray-800 border-none text-white sm:w-auto max-w-full"
                onClick={() => handleRegionChange("Oceania")}
              >
                Oceania
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div>
          {(currentItems.length > 0 ? currentItems : searchResults).map(
            (country) => (
              <Link
                to={`/country/${country.name}`}
                onClick={() => history.push(`/country/${country.name}`)}
              >
                <Card className="mb-8 p-4">
                  <div key={country.name}>
                    <h2 className="font-bold text-2xl mb-3">{country.name}</h2>
                    <p className="font-semibold">Region: {country.region}</p>
                    <p className="font-semibold">Area: {country.area}</p>
                  </div>
                </Card>
              </Link>
            )
          )}
        </div>

        <ReactPaginate
          previousLabel="<  Previous"
          nextLabel="  Next >"
          breakLabel={"..."}
          breakClassName={"break-me"}
          // The total number of pages
          pageCount={totalPages} 
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          className="text-center flex justify-center font-bold text-xl text-white"
        />
      </Container>
    </>
  );
}
