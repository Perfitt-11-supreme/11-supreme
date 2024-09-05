import { ChangeEvent, useState } from "react";
import useModalStore from "../../../stores/useModalStore";
import Button from "../../common/button/Button";
import FilterButton from "../../common/filter-button/FilterButton";
import { filterDetailButtonContainer, filterDetailCategoryTitle, filterDetailContainer, priceFilterContainer, priceFilterPriceDisplay, priceLabel, rangeContainer, rangeInput } from "./productFilterDetail.css";


const filterCategories = ['ALL', 'WOMEN', 'MEN', 'KIDS'];

const ProductFilterDetail = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const { setFilterOpen } = useModalStore();

  const handleCloseClick = () => {
    setFilterOpen(false);
  };

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
  };

  return (
    <div className={filterDetailContainer}>
      <p className={filterDetailCategoryTitle
      }>성별</p>
      <div className={filterDetailButtonContainer}>
        {filterCategories.map((category) => (
          <FilterButton
            key={category}
            title={category}
            isActive={activeFilter === category}
            onClick={() => handleFilterButtonClick(category)}
          />
        ))}
      </div>
      <div className={priceFilterContainer}>
        <label htmlFor="price-range" className={priceLabel}>가격</label>
        <div className={rangeContainer}>
          <input
            type="range"
            id="min-price"
            min={10000}
            max={1000000}
            step={1000}
            value={minPrice}
            onChange={handleMinPriceChange}
            className={rangeInput}
          />
          <input
            type="range"
            id="max-price"
            min={10000}
            max={1000000}
            step={1000}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={rangeInput}
          />
        </div>
        <span className={priceFilterPriceDisplay}>
          {minPrice.toLocaleString()}원 ~ {maxPrice.toLocaleString()}원
        </span>
      </div>
      <Button text="125개의 상품보기" onClick={handleCloseClick} />
    </div>
  );
}

export default ProductFilterDetail;