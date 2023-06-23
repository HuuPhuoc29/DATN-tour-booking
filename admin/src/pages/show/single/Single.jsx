import "./single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import avatar from "../../../assets/images/avatar.jpg"
import useFetch from "../../../hooks/useFetch";

import { useLocation } from "react-router-dom";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const { data, loading, error } = useFetch(`/users/${id}`);
  console.log(data)
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div class="container emp-profile">
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <img
                  class="img"
                  src={data.img || avatar}
                  alt=""
                />
                
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <h1>
                  {data.fullname}
                </h1>
                <h4>
                  {data.email}
                </h4>
              </div>
            </div>
          </div>
          <div class="row-info row">
            <div class="col-md-8">
              <div class="profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="info-content">
                    <span class="title-span">THÔNG TIN CÁ NHÂN</span>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Họ tên</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.fullname}</p>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6">
                        <label>Địa chỉ email</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.email}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <label>Tên tài khoản</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.username}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <label>Ngày sinh</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.birthday}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <label>Số điện thoại</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.phone}</p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <label>Địa chỉ</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.city}, {data.country}</p>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6">
                        <label>Ngày tạo tài khoản</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.createdAt}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Ngày cập nhật tài khoản</label>
                      </div>
                      <div class="col-md-5">
                        <p>{data.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Single;
