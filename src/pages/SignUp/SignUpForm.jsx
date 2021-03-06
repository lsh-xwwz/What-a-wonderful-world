// @ts-nocheck
import React from "react";
import {
  Form,
  Input,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Card,
  InputNumber,
  Button,
} from "@tencent/tea-component";

// eslint-disable-next-line
import { Form as FinalForm, Field } from "react-final-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function getStatus(meta, validating) {
  if (meta.active && validating) {
    return "validating";
  }
  if (!meta.touched) {
    return null;
  }
  return meta.error ? "error" : "success";
}

export default function SignUpForm() {
  async function onSubmit(values) {
    await sleep(1500);
    alert(JSON.stringify(values));
  }

  return (
    <div className="example-stage">
      <Card>
        <Card.Body>
          {/*
            `initialValuesEqual` 默认为 shallowEqual，如果初始值有多层，会导致重渲染
            https://github.com/final-form/react-final-form#initialvaluesequal-object-object--boolean
          */}
          <FinalForm
            onSubmit={onSubmit}
            initialValuesEqual={() => true}
            initialValues={{
              age: 18,
              hobbies: [],
            }}
          >
            {({ handleSubmit, validating, submitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Form.Title>表单验证</Form.Title>
                  <Form>
                    <Field
                      name="name"
                      validateOnBlur
                      validateFields={[]}
                      validate={async value => {
                        await sleep(1500);
                        return !value || value.length < 4
                          ? "昵称太短了哦"
                          : undefined;
                      }}
                    >
                      {({ input, meta }) => (
                        <Form.Item
                          label="昵称"
                          status={getStatus(meta, validating)}
                          message={
                            getStatus(meta, validating) === "error" &&
                            meta.error
                          }
                        >
                          <Input
                            {...input}
                            autoComplete="off"
                            placeholder="你是谁"
                          />
                        </Form.Item>
                      )}
                    </Field>
                    <Field
                      name="sex"
                      validateFields={[]}
                      validate={value => (!value ? "请选择性别" : undefined)}
                    >
                      {({ input, meta }) => (
                        <Form.Item
                          label="性别"
                          status={getStatus(meta)}
                          message={getStatus(meta) === "error" && meta.error}
                        >
                          <RadioGroup {...input}>
                            <Radio name="male">男</Radio>
                            <Radio name="female">女</Radio>
                          </RadioGroup>
                        </Form.Item>
                      )}
                    </Field>
                    <Field
                      name="age"
                      validateFields={[]}
                      validate={value =>
                        value < 18 ? "你好像还未成年哦" : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Form.Item
                          label="年龄"
                          status={meta.error ? "error" : "success"}
                          message={meta.error}
                        >
                          <InputNumber {...input} min={12} max={100} />
                        </Form.Item>
                      )}
                    </Field>
                    <Field
                      name="hobbies"
                      validateFields={[]}
                      validate={value =>
                        value.length < 1 ? "请至少选择一个哦" : undefined
                      }
                    >
                      {({ input, meta }) => (
                        <Form.Item
                          label="兴趣"
                          status={getStatus(meta)}
                          message="选择一项或多项爱好"
                        >
                          <CheckboxGroup {...input}>
                            <Checkbox name="code">编程</Checkbox>
                            <Checkbox name="web">抠图</Checkbox>
                            <Checkbox name="jinli">超越</Checkbox>
                          </CheckboxGroup>
                        </Form.Item>
                      )}
                    </Field>
                  </Form>
                  <Form.Action>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={submitting}
                    >
                      提交
                    </Button>
                  </Form.Action>
                </form>
              );
            }}
          </FinalForm>
        </Card.Body>
      </Card>
    </div>
  );
}