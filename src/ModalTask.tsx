import { Col, Form, Input, Modal, Radio, Row } from "antd";
import React from "react";
import { TaskInfo } from "./ExampleComponent";
type Props = {
  selectedItem: TaskInfo | undefined;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  setSelectedItem: (val: TaskInfo | undefined) => void;
  setDataMock: (val: TaskInfo[]) => void;
  dataMock: TaskInfo[];
};
export const ModalTask: React.FC<Props> = ({
  selectedItem,
  showModal,
  setShowModal,
  setSelectedItem,
  setDataMock,
  dataMock,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [form]);

  const handleConfirm = () => {
    if (selectedItem) {
      const data: TaskInfo = {
        id: selectedItem.id,
        title: form.getFieldValue("title"),
        description: form.getFieldValue("description"),
        status: form.getFieldValue("status"),
        priority: form.getFieldValue("priority"),
      };

      form.validateFields(["title", "priority", "status"]).then(() => {
        const index = dataMock.findIndex((i) => i.id === selectedItem.id);
        setDataMock([
          ...dataMock.slice(0, index),
          data,
          ...dataMock.slice(index + 1, dataMock.length),
        ]);
      });
      form.resetFields();
      setShowModal(false);
      setSelectedItem(undefined);
    } else {
      const data: TaskInfo = {
        id: (dataMock.length + 1).toString(),
        title: form.getFieldValue("title"),
        description: form.getFieldValue("description"),
        status: form.getFieldValue("status"),
        priority: form.getFieldValue("priority"),
      };

      form.validateFields(["title", "priority", "status"]).then(() => {
        setDataMock([...dataMock, data]);
        form.resetFields();
        setShowModal(false);
        setSelectedItem(undefined);
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setShowModal(false);
    setSelectedItem(undefined);
  };

  return (
    <Modal
      title={selectedItem ? "Edit Task" : "Create Task"}
      visible={showModal}
      onOk={handleConfirm}
      onCancel={handleCancel}
    >
      <>
        <Form layout="vertical" form={form} initialValues={selectedItem}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Title" type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Description" rows={3} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: "Priority is required" }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">Low</Radio.Button>
                  <Radio.Button value="2">Medium</Radio.Button>
                  <Radio.Button value="3">High</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Status is required" }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="TODO">To Do</Radio.Button>
                  <Radio.Button value="IN PROGRESS">In Progress</Radio.Button>
                  <Radio.Button value="DONE">Done</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    </Modal>
  );
};
