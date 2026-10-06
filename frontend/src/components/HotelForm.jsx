import { useEffect, useState } from "react";
function HotelForm({ selectedHotel, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: ""
  });

  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedHotel) {
      setFormData({
        title: selectedHotel.title,
        description: selectedHotel.description,
        latitude: selectedHotel.latitude,
        longitude: selectedHotel.longitude,
        price: selectedHotel.price
      });

      setImage(selectedHotel.image);
    } else {
      setFormData({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        price: ""
      });

      setImage("");
    }

    setErrors({});
  }, [selectedHotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required";
    }

    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!image) {
      newErrors.image = "Hotel image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const hotelData = {
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      price: Number(formData.price),
      image: image
    };

    onSave(hotelData);
  };

  return (
    <div className="form-container">

      <h2>
        {selectedHotel ? "Edit Hotel" : "Add New Hotel"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Hotel Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {errors.image && (
            <p className="error">{errors.image}</p>
          )}

          {image && (
            <img
              src={image}
              alt="Hotel preview"
              className="image-preview"
            />
          )}

        </div>

        <div className="form-group">

          <label>Hotel Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter hotel name"
          />

          {errors.title && (
            <p className="error">{errors.title}</p>
          )}

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter hotel description"
            rows="5"
          />

          {errors.description && (
            <p className="error">{errors.description}</p>
          )}

        </div>

        <div className="form-group">

          <label>Latitude</label>

          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Example: 13.0827"
          />

          {errors.latitude && (
            <p className="error">{errors.latitude}</p>
          )}

        </div>

        <div className="form-group">

          <label>Longitude</label>

          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Example: 80.2707"
          />

          {errors.longitude && (
            <p className="error">{errors.longitude}</p>
          )}

        </div>

        <div className="form-group">

          <label>Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter hotel price"
            min="1"
          />

          {errors.price && (
            <p className="error">{errors.price}</p>
          )}

        </div>

        <div className="form-buttons">

          <button type="submit">
            {selectedHotel ? "Update Hotel" : "Add Hotel"}
          </button>

          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default HotelForm;
