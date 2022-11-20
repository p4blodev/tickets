import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Login } from "./Login";
import { Queue } from "./Queue";
import { CreateTicket } from "./CreateTicket";
import { Desktop } from "./Desktop";
import { UIContext } from "../context/UIContext";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  const { menuHidden } = useContext(UIContext);

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsedWidth={0} breakpoint="md" hidden={menuHidden}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/login">Log in</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/queue">Queude</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to="/create">Create Ticket</Link>,
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: <Link to="/desktop">Desktop</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/queue" component={Queue} />
              <Route path="/create" component={CreateTicket} />
              <Route path="/desktop" component={Desktop} />
              <Redirect to="/register" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
