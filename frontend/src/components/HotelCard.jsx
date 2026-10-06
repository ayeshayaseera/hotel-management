import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, onEdit, onDelete }) {
  const navigate = useNavigate();

  // Image click → Hotel Details page
  const handleImageClick = () => {
    navigate("/hotel-details", {
      state: {
        hotel: hotel
      }
    });
  };

  return (
    <div className="hotel-card">

     
      <img
        src={hotel.image}
        alt={hotel.title}
        className="hotel-image"
        onClick={handleImageClick}
      />

     
      <div className="hotel-content">

        <h2>{hotel.title}</h2>

        <p>{hotel.description}</p>

        <h3>₹{hotel.price}</h3>

      
        <div className="hotel-buttons">

        
          <button
            type="button"
            onClick={() => onEdit(hotel)}
          >
            Edit
          </button>

         
          <button
            type="button"
            onClick={() => onDelete(hotel.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default HotelCard;