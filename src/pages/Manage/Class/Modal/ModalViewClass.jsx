import { Modal, Form, Input } from "antd";

import { useSelector, useDispatch } from "react-redux";
import classAction from "@/redux/action/class";

const ModalViewClass = (props) => {
  //get info class to view
  const { infoClass } = props;
  const dispatch = useDispatch();
  const classReducer = useSelector((state) => state.Class);

  const handleOk = () => {};

  const handleCancel = () => {
    // dispatch(classAction.activeViewClassModal(false));
  };

  return (
    <Modal
      title="View class"
      visible={classReducer.activeViewModal}
      onCancel={handleCancel}
      onOk={handleOk}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          rules={[
            {
              required: true,
              message: "Please input ID class",
            },
          ]}
        >
          <Input type="text" value={infoClass.id} />
        </Form.Item>
        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input name class",
            },
          ]}
        >
          <Input type="text" value={infoClass.name} />
        </Form.Item>
        <Form.Item
          label="Number Student"
          rules={[
            {
              required: true,
              message: "Please input number of student",
            },
          ]}
        >
          <Input type="text" value={infoClass.numberOfStudent} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalViewClass;
