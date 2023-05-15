import { useState, useEffect } from "react";
import { Input, Button, Form, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { callAPI } from "../../../../utils/FetchData.jsx";
import "./Items.css";

function Items() {
  const navigate = useNavigate();
  const id = useParams();
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [fileList, setFileList] = useState([]);
  const [fields, setFields] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      name: ["price"],
      value: 0,
    },
    {
      name: ["description"],
      value: "",
    },
    {
      name: ["picture"],
      value: "",
    },
    {
      name: ["categoryId"],
      value: "",
    },
  ]);
  const { TextArea } = Input;
  const handleClick = () => {
    navigate("/manager/menu");
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    if (location.pathname.split("/")[3] === "edititem") {
      let fetchData = async () => {
        await callAPI(
          `${import.meta.env.VITE__API_URL}/api/items/${id.id}`,
          "GET",
          "",
          token
        ).then((res) => {
          setFields([
            {
              name: ["name"],
              value: res.name,
            },
            {
              name: ["price"],
              value: res.price,
            },
            {
              name: ["description"],
              value: res.description,
            },
            {
              name: ["picture"],
              value: res.picture,
            },
            {
              name: ["categoryId"],
              value: res.categoryId,
            },
            {
              name: ["url"],
              value: res.url,
            },
          ]);
        });
      };
      fetchData();
    }
  }, [id.id, token]);
  useEffect(() => {
    fields[3].value &&
      setFileList([
        {
          uid: "-1",
          name: fields[3].value,
          status: "done",
          url: fields[5].value,
        },
      ]);
  }, [fields]);
  console.log("fields", fields);
  console.log("fileList", fileList);
  const onFinish = (values) => {
    if (location.pathname.split("/")[3] === "additem") {
      const data = {
        name: values.name,
        price: values.price,
        description: values.description,
        categoryId: id.id,
        picture: values.upload[0].name,
        url: values.upload[0].response.url,
      };
      callAPI(
        `${import.meta.env.VITE__API_URL}/api/items`,
        "POST",
        data,
        token
      ).then(() => {
        navigate("/manager/menu");
      });
    } else {
      console.log("values", values);
      console.log("fields[4]", fields[4]);
      console.log("fileList[0]", fileList[0]);
      console.log("values.upload[0]", values.upload[0]);
      const data = {
        name: values.name,
        price: values.price,
        description: values.description,
        categoryId: fields[4].value,
        picture: fileList[0].name,
        url: fileList[0].response.url,
      };
      callAPI(
        `${import.meta.env.VITE__API_URL}/api/items/${id.id}`,
        "PATCH",
        data,
        token
      ).then(() => {
        navigate("/manager/menu");
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const deleteItem = () => {
    callAPI(
      `${import.meta.env.VITE__API_URL}/api/items/${id.id}`,
      "DELETE",
      {},
      token
    ).then(() => {
      navigate("/manager/menu");
    });
  };
  return (
    <div className="Items">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={handleClick}
        style={{
          background: "#f36805",
          color: "#FFFFFF",
          fontSize: "16px",
          float: "Right",
          width: "100px",
        }}
        size={"large"}
      />
      <div className="ItemsForm">
        <Form
          name="addItem"
          fields={fields}
          style={{ maxWidth: 800, marginTop: "40px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="ItemsInput">
            <div className="ItemsInputLine">
              <Form.Item
                label="Name of the item"
                name="name"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The name of the item is required!",
                  },
                ]}
              >
                <Input
                  className="ItemInput"
                  placeholder="Enter the name of the item"
                />
              </Form.Item>
              <Form.Item
                label="Price of the item"
                name="price"
                style={{ fontSize: "24px" }}
                rules={[
                  {
                    required: true,
                    message: "The price of the item is required!",
                  },
                ]}
              >
                <Input
                  className="ItemInput"
                  placeholder="Enter the name of the item"
                />
              </Form.Item>
            </div>
            <div className="ItemsInputLine">
              <Form.Item
                label="Description of the item"
                name="description"
                style={{ fontSize: "24px", width: "800px" }}
                rules={[
                  {
                    required: true,
                    message: "The description of the item is required!",
                  },
                ]}
              >
                <TextArea
                  className="ItemTextArea"
                  placeholder="Enter the description of the item"
                />
              </Form.Item>
            </div>
            <div className="ItemsInputLine">
              <Form.Item
                name="upload"
                label="Upload"
                getValueFromEvent={normFile}
              >
                <Upload
                  action={`${import.meta.env.VITE__API_URL}/api/upload/item`}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={1}
                  name="item"
                >
                  {fileList.length >= 1 ? null : "Upload"}
                </Upload>
              </Form.Item>
            </div>
          </div>
          <Button
            style={{
              background: "#f36805",
              color: "#FFFFFF",
              fontSize: "16px",
              float: "right",
              marginTop: "35px",
            }}
            size={"large"}
            htmlType="submit"
          >
            {Object.keys(id).length === 0 ? "Create item" : "Save change"}
          </Button>
          {Object.keys(id).length !== 0 ? (
            <Button
              style={{
                background: "#FFFFFF",
                color: "#f36805",
                marginRight: "20px",
                borderColor: "#f36805",
                fontSize: "16px",
                float: "right",
                marginTop: "35px",
              }}
              size={"large"}
              onClick={deleteItem}
            >
              Delete item
            </Button>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </div>
  );
}
export default Items;
