import {Dots} from "react-activity";
import "react-activity/dist/library.css";

const Loading = ({loading = true, windowHeight}) => {
  if (!loading) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: windowHeight ? windowHeight : "80vh",
      }}
    >
      <Dots size={18} />
    </div>
  );
};

export default Loading;
