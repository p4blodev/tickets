import { useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUserStorage } from "../helpers/getUserStorage";
import { Redirect, useHistory } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

const { Title, Text } = Typography;

export const Desktop = () => {
  const { socket } = useSocket();
  const [user] = useState(getUserStorage());
  const history = useHistory();
  const [ticket, setTicket] = useState();
  useHideMenu(false);

  const logout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  const nextTicket = () => {
    socket.emit("take-next-ticket", user, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!user || !user.agent || !user.desktop) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Row>
        <Col span={22}>
          <Title level={2}>{user.agent}</Title>
          <Text>Youre are working on deskpot: </Text>
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={2} align="right">
          <Button shape="round" type="danger" onClick={logout}>
            <CloseCircleOutlined />
          </Button>
        </Col>
      </Row>
      <Divider />
      {ticket && (
        <Row>
          <Col>
            <Text>You are attending number</Text>
            <Text style={{ fontSize: 30 }}>{ticket.number}</Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button shape="round" type="primary" onClick={nextTicket}>
            <RightOutlined />
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};
