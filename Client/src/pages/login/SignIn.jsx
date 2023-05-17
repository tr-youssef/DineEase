import { Button, message, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../utils/FetchData.jsx";
import loginImage from "../../assets/WebsiteImage.png";
import logoImage from "../../assets/Logo1.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const user = await callAPI(
      `${import.meta.env.VITE__API_URL}/api/users/signin`,
      "POST",
      values
    );
    if (user.userId) {
      window.localStorage.setItem("user", JSON.stringify(user));
      navigate(`/${user.role}`);
    } else {
      messageApi.open({
        type: "error",
        content: user.message,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="Container">
      {contextHolder}
      <div className="Picture">
        <img src={loginImage}></img>
      </div>
      <div className="RightContainer">
        <div className="LogoSignin">
          <img src={logoImage} className="ImgLogo" />
        </div>
        <div className="Form">
          <div className="Help">
            <div>
              For Manager : <b>manager@gmail.com</b>/ password : <b>manager</b>
            </div>
            <div>
              For Receptionist : <b>receptionist@gmail.com</b> / password :
              <b>receptionist</b>
            </div>
            <div>
              For Server : <b>server@gmail.com</b> / password : <b>server</b>
            </div>
            <div>
              For Chef : <b>chef@gmail.com</b> / password : <b>chef</b>
            </div>
          </div>

          <Form
            name="basic"
            className="ContainerForm"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 36,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Enter your Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                style={{ backgroundColor: "#F36805", width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
