import { Link } from "react-router-dom";
import "./searchItemTour.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaceIcon from '@mui/icons-material/Place';

const SearchItemTour = ({item}) => {
  console.log(item)
  
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siAddress"><PlaceIcon style={{ "font-size": "15px"}}/> {item.city}</span>
        {/* <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span> */}
        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOpSubtitle">
          Đặt tour ngay hôm nay!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.price}</span>
          <span className="siTaxOp">Ấn để xem</span>
          <Link to={`/tours/${item._id}`}>
            <button className="siCheckButton">Xem <ArrowForwardIosIcon style={{ "font-size": "10px"}}/></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItemTour;
