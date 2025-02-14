import React, { useEffect, useState } from "react";
import { API } from "../config/api";

const Assign = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
    endDate: "",
    assignTo: "",
  });
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    let res = await API.get(`/users?role=user`);
    setUsers(res.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleInput = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(task);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={task.title} name="title" onChange={handleInput}
        />
        <input type="text" value={task.desc} name="desc" onChange={handleInput}
        />
        <input type="date" value={task.endDate} name="endDate" onChange={handleInput}
        />
        <select name="assignTo" id="" onChange={handleInput}>

          <option value="">select</option>
          {users.map((user) => (
            <option value={user._id} key={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <input type="submit" id="" value={"assign"} />
      </form>
    </div>
  );
};

export default Assign;