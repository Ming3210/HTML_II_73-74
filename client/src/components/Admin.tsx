import React, { useEffect, useState } from "react";
import { addJob, getJobs } from "../store/reducers/jobReducer";
import { useDispatch, useSelector } from "react-redux";
import AddJob from "./AddJob";
import Content from "./Content";
import DeleteForm from "./DeleteForm";

export default function Admin() {
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const getDate: any = useSelector((state) => state);

  // console.log(1111, getDate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
  }, []);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    let newJob = {
      name: inputValue,
      status: false,
    };
    dispatch(addJob(newJob));
    setInputValue("");
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <AddJob></AddJob>
                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <Content></Content>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal xác nhận xóa */}
      {getDate.jobs.deleteFormStatus ? <DeleteForm></DeleteForm> : ""}
      {/* Modal cảnh báo lỗi */}
      <div className="overlay" hidden>
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Cảnh báo</h5>
            <i className="fas fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <p>Tên công việc không được phép để trống.</p>
          </div>
          <div className="modal-footer-footer">
            <button className="btn btn-light">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}
