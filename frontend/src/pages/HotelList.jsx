import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import hotelsData from "../data/hotels";

import {
  setHotels,
  addHotel,
  updateHotel,
  deleteHotel
} from "../redux/hotelSlice";

import HotelCard from "../components/HotelCard";
import HotelForm from "../components/HotelForm";

function HotelList() {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);

  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [searchText, setSearchText] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

 
  const hotelsPerPage = 6;


  // useEffect(() => {
  //   const savedHotels = localStorage.getItem("hotels");

  //   if (!savedHotels) {
  //     dispatch(setHotels(hotelsData));
  //   }
  // }, [dispatch]);
  useEffect(() => {
  const savedHotels = localStorage.getItem("hotels");

  if (savedHotels) {
    dispatch(setHotels(JSON.parse(savedHotels)));
  } else {
    dispatch(setHotels(hotelsData));
  }
}, [dispatch]);

 
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };


  const handleAddHotel = () => {
    setSelectedHotel(null);
    setShowForm(true);
  };


  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(true);
  };

  const handleDelete = (hotelId) => {
    dispatch(deleteHotel(hotelId));

    showSuccessMessage("Hotel deleted successfully!");
  };

  
  const handleSave = (hotelData) => {
    if (selectedHotel) {
      dispatch(
        updateHotel({
          id: selectedHotel.id,
          ...hotelData
        })
      );

      showSuccessMessage("Hotel updated successfully!");
    } else {
      const newHotel = {
        id: Date.now(),
        ...hotelData
      };

      dispatch(addHotel(newHotel));

      showSuccessMessage("Hotel added successfully!");
    }

    setShowForm(false);
    setSelectedHotel(null);
  };

 
  const handleCancel = () => {
    setShowForm(false);
    setSelectedHotel(null);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesMinPrice =
      minPrice === "" ||
      hotel.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" ||
      hotel.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

 
  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const lastHotelIndex =
    currentPage * hotelsPerPage;

  const firstHotelIndex =
    lastHotelIndex - hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    firstHotelIndex,
    lastHotelIndex
  );

 
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };


  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    setCurrentPage(1);
  };


  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    setCurrentPage(1);
  };

  
  const handleClearFilters = () => {
    setSearchText("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

 
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="hotel-list-page">

      {/* SEO */}
      <Helmet>
        <title>Hotel Management | Hotel List</title>

        <meta
          name="description"
          content="Browse, search, filter and manage hotels with our responsive hotel management application."
        />
      </Helmet>

      <h1>Hotel Management</h1>

      {/* SEARCH + FILTER */}
      {!showForm && (
        <>
          <div className="search-container">

            <input
              type="text"
              placeholder="🔍 Search hotel by title..."
              value={searchText}
              onChange={handleSearch}
            />

          </div>

          <div className="price-filter">

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
              min="0"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              min="0"
            />

            <button
              type="button"
              onClick={handleClearFilters}
            >
              Clear
            </button>

          </div>

          <button
            className="add-hotel-button"
            onClick={handleAddHotel}
          >
            + Add Hotel
          </button>
        </>
      )}

     
      {showForm && (
        <HotelForm
          selectedHotel={selectedHotel}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      
      {!showForm && (
        <div>

          <h2 className="list-heading">
            Available Hotels
          </h2>

          <div className="hotel-grid">

            {currentHotels.length > 0 ? (

              currentHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))

            ) : (

              <p className="no-results">
                No hotels found.
              </p>

            )}

          </div>

         
          {totalPages > 1 && (

            <div className="pagination">

              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handlePageChange(index + 1)
                    }
                    className={
                      currentPage === index + 1
                        ? "active-page"
                        : ""
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>

            </div>

          )}

        </div>
      )}

    
      {showSuccess && (
        <div className="success-popup">
          <span>✓</span>
          {successMessage}
        </div>
      )}

    </div>
  );
}

export default HotelList;