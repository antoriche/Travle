import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, FloatButton, Modal, Form, Input } from "antd";
import useUsers from "../../hooks/useUsers";

function AddUserForm() {
  const [form] = Form.useForm();
  const { addUser, isAdding } = useUsers();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOk = async () => {
    const values = await form.validateFields();
    await addUser(values);
    setModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Add a user"
        open={modalOpen}
        onCancel={() => {
          form.resetFields();
          setModalOpen(false);
        }}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isAdding} onClick={handleOk}>
            Create user
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "email is required" }, { type: "email" }]}>
            <Input type="email" />
          </Form.Item>
        </Form>
      </Modal>
      <FloatButton
        tooltip="Add a user"
        style={{ height: 64, width: 64, fontSize: 64 }}
        type="primary"
        icon={<PlusOutlined style={{ fontSize: "20px" }} />}
        onClick={() => setModalOpen(true)}
      />
    </>
  );
}

export default AddUserForm;
