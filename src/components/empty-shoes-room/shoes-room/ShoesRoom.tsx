// import { useNavigate } from 'react-router-dom';
// import { plus } from '../../../assets/assets';
// import { shoes1, shoes2, shoes3, shoes4, shoes5, shoes6, shoes7, shoes8 } from '../../../assets/shoes/shoes';
// import Header from '../header/Header';
// import UserProfile from '../user-profile/UserProfile';

// const ShoesRoom = () => {
//   const navigate = useNavigate();

//   const handleShoesInfo = () => {
//     navigate('/shoesinfo');
//   };

//   const handleRegistry = () => {
//     navigate('/shoes-registry');
//   };
//   return (
//     <>
//       <div className={container}>
//         <Header title="신발장" />
//         <UserProfile />
//         <div className={optiondiv}>
//           <p className={countp}>총 8개</p>
//           <select className={select}>
//             <option>최신순</option>
//             <option>인기순</option>
//             <option>등록순</option>
//           </select>
//         </div>
//         <div className={shoesdiv}>
//           <button className={imageplusbutton} onClick={handleRegistry}>
//             <img src={plus} alt="등록" />
//           </button>
//           <button className={imagebutton} onClick={handleShoesInfo}>
//             <img className={buttonImage} src={shoes8} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes1} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes2} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes3} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes4} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes5} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes6} alt="" />
//           </button>
//           <button className={imagebutton}>
//             <img className={buttonImage} src={shoes7} alt="" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default ShoesRoom;
