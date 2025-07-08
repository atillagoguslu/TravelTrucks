import style from './Reviews.module.css';
import starIcon from '../../assets/icons/rating/star_filled.svg';
import starIconEmpty from '../../assets/icons/rating/star_empty.svg';

const Reviews = ({ truck }) => {
  const reviews = truck.reviews;

  return (
    <div className={style.container}>
      {reviews.map((review) => (
        <div className={style.review} key={review.id}>
          <div className={style.reviewHeader}>
            <div className={style.reviewHeaderLeft}>
              {review.reviewer_name.charAt(0)}
            </div>
            <div className={style.reviewHeaderRight}>
              <p>{review.reviewer_name}</p>
              <div className={style.reviewHeaderRightStars}>
                {Array.from({ length: review.reviewer_rating }).map(
                  (_, index) => (
                    <img src={starIcon} alt="star" key={index} />
                  ),
                )}
                {Array.from({ length: 5 - review.reviewer_rating }).map(
                  (_, index) => (
                    <img src={starIconEmpty} alt="star" key={index} />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className={style.reviewComment}>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
