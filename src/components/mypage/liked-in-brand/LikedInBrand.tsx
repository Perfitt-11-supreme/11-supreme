import { brand_adidas, brand_crocs, brand_nike, heart_filled } from '../../../assets/assets';
import { heartFilledIcon } from './likedInBrand.css';

const LikedInBrand = () => {
  return (
    <>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={brand_nike} alt="brand_nike" />
            <div>
              <strong>NIKE</strong>
              <p>나이키</p>
            </div>
          </div>
          <div>
            <img className={heartFilledIcon} src={heart_filled} alt="heart_filled" />
          </div>
        </article>
        <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={brand_adidas} alt="brand_adidas" />
            <div>
              <strong>ADIDAS</strong>
              <p>아디다스</p>
            </div>
          </div>
          <div>
            <img className={heartFilledIcon} src={heart_filled} alt="heart_filled" />
          </div>
        </article>
        <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={brand_crocs} alt="brand_crocs" />
            <div>
              <strong>CROCS</strong>
              <p>크록스</p>
            </div>
          </div>
          <div>
            <img className={heartFilledIcon} src={heart_filled} alt="heart_filled" />
          </div>
        </article>
      </section>
    </>
  );
};

export default LikedInBrand;
