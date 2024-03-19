"use client";
import { host } from "@/environment";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDropExample = ({ mainItems, setMainItems, setSortableList }) => {
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userImage, setuserImage] = React.useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const localStorageFullName = localStorage.getItem("fullname");

    if (userInfo) {
      setuserImage(userInfo[0].profile_pic);
      setFullName(localStorageFullName);
      setUserName(userInfo[0].username);
    }
  }, []);

  // const [itemstwo, setItemstwo] = useState([
  //   { id: "1", content: "Item 1" },
  //   { id: "2", content: "Item 2" },
  //   { id: "3", content: "Item 3" },
  // ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(mainItems);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setMainItems(newItems);
  };


  return (
    <div className='leftSidebarCustom-div'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              <li >
                <Link href={`/${userName}/timeline`} className='shortable-link px-2 py-2 pl-3' style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr',
                  gap: 2,
                  
                }}>
                  <Image
                    src={userImage ? `${host}/uploads/${userImage}` : '/custom-svg-icon/user-profile.svg'}
                    width='30'
                    className='bi bi-wallet2 olymp-explore-icon left-menu-icon'
                    height='30'
                    style={{
                      borderRadius: "50%"
                    }}
                  />
                  <span className='left-menu-title pt-2'>{fullName}</span>
                </Link>
              </li>
              {mainItems.map((element, index) => (
                <Draggable key={element?.id} draggableId={element?.id} index={index}>
                  {(provided) => (
                    <li style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <Grid
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 6fr 1fr',
                          alignItems: 'center',
                          // border: '1px solid'
                        }}
                        className="px-3 py-3"
                      // className="customize-svg-icons" sx={{
                      //   justifyContent:'space-between',
                      //   alignItems:'center'
                      // }}
                      >
                        <span>
                          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.8 2.6C2.24183 2.6 2.6 2.24183 2.6 1.8C2.6 1.35817 2.24183 1 1.8 1C1.35817 1 1 1.35817 1 1.8C1 2.24183 1.35817 2.6 1.8 2.6Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.1999 2.6C8.64173 2.6 8.9999 2.24183 8.9999 1.8C8.9999 1.35817 8.64173 1 8.1999 1C7.75807 1 7.3999 1.35817 7.3999 1.8C7.3999 2.24183 7.75807 2.6 8.1999 2.6Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.8 9.00039C2.24183 9.00039 2.6 8.64222 2.6 8.20039C2.6 7.75856 2.24183 7.40039 1.8 7.40039C1.35817 7.40039 1 7.75856 1 8.20039C1 8.64222 1.35817 9.00039 1.8 9.00039Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.1999 9.00039C8.64173 9.00039 8.9999 8.64222 8.9999 8.20039C8.9999 7.75856 8.64173 7.40039 8.1999 7.40039C7.75807 7.40039 7.3999 7.75856 7.3999 8.20039C7.3999 8.64222 7.75807 9.00039 8.1999 9.00039Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1.8 15.3998C2.24183 15.3998 2.6 15.0416 2.6 14.5998C2.6 14.158 2.24183 13.7998 1.8 13.7998C1.35817 13.7998 1 14.158 1 14.5998C1 15.0416 1.35817 15.3998 1.8 15.3998Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.1999 15.3998C8.64173 15.3998 8.9999 15.0416 8.9999 14.5998C8.9999 14.158 8.64173 13.7998 8.1999 13.7998C7.75807 13.7998 7.3999 14.158 7.3999 14.5998C7.3999 15.0416 7.75807 15.3998 8.1999 15.3998Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                        </span>
                        {/* {
                          typeof (element?.content) == 'string' ? <div className="customize-menu-main-menu" dangerouslySetInnerHTML={{ __html: element?.content }}></div>
                            : element?.content
                        } */}
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
                        <span style={{cursor:'pointer'}} onClick={() => {
                          setSortableList(prev => {
                            const temp = prev.find(i => i.id === element?.id)
                            if (temp) return prev;
                            mainItems.splice(index, 1)
                            return [...prev, element]
                          })
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="6" stroke="#E20322" stroke-width="1.5" />
                            <path d="M10 8L6 8" stroke="#E20322" stroke-width="1.5" stroke-linecap="square" />
                          </svg>
                        </span>
                      </Grid>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropExample;
