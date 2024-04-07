import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { khalti } from 'khalti-sdk';

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await khalti.requestPayment(values);
      console.log('Payment response:', response);
      message.success('Payment successful');
    } catch (error) {
      console.error('Payment error:', error);
      message.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Please enter the amount' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Pay with Khalti
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
