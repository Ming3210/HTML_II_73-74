import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteForm, deleteJob } from "../store/reducers/jobReducer";

export default function DeleteForm() {
  const status: any = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeDeleteForm());
  };

  const handleDelete = () => {
    let id = status.jobs.jobs.find(
      (job: any) => job.id === status.jobs.deleteJob.id
    );

    dispatch(deleteJob(id.id));
    dispatch(closeDeleteForm());
  };

  return (
    <>
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Xác nhận</h5>
            <i className="fas fa-xmark" onClick={handleClose} />
          </div>
          <div className="modal-body-custom">
            <p>Bạn chắc chắn muốn xóa công việc quét nhà?</p>
          </div>
          <div className="modal-footer-footer">
            <button className="btn btn-light" onClick={handleClose}>
              Hủy
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete()}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
