import { useState } from "react";
import { Form, Input, Button } from "antd";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { Link } from "@styled-icons/boxicons-regular/Link";
import { listCustomDomain } from '../step2/selectDomain';
import "./pasteLink.scss";
import axios from "axios";

export const PasteLink = ({
                            nextStep1,
                            spinner,
                            onFinishStep2,
                            setLongUrl
                          }) => {
  const [isValidUrl, setValidUrl] = useState(false);
  const [longLink, setLongLink] = useState({value: ""});

  const onFinish = (longUrl) => {
    console.log("==longUrls step1==>", longUrl);
    console.log(isValidUrl);
    nextStep1(longUrl);
  };
  const onFieldsChange = (values) => {
    let error = values[0].errors.length;
    let https = values[0].value !== undefined && values[0].value.slice(0, 5);

    if (https === "https" && error === 0) {
      setValidUrl(true);
    } else setValidUrl(false);
  };

  const showErrorMessage = () => {
    return {
      validateStatus: 'error',
      errorMsg: "This domain is in our banned list",
    };
  };
  const removeErrorMessage = () => {
    return {
      validateStatus: 'success',
      errorMsg: "",
    };
  };

  const urlInutChange = (value) => {
    setLongLink({ ...removeErrorMessage(), value});
    if (value) {
      const data = {"long_url": value};
      const url = `${process.env.REACT_APP_API}/shorten/domains/verification`;
      axios.post(url, data)
        .then((res) => {
          setLongUrl(value);
        })
        .catch((error) => {
          console.log("CATCH ERROR", error);
          setLongLink({ ...showErrorMessage(), value});
          setValidUrl(false);
        });
    }
  };

  return (
    <Form
      layout="vertical"
      className="step1-wrapper"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
      requiredMark={false}
    >
      <div className="input-wrapper">
        <Form.Item
          label="Paste Long URL"
          name="longUrl"
          className="form-input"
          validateStatus={longLink.validateStatus}
          help={longLink.errorMsg || ``}
          rules={[
            {
              type: "url",
              required: true,
              message: "Please paste a valid https link.",
            },
          ]}
        >
          <Input
            className="create-link-input"
            placeholder=" https://"
            onChange={(e) => urlInutChange(e.currentTarget.value)}
          />
        </Form.Item>
        <Button
          loading={spinner}
          disabled={!isValidUrl}
          shape="round"
          className={`button-url ${isValidUrl && "correct-url"}`}
          onClick={() => {
            onFinishStep2(
              { customDomain: (listCustomDomain.map( d => d.value).includes(window.location.host) ? window.location.host : "url.cafe"), brandDomain: null},
              { isLinkPasted: true }
            );
          }}
        >
          <Link size="20" className="link-icon" />
          <span>Create Short URL</span>
        </Button>
      </div>
      <Form.Item>
        <Button
          shape="round"
          className="button-submit"
          htmlType="submit"
          type="primary"
        >
          <span className="text-button">Next Step</span>
          <ArrowRight color="#fff" size="20" />
        </Button>
      </Form.Item>
    </Form>
  );
};
