import style from './Reviews.module.css';

const Reviews = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>
      </div>
      <div className={style.form}>
        <input type="text" placeholder="Name*" />
        <input type="email" placeholder="Email*" />
        <input type="text" placeholder="Booking date*" />
        <textarea placeholder="Comment" />
      </div>
      <div className={style.sendButton}>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Reviews;
