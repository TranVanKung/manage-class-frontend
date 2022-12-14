import React, { useState, useEffect } from "react";
import Axios from "axios";

//ant design
import { Space, Table, Button } from "antd";
import { message, Popconfirm } from "antd";

import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import ModalEditStudent from "../Modal/ModalEditStudent";

//redux
import { useDispatch } from "react-redux";
import studentAction from "@/redux/action/actionStudent";
import ModalViewStudent from "../Modal/ModalViewStudent";

const { Column } = Table;

const TableStudent = () => {
  //redux
  const dispatch = useDispatch();

  const [listStudent, setListStudent] = useState([]);
  //view class info
  const [infoStudent, setInfoStudent] = useState({});
  const [listIdClass, setListIdClass] = useState([]);
  const [listClass, setListClass] = useState([]);

  var optionClassFilter = {};

  //get details class to show
  useEffect(() => {
    Axios.get("http://localhost:3002/student/getStudent").then((data) => {
      setListStudent(data.data);
    });
  }, [listStudent]);

  useEffect(() => {
    Axios.get("http://localhost:3002/class/getListId").then((response) => {
      setListIdClass(response.data);
    });
  }, [listIdClass]);

  var filterClass = [];
  // console.log("list id", listIdClass);
  var listIdClassFiltter = [];

  filterClass = listIdClass?.map((key, index) => {
    // console.log({ text: key.id, value: key.id });
    // filterClass.push({ text: key.id, value: key.id });
    const listClass = { text: key.id, value: key.id };

    filterClass.push(listClass);
    listIdClassFiltter = filterClass;

    // console.log("filter1", filterClass);
  });

  // console.log("listid" + listIdClass[1]);

  // console.log("filterClass: " + filterClass);

  // console.log("optionClassFilterChoice", optionClassFilterChoice);

  const data = [];
  listStudent.map((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      age: value.age,
      email: value.email,
      classID: value.classID,
      sex: value.sex,
    });
  });

  //function edit, view Modal
  const editStudent = (idEdit) => {
    Axios.post("http://localhost:3002/student/getInfoById", {
      idEdit: idEdit,
    })

      .then((response) => {
        setInfoStudent(response.data[0]);
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    dispatch(studentAction.activeEditStudentModal(true));
  };

  //delete function
  //notication delete

  const deleteStudent = (idDelete) => {
    Axios.post("http://localhost:3002/student/deleteStudent", {
      idDelete: idDelete,
    });
  };

  const confirm = (idDelete) => {
    message.success("Delete success!");
    deleteStudent(idDelete);
  };

  const cancel = (e) => {
    message.error("Cancel delete!");
  };

  //function view student
  const viewStudent = (idEdit) => {
    Axios.post("http://localhost:3002/student/getInfoById", {
      idEdit: idEdit,
    })

      .then((response) => {
        setInfoStudent(response.data[0]);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
    dispatch(studentAction.activeViewStudentModal(true));
  };

  //data table

  //sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    console.log("clear");
  };

  const clearAll = () => {
    console.log("clear");
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    console.log("clear");
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  // console.log("filterClass", filterClass);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.length - b.id.length,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "160px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "160px",
    },
    {
      title: "Class",
      dataIndex: "classID",
      key: "classID",
      filters: [...listIdClassFiltter],
      filteredValue: filteredInfo.classID || null,
      onFilter: (value, record) => record.classID.includes(value),
      width: "70px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex.includes(value),
      width: "70px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, info) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              editStudent(info.id);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
          >
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => confirm(info.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <span
                style={{
                  color: "white",
                }}
              >
                Delete
              </span>
            </Popconfirm>
          </Button>
          <Button
            type="primary"
            icon={<UnorderedListOutlined />}
            size="small"
            onClick={() => viewStudent(info.id)}
          >
            View
          </Button>
        </Space>
      ),
      width: "200px",
    },
  ];
  return (
    <div>
      <div>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        onChange={handleChangeTable}
      ></Table>
      <ModalEditStudent infoStudent={infoStudent} />
      <ModalViewStudent infoStudent={infoStudent} />
    </div>
  );
};

export default TableStudent;
