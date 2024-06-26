import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob, edit, editJob, getJobs } from "../store/reducers/jobReducer";
import DeleteForm from "./DeleteForm";

export default function AddJob() {
  const [inputValue, setInputValue] = useState<string>("");

  const dispatch = useDispatch();

  const state: any = useSelector((state) => state);
  console.log(state.jobs.editedJob);

  useEffect(() => {
    if (state.jobs.editedJob) {
      setInputValue(state.jobs.editedJob.name);
    }
  }, [state.jobs.editedJob]);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.jobs.editedJob) {
      const updatedJob = { ...state.jobs.editedJob, name: inputValue };
      dispatch(editJob(updatedJob));
      setInputValue("");
    } else {
      let newJob = {
        name: inputValue,
        status: false,
      };
      dispatch(addJob(newJob));
    }
  };
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <form className="d-flex justify-content-center align-items-center mb-4">
        <div className="form-outline flex-fill">
          <input
            onChange={handleChange}
            value={inputValue}
            name="name"
            type="text"
            id="form2"
            className="form-control"
          />
          <label className="form-label" htmlFor="form2">
            Nhập tên công việc
          </label>
        </div>
        <button onClick={(e) => add(e)} className="btn btn-info ms-2">
          Thêm
        </button>
      </form>
    </>
  );
}
