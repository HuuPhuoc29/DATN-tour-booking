import useFetch from "../../hooks/useFetch";
import room from "../../assets/images/room.jpg"
import "./featuredProperties.css";

import AddCardIcon from '@mui/icons-material/AddCard';
import PlaceIcon from '@mui/icons-material/Place';

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch(
    "/hotels?featured=true"
  );
  console.log(loading)
  return (
    <div className="fp">
      { loading ? "Loading"
       : <>
       { data.map((item) => (
         <div className="fpItem" key={item._id}>
           <img
             src={item.photos[0]}
            //  src={room}
             alt=""
             className="fpImg"
           />
           <span className="fpName">{item.name}</span>
           <span className="fpCity"><PlaceIcon /> {item.city}</span>
           <span className="fpPrice"><AddCardIcon/> Starting from <b>{item.cheapestPrice}</b></span>
           { item.rating && <div className="fpRating">
             <button>{item.rating}</button>
             <span>Excellent</span>
           </div> }
         </div>
       )) }
     </>
      }
      
      
      
    </div>
  );
};

export default FeaturedProperties;
