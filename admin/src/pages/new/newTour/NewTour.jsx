import "./newTour.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { tourInputs } from "../../../formSource";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';

const NewTour = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();

  const [isModalSuccessfullVisible, setIsModalSuccessfullVisible] = useState(false);


  const handleSuccessfullOk = () => {
    setIsModalSuccessfullVisible(false);
    navigate("/tours")
  };
  const handleSuccessfullCancel = () => {
    setIsModalSuccessfullVisible(false);
    navigate("/tours")
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
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

      const newtour = {
        ...info,
        featured,
        photos: list,
      };

      await axios.post("/tours", newtour);
      setIsModalSuccessfullVisible(true);

    } catch(err) {
      console.log(err)
    }
  }

  console.log(files)

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new tours</h1>
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

              {tourInputs?.map((input) => (
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
                <label id="featured">Feature</label>
                <select id="featured" onChange={(e) => setFeatured(e.target.value)}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
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

export default NewTour;
