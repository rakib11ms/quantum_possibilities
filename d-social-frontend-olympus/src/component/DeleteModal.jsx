import * as React from "react";

import Modal from "react-modal";
import { customStyles } from "../../utils/customeStyle";

export default function DeleteModal({ callback, deleteButton }) {
   return (
      <>
         <React.Fragment>
            <div onClick={handleClickOpen}>{deleteButton}</div>
         </React.Fragment>
      </>
   );
}
