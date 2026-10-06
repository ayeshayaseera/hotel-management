import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function HotelDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <div className="hotel-details-page">

        <Helmet>
          <title>Hotel Details | Hotel Management</title>

          <meta
            name="description"
            content="View hotel details, location, price and map information."
          />
        </Helmet>

        <h2>Hotel details not found</h2>

        <button onClick={() => navigate("/")}>
          Back to Hotels
        </button>

      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&output=embed`;

  return (
    <div className="hotel-details-page">
      <Helmet>
        <title>{hotel.title} | Hotel Details</title>

        <meta
          name="description"
          content={`View details, price and location of ${hotel.title}.`}
        />
      </Helmet>

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Hotels
      </button>


      <div className="hotel-details-card">

        <img
          src={hotel.image}
          alt={hotel.title}
          className="details-image"
        />

        <div className="details-content">

          <h1>{hotel.title}</h1>

          <p>{hotel.description}</p>

          <h2>₹{hotel.price}</h2>

          {/* LOCATION DETAILS */}

          <div className="location-info">

            <h2>Hotel Location</h2>

            <p>
              <strong>Latitude:</strong>{" "}
              {hotel.latitude}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {hotel.longitude}
            </p>

          </div>

          <div className="map-container">

            <iframe
              title={`${hotel.title} location map`}
              src={mapUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HotelDetails;