import { useState } from "react";
import { close } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import FilterButton from "../../common/filter-button/FilterButton";
import ProductFilter from "../product-filter/ProductFilter";
import { brandPlpBrandImage, brandPlpFilterButtonWrap, brandPlpNameContainer, brandPlpWrap } from "./brandPLP.css";


const filterCategories = ['ALL', 'WOMEN', 'MEN', 'KIDS'];
const BrandPLP = () => {
  const { setIsOpen } = useModalStore();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={brandPlpWrap}>
        <div className={brandPlpNameContainer}>
          <h1 style={{ fontWeight: 600 }}>Crocs</h1>
          <img src={close} alt="" style={{ cursor: 'pointer' }} onClick={handleCloseClick} />
        </div>
        <section className={brandPlpBrandImage}>
          <img />
        </section>
        <div className={brandPlpFilterButtonWrap}>
          {filterCategories.map(category => (
            <FilterButton
              key={category}
              title={category}
              isActive={activeFilter === category}
              onClick={() => handleFilterButtonClick(category)}
            />
          ))}
        </div>
        <ProductFilter />
      </div>
    </>
  );
};
export default BrandPLP;
