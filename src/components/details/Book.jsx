import style from './Book.module.css';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCustom.css';

const Book = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>
      </div>
      <form className={style.form}>
        <input type="text" placeholder="Name*" />
        <input type="email" placeholder="Email*" />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Booking date*"
          dateFormat="dd/MM/yyyy"
          className={style.dateInput}
          calendarStartDay={1}
          formatWeekDay={name => name.slice(0, 3)}
        />
        <textarea placeholder="Comment" />
      </form>
      <div className={style.sendButton}>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Book;
