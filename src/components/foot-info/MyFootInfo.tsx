import { useState } from 'react';
import {
  analyze,
  analyze2,
  arrow_down,
  arrow_up,
  my_foot_info,
  tip1,
  tip2,
  tip3,
  tip4,
  tip5,
  tip6,
  warning,
  warning2,
} from '../../assets/assets';
import Header from '../empty-shoes-room/header/Header';
import {
  accordion,
  accordionButton,
  accordionContent,
  accordionDiv,
  activeAccordion,
  container,
  InfoDiv,
  InfoP,
  textButtonDiv,
  textDiv,
} from './my-foot-info.css';
import Choose from './choose/Choose';

const Accordion = ({ title, content }: { title: string; content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={accordionDiv}>
      <div className={accordion}>
        <div className={textButtonDiv}>
          <p className={InfoP}>{title}</p>
          <button className={accordionButton} onClick={toggleAccordion}>
            <img src={isOpen ? arrow_up : arrow_down} alt={isOpen ? '닫기' : '열기'} />
          </button>
        </div>
        <div className={`${accordionContent} ${isOpen ? activeAccordion : ''}`}>{content}</div>
      </div>
    </div>
  );
};

const MyFootInfo = () => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const handleChangeFactory =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.id);
    };
  return (
    <div className={container}>
      <Header title="내 발 정보" />

      <div className={InfoDiv}>
        <div className={textButtonDiv}>
          <p className={InfoP}>측정 결과</p>
          <Choose
            groupName="unit"
            options={[
              { id: 'option1', label: 'mm' },
              { id: 'option2', label: 'in' },
            ]}
            selectedOption={selectedUnit}
            handleChange={handleChangeFactory(setSelectedUnit)}
          />
        </div>
        <div>
          <img src={my_foot_info} alt="" />
        </div>
      </div>

      <div className={InfoDiv}>
        <div className={textDiv}>
          <p className={InfoP}>발볼 분석</p>
        </div>
        <div>
          <img src={analyze} alt="" />
          <img src={analyze2} alt="" />
        </div>
      </div>

      <div className={InfoDiv}>
        <div className={textDiv}>
          <p className={InfoP}>조심하세요!</p>
        </div>
        <div>
          <img src={warning} alt="" />
          <img src={warning2} alt="" />
        </div>
      </div>

      <Accordion
        title="사이즈 선택 TIP"
        content={
          <>
            <img src={tip1} />
            <img src={tip2} />
            <img src={tip3} />
            <img src={tip4} />
            <img src={tip5} />
            <img src={tip6} />
          </>
        }
      />
    </div>
  );
};

export default MyFootInfo;
