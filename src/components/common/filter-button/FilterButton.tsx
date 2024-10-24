import { ComponentPropsWithoutRef } from "react";
import { filterButton, filterButtonActive } from "./filterButton.css";

type TButtonProps = ComponentPropsWithoutRef<'button'> & {
  title: string;
  isActive?: boolean;
};

const FilterButton = (props: TButtonProps) => {
  /** className, onClick, disabled 등 모든 버튼 속성들어가있고 title은 따로 뺐습니다 */
  const { title, isActive, className, ...rest } = props;

  const buttonClassName = `${filterButton} ${isActive ? filterButtonActive : ''} ${className || ''}`.trim();

  return (

    <button className={buttonClassName} {...rest}>
      {title}
    </button>

  );
}
export default FilterButton