import React from 'react';
import { empty_star, filled_star } from '../../../assets/assets';
import { useShoesRegistryStore } from '../../../stores/useRegistryStore';
import { star, starContainer } from './starrating.css';
import { ChangeHandler } from 'react-hook-form';

type StarRatingProps = {
  onChange: ChangeHandler;
};

const StarRating = ({ onChange }: StarRatingProps) => {
  const { rating, setRating } = useShoesRegistryStore();

  const handleClick = (index: number) => {
    if (rating === index) {
      setRating(0);
      onChange({ target: { value: 0 } }); // 별점이 0으로 변경될 때 onChange 호출
    } else {
      setRating(index);
      onChange({ target: { value: index } }); // onChange 핸들러 호출
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

export default React.memo(StarRating);
