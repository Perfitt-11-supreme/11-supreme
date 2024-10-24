import { dateSelectBox, dateSelectLabel, dateSelect, dateSelectHorizon } from './dateSelect.css';

type TDateSelect = {
  label: string;
};

const DateSelect = ({ label }: TDateSelect) => {
  const years = [];
  for (let year = 1900; year <= 2024; year++) {
    years.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  const months = [];
  for (let month = 1; month <= 12; month++) {
    months.push(
      <option key={month} value={month.toString().padStart(2, '0')}>
        {month}
      </option>
    );
  }

  const days = [];
  for (let day = 1; day <= 31; day++) {
    days.push(
      <option key={day} value={day.toString().padStart(2, '0')}>
        {day}
      </option>
    );
  }
  return (
    <>
      <div className={dateSelectBox}>
        <label htmlFor="year" className={dateSelectLabel}>
          {label}
        </label>
        <div className={dateSelectHorizon}>
          <select id="year" className={dateSelect}>
            <option value={''}>년</option>
            {years}
          </select>
          <select id="month" className={dateSelect}>
            <option value={''}>월</option>
            {months}
          </select>
          <select id="day" className={dateSelect}>
            <option value={''}>일</option>
            {days}
          </select>
        </div>
      </div>
    </>
  );
};

export default DateSelect;
