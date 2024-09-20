import { useNavigate } from "react-router-dom";
import { prefitt_logo2 } from "../../assets/assets";
import { notFoundText, notFoundTextDescription, notFoundTextErrorCode, notFoundWrap, notFountButton, notFountImage } from "./notFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    // <div className={responsiveBox}>
    <div className={notFoundWrap}>
      <img src={prefitt_logo2} className={notFountImage} />
      <p className={notFoundTextErrorCode}>404</p>
      <p className={notFoundText}>Page not found</p>
      <p className={notFoundTextDescription}>죄송합니다. 원하시는 페이지를 찾을 수 없습니다.</p>
      <button className={notFountButton} onClick={handleGoBack}>돌아가기</button>

    </div>
    // </div>
  );
}
export default NotFound