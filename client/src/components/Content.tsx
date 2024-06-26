import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit, getJobs, openDeleteForm } from "../store/reducers/jobReducer";

export default function Content() {
  const getDate: any = useSelector((state) => state);

  console.log(1111, getDate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
  }, []);

  const openDelete = (id: number) => {
    let deleteJob = getDate.jobs.jobs.find((job: any) => job.id === id);
    dispatch(openDeleteForm(deleteJob));
  };

  const editJob = (id: number) => {
    let index = getDate.jobs.jobs.find((job: any) => job.id === id);
    dispatch(edit(index));
  };
  return (
    <>
      <div className="tab-content" id="ex1-content">
        <div className="tab-pane fade show active">
          <ul className="list-group mb-0">
            {getDate.jobs.jobs.map((item: any, index: number) => {
              return (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                  style={{ backgroundColor: "#f4f6f7" }}
                >
                  <div>
                    <input className="form-check-input me-2" type="checkbox" />
                    {item.status ? (
                      <s>{item.name}</s>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </div>
                  <div className="d-flex gap-3">
                    <i
                      className="fas fa-pen-to-square text-warning"
                      onClick={() => editJob(item.id)}
                    />
                    <i
                      onClick={() => openDelete(item.id)}
                      className="far fa-trash-can text-danger"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
