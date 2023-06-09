import "./listTour.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItemTour from "../../components/searchItemTour/SearchItemTour";
import useFetch from "../../hooks/useFetch";

const ListTour = () => {
  const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);
  // const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  // const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [destination, setDestination] = useState(undefined);
  
  const { data, loading, error, reFetch } = useFetch(`/tours?city=${destination}&min=${min || 0}&max=${max || 9999999}`)

  console.log(location.state)
  // console.log(dates)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm kiếm</h1>
            <div className="lsItem">
              <label>Địa điểm</label>
              {/* <input type="text" placeholder={destination} disabled ></input> */}
              <input type="text" onChange = { e => setDestination(e.target.value) } ></input>

            </div>
            
            <div className="lsItem">
              <label>Tùy chọn</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá thấp nhất
                  </span>
                  <input type="number" onChange = { e => setMin(e.target.value) } className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất
                  </span>
                  <input type="number" onChange = { e => setMax(e.target.value) } className="lsOptionInput" />
                </div>
                </div>
              </div>
              <button onClick={ handleClick }>Tìm kiếm</button>
            </div>
            <div className="listResult">
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItemTour item={item} key={item._id} />
                  ))}
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ListTour;
