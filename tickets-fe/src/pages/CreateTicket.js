import { Button, Col, Row, Typography } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useSocket } from "../hooks/useSocket";
import { useState } from "react";

const { Title, Text } = Typography;

export const CreateTicket = () => {
  const [ticket, setTicket] = useState(null);

  useHideMenu(true);
  const { socket } = useSocket();
  const newTicket = () => {
    socket.emit("request-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Clic button to get a new ticket</Title>
          <Button
            type="primary"
            shape="round"
            icon={<CloudDownloadOutlined />}
            onClick={newTicket}
            size="large"
          ></Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Your number</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
