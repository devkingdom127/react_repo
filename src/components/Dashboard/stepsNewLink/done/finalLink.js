import useClipboard from "react-use-clipboard";
import { ContentCopy } from "@styled-icons/material/ContentCopy";
import { Tooltip, Button } from "antd";
import "./finalLink.scss";

export const FinalLink = ({ yourLink }) => {
  const [isCopied, setCopied] = useClipboard(yourLink);

  return (
    <div className="component-final-link">
      <span className="label-link">Here's your link</span>
      <div className="wrapper-link">
        <input className="link-text" value={yourLink} readOnly={true} />
        <Tooltip title="copy">
          <Button
            shape="circle"
            icon={<ContentCopy color="#fff" size="18" />}
            onClick={() => setCopied()}
            className="button-copy"
          />
        </Tooltip>
      </div>
    </div>
  );
};
