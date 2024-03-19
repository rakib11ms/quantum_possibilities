"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GroupSvg1 from "../../../public/custom-svg-icon/groups.svg";
import DndScroll from "../../../public/svg-icons/dndScroll.svg";
import exploreSvg from "../../../public/custom-svg-icon/compass_1.svg";
import marketplace from "../../../public/custom-svg-icon/marketplace.svg";
import walletSvg from "../../../public/custom-svg-icon/Wallet.svg";
import friendSvg from "../../../public/custom-svg-icon/friends.svg";
import pagesSvg from "../../../public/custom-svg-icon/pages.svg";
import bookmarkSvg from "../../../public/custom-svg-icon/bookmark.svg";
import Seller from "../../../public/seller_panel.svg";
import Buyer from "../../../public/buyer_panel.svg";
import Link from "next/link";
import Image from "next/image";
import { Grid } from "@mui/material";

const DragAndDropExample = ({ setMainItems, sortableList, setSortableList }) => {
  
  return (
    <div className='leftCustom-div'>
      <div className='customize-header-tag-div'>
        <h4 className='customize-header-tag'>Customize Menu</h4>
      </div>
      <div className='short-list-side-div m-0'>
        <div className='short-list'>
          <h5>Sortable List</h5>
        </div>

        <ul>
          {sortableList.map((element, index) => (
            <li
              className="px-2">
              <Grid
                className="customize-svg-icons"
                sx={{
                  justifyContent: 'space-between'
                }}>

                {/* {element?.content} */}
                <span className='shortable-link'>
                  <Image
                    src={element.icon_url}
                    width='25'
                    className='bi bi-wallet2 olymp-explore-icon left-menu-icon'
                    height='25'
                  />
                  <span className='left-menu-title'>{element?.title} </span>
                </span>

                <span style={{ cursor: 'pointer' }} onClick={() => {
                  setMainItems(prev => {
                    const temp = prev.find(i => i.id === element?.id)
                    if (temp) return prev;
                    sortableList.splice(index, 1)
                    return [...prev, element]
                  })
                }}>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.3159" cy="12" r="9" stroke="#307777" stroke-width="2" />
                    <path d="M12.3159 15L12.3159 9" stroke="#307777" stroke-width="2" stroke-linecap="square" />
                    <path d="M15.3159 12L9.31592 12" stroke="#307777" stroke-width="2" stroke-linecap="square" />
                  </svg>

                </span>

              </Grid>

            </li>
            //   )}
            // </Draggable>
          ))}

        </ul>
  
      </div>
    </div>
  );
};

export default DragAndDropExample;
