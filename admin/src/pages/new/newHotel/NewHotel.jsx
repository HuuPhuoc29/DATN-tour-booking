import "./newHotel.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("");
  const [featured, setFeatured] = useState(false);

  const navigate = useNavigate();

  const [isModalSuccessfullVisible, setIsModalSuccessfullVisible] = useState(false);

  const handleSuccessfullOk = () => {
    setIsModalSuccessfullVisible(false);
    navigate("/hotels")
  };
  const handleSuccessfullCancel = () => {
    setIsModalSuccessfullVisible(false);
    navigate("/hotels")
  };

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleType = (e) => {
  //   let updatedValue = ;

  //   // if (updatedValue === "hotel" || updatedValue == "apartment" || updatedValue == "resort" || updatedValue == "villa" || updatedValue == "cabin") {
  //   //   updatedValue = JSON.toString(updatedValue);
  //   // }

  //   console.log(updatedValue)
  //   // setType(updatedValue)
  // }
  

  // const handleFeatured = (e) => {
  //   let updatedValue = e.target.value;

  //   if (updatedValue === "true" || updatedValue == "false") {
  //     updatedValue = JSON.toString(updatedValue);
  //   }

  //   console.log(updatedValue)
  //   setFeatured(updatedValue)
  // }

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value
    );
    setRooms(value);
  }
  
  const handleClick = async (e) => {
    e.preventDefault()
    try{
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/huuphuochph/image/upload",
          data
        );
        // console.log(uploadRes.data)

        const { url } = uploadRes.data;

        return url
        })
      )
      const newhotel = {
        ...info,
        rooms,
        type,
        featured,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
      setIsModalSuccessfullVisible(true);
    } catch(err) {
      console.log(err)
    }
  }

  console.log(info)

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new hotels</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Type</label>
                <select id="type" onChange={(e) => setType(e.target.value)}>
                  <option selected disabled>Chọn loại khách sạn: </option>
                  <option value="hotel">Hotel</option>
                  <option value="apartment">Apartment</option>
                  <option value="resort">Resort</option>
                  <option value="villa">Villa</option>
                  <option value="cabin">Cabin</option>
                </select>
              </div>
              <div className="formInput">
                <label 
                  id="featured" 
                  // onChange={handleFeatured}
                  >
                    Feature
                </label>
                <select id="featured" onChange={(e) => setFeatured(e.target.value)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title} - {room.price} - {room.maxPeople} người
                        </option>
                      ))}
                </select>
              </div>
              <button type="button" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      {/* Successfull's modal */}
      <Modal
        title="Chú ý"
        open={isModalSuccessfullVisible}
        onOk={handleSuccessfullOk}
        onCancel={handleSuccessfullCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {/* <UploadBox /> */}
        <div className="Container">
          <span>Thành công</span>
        </div>
      </Modal>
    </div>
  );
};

export default NewHotel;
