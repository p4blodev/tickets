import { Typography, List, Col, Row, Card, Tag, Divider } from "antd";
import { useEffect, useState } from "react";
import { useHideMenu } from "../hooks/useHideMenu";
import { useSocket } from "../hooks/useSocket";
import { getLatest } from "../helpers/getLatest";

const { Title, Text } = Typography;

export const Queue = () => {
  useHideMenu(true);
  const [tickets, setTickets] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    getLatest().then((data) => setTickets(data));
  }, []);

  useEffect(() => {
    socket.on("ticket-assigned", (tickets) => {
      setTickets(tickets);
    });

    return () => {
      socket.off("ticket-assigned");
    };
  }, [socket]);

  return (
    <>
      <Title level={1}>Attending client</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                      <Tag color="volcano">{item.agent}</Tag>,
                      <Tag color="magenta">Desk: {item.desktop}</Tag>,
                    ]}
                  >
                    <Title>No. {item.number}</Title>
                  </Card>
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={12}>
          <Divider>Track</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No: ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">At desk: </Text>
                      <Tag color="magenta">{item.desktop}</Tag>
                      <Text type="secondary">Agent: </Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
