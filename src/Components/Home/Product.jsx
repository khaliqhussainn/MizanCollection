import React, { useState } from "react";
import {
  IoIosHeart,
  IoIosHeartEmpty,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import "./home.css";

const Product = ({
  images,
  price,
  brand,
  description,
  clothType,
  sizes,
  sizeChart,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  isInWishlist,
  onImageClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    onAddToCart({
      images,
      price,
      brand,
      description,
      clothType,
      sizes,
      sizeChart,
    });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  return (
    <div className="product-container">
      <div className="product-image-slider">
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt={`Product ${currentImageIndex}`}
          />
          <div className="icon-overlay">
            <IoIosInformationCircleOutline
              size={30}
              color="white"
              onClick={onImageClick}
            />
            <div
              onClick={() =>
                onAddToWishlist({
                  images,
                  price,
                  brand,
                  description,
                  clothType,
                  sizes,
                  sizeChart,
                })
              }
            >
              {isInWishlist ? (
                <IoIosHeart size={30} color="red" />
              ) : (
                <IoIosHeartEmpty size={30} color="white" />
              )}
            </div>
          </div>
          {images.length > 1 && (
            <div className="dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="product-details">
        <p>Price: ₹{price}</p>
        <p>Brand: {brand}</p>
        <div className="button-product-container">
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Added to Cart</h3>
            <p>{brand} - {description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
