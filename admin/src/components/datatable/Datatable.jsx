import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import { Table, Space, Input, Modal, Button } from 'antd';

import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  const [files, setFiles] = useState("");
  const [listF,setListFin] = useState([])
  const [fLen,setLenFin] = useState([])
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);

  console.log(list)
  const navigate = useNavigate();

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleImageOk = () => {
    // setActionChange(!actionChange);
    setIsModalImageVisible(false);
  };
  const handleImageCancel = () => {
    // setActionChange(!actionChange);
    setIsModalImageVisible(false);
  };

  const handleUpdateOk = () => {
    setIsModalUpdateVisible(false);
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const handleShow = async (id) => {
    console.log(id)
    try {
      if(path == "users"){
        await axios.get(`/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
        navigate(`/${path}/${id}`)
      }else{
        await axios.get(`/${path}/find/${id}`);
        setList(list.filter((item) => item._id !== id));
        navigate(`/${path}/${id}`)
      }
      
    } catch(err) {

    }
  };

  const handleImage = async (id) => {
    setIsModalImageVisible(true);
    console.log(id)
    try {
      
    } catch(err) {

    }
  };

  const handleUpdate = async (id) => {
    // setIsModalShowVisible(true);

    try {
      console.log(id)
    } catch(err) {

    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id)
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      alert("Thành công")
      // // const getRes = await axios.get(`/${path}`)
      // setListFin(getRes.data)
      // setLenFin(getRes.data.length)   
      // console.log(getRes)
      window.location.reload();
    } catch (err) {}
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        console.log(params)
        return (
          <div className="cellAction">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => handleShow(params.row._id)}
              >
              <VisibilityIcon />
            </button>

            <button 
              type="button" 
              className="btn btn-success"
              onClick={() => handleImage(params.row._id)}
              >
              <ImageIcon />
            </button>

            <button 
              type="button" 
              className="btn btn-warning"
              onClick={() => handleUpdate(params.row._id)}
              >
              <UpdateIcon />
            </button>

            <button 
              type="button" 
              className="btn btn-danger"
              onClick={() => handleDelete(params.row._id)}
              >
              <DeleteIcon />
            </button>


            {/* <div 
              className="showButton"
              onClick={() => handleShow(params.row._id)}
              style={{ textDecoration: "none" }}
              // to="/users/test" 
              >
              <div className="viewButton">View</div>
            </div>
            <div
              className="updateButton"
              onClick={() => handleUpdate(params.row._id)}
            >
              Update
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          <AddIcon />
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />

      {/* Update's modal */}
      <Modal
        title="Updateinformations"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <p>UPDATE INFORMATION</p>
        <div class="form-group">
          <label for="name">ID: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="id"
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="name"
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Phone number: </label>
          <input
            type="text" readonly
            class="form-control"
            id="phone_number"
            disabled
          ></input>
        </div>
        

        <label>Gender: </label>
        <select
          name="gender"
          readonly
          id="gender"
          class="form-control"
          disabled
        >
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>

        <div class="date">
          <label for="birthday">Date of birth: </label>
          <input
            type="date"
            readonly
            class="form-control"
            id="birthday"
            disabled
          ></input>
        </div>
      </Modal>

      {/* Image's modal */}
      <Modal
        title="Image"
        visible={isModalImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {/* <UploadBox /> */}
        <div className="imgContainer">
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
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Datatable;
