import { useState } from 'react';
import { empty_star, filled_star } from '../../assets/assets.css';
import { star, starContainer } from './starrating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    if (rating === index) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  return (
    <div className={starContainer}>
      {[1, 2, 3, 4, 5].map(index => (
        <img
          key={index}
          src={index <= rating ? filled_star : empty_star}
          className={star}
          onClick={() => handleClick(index)}
          alt={`${index} star`}
        />
      ))}
    </div>
  );
};

export default StarRating;
