import { export_icon, thumbs_down } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import useUserStore from "../../../stores/useUserStore";
import { TBrand } from "../../../types/brand";
import { fetchShareId } from '../../../utils/sharedChatHistoryUtils';
import BrandRecommendationCard from "../brand-recommendation-card/BrandRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "./brandRecommendation.css";
type BrandRecommendationProps = {
  brands: TBrand[] | null;
  shareId: string;
  onBrandClick?: (brand: string) => void;
}

const BrandRecommendation = ({ brands, shareId, onBrandClick }: BrandRecommendationProps) => {
  if (!brands || brands.length === 0) {
    return null; // brands가 없을 때는 아무것도 렌더링하지 않음
  }
  // const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);
  const { setIsShareModalOpen, setShareModalId } = useModalStore()
  const { user } = useUserStore()
  const handleBrandClick = (brand: string) => {
    if (onBrandClick) {
      onBrandClick(brand); // onBrandClick이 있을 경우에만 호출
    }
  }

  const handleOpenShareModal = async () => {
    if (shareId) {
      if (user?.uid) { // user.uid가 null이 아닐 경우만 실행
        const fetchedShareId = await fetchShareId(user.uid, shareId);

        if (fetchedShareId) {
          setShareModalId(fetchedShareId);
          setIsShareModalOpen(true);
        } else {
          console.log("공유 ID를 찾을 수 없습니다.");
        }
      } else {
        console.log("사용자 ID가 제공되지 않았습니다."); // 사용자 ID가 없을 때 처리
      }
    } else {
      console.log("공유 ID가 제공되지 않았습니다.");
    }
  };



  const isSharePage = location.pathname.startsWith("/share/");
  return (

    <div className={brandRecommendWrap}>
      <ul className={brandRecommendContainer}>
        {brands.map((item, index) => (
          <li key={index} onClick={() => handleBrandClick(item.brand)}><BrandRecommendationCard {...item} /></li>
        ))}
      </ul>
      {!isSharePage && (
        <div className={brandRecommendIconWrap}>
          <img src={export_icon} alt="" className={brandRecommendIcon} onClick={handleOpenShareModal} />
          <img src={thumbs_down} alt="" className={brandRecommendIcon} />
        </div>
      )}

    </div>
  );
}
export default BrandRecommendation