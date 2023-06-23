import "./featured.css";
import useFetch from "../../hooks/useFetch";
import DaNang from "../../assets/images/city/danang.jpg"
import HaNoi from "../../assets/images/city/hanoi.jpg"
import HoChiMinh from "../../assets/images/city/hochiminh.jpg"

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Đà Nẵng,Hà Nội,Hồ Chí Minh"
  );

  // console.log("Data's array: " + data)
  // console.log("Loading's status: " + loading)

  return (
    <div className="featured">
      { 
        loading ? (
          "Loading cities, please waiting"
        ) : (
          <>
          <div className="featuredItem">
            <img
              src={DaNang}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              <h5>{data[0]} chỗ nghỉ</h5>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src={HaNoi}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h5>{data[1]} chỗ nghỉ</h5>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src={HoChiMinh}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hồ Chí Minh</h1>
              <h5>{data[2]} chỗ nghỉ</h5>
            </div>
          </div>
        </>
        )
      }
    </div>
  );
};

export default Featured;

