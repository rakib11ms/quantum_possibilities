"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import Link from "next/link";
import { toast } from "react-toastify";
import { Card, Grid } from "@mui/material";
import useToaster from "@/hooks/useToaster";
import { camelizeName } from "@/utils/utlity";

export const handleJoinRequest = ({ group_id }) => new Promise((resolve, reject) => {
  const formdata = {
    group_id: group_id,
    type: 'join',
  }

  axiosInstance.post('/api/send-group-join-request', formdata)
    .then((res) => {
      if (res.data.status == 200) {
        resolve({ message: res.data.message })
      }
    })
    .catch(err => {
      console.log("hey errr__________", err);
      reject({ message: err?.response?.data?.message })
    })
})
const DiscoverGroup = () => {
  const [allGroups, setAllGroups] = useState([])
  const { showNotification } = useToaster()

  const fetchAllGroups = () => {
    axiosInstance.get('/api/get-all-group',)
      .then(res => {
        setAllGroups(res?.data?.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      fetchAllGroups()
    }
    return () => {
      isApiSubscribed = false
    }
  }, [])


  return (
    <div>
      <div className="container-fluid">
        <h4 className="page-header-text">Group Suggestions</h4>
        <p>
          Your Page is where people go to learn more about you. Make sure yours
          has all the information they may need
        </p>
        <hr />

        <Grid
          // className="discov-page-full-div container-fluid"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: '1fr 1fr 1fr',
              sm: '1fr 1fr',
              xm: '1fr'
            },
            gap: 2

          }}
        >
          {/* <div className="discov-page-div">
            <div className="card-heade-img">
              <Image
                className="card-img-head"
                src={DisCard}
                alt="File Upload"
                width={"100%"}
                height={"100%"}
              />
              <div className="close-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>

              <p className="card-heade-text">414 people like this Page Like</p>
            </div>
            <div className="card-text-img">
              <Image
                className="pag-logo"
                src={companyName}
                alt="File Upload"
                width={0}
                height={0}
              />

              <div className="card-pag-text">
                <h5>Demo Group</h5>
                <span className="followed-heade-text">
                  Beauty, cosmetic & personal care
                </span>
                <p>Shopping, retail</p>
              </div>
            </div>

            <div className="card-pag-button-div">
              <button className="card-pag-button">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up "
                    viewBox="0 0 16 16">
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                </span>{" "}
                Follow
              </button>
            </div>
          </div>
          <div className="discov-page-div">
            <div className="card-heade-img">
              <Image
                className="card-img-head"
                src={DisCard}
                alt="File Upload"
                width={"100%"}
                height={"100%"}
              />
              <div className="close-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
              <p className="card-heade-text">414 people like this Page Like</p>
            </div>
            <div className="card-text-img">
              <Image
                className="pag-logo"
                src={companyName}
                alt="File Upload"
                width={0}
                height={0}
              />

              <div className="card-pag-text">
                <h5>Demo Group</h5>
                <span className="followed-heade-text">
                  Beauty, cosmetic & personal care
                </span>
                <p>Shopping, retail</p>
              </div>
            </div>

            <div className="card-pag-button-div">
              <button className="card-pag-button">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up "
                    viewBox="0 0 16 16">
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                </span>{" "}
                Follow
              </button>
            </div>
          </div>
          <div className="discov-page-div">
            <div className="card-heade-img">
              <Image
                className="card-img-head"
                src={DisCard}
                alt="File Upload"
                width={"100%"}
                height={"100%"}
              />
              <div className="close-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </div>
              <p className="card-heade-text">414 people like this Page Like</p>
            </div>
            <div className="card-text-img">
              <Image
                className="pag-logo"
                src={companyName}
                alt="File Upload"
                width={0}
                height={0}
              />

              <div className="card-pag-text">
                <h5>Demo Group</h5>
                <span className="followed-heade-text">
                  Beauty, cosmetic & personal care
                </span>
                <p>Shopping, retail</p>
              </div>
            </div>

            <div className="card-pag-button-div">
              <button className="card-pag-button">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up "
                    viewBox="0 0 16 16">
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                </span>{" "}
                Follow
              </button>
            </div>
          </div> */}
          {
            allGroups?.map(group => <Card sx={{ p: 1 }}
            // className="discov-page-div"

            >
              <div className="card-heade-img">
                {/* <Image
                  className="card-img-head"
                  src={`${host}/uploads/group/${group?.group_cover_pic}`}
                  alt="File Upload"
                  width={100}
                  height={100}
                /> */}
                <img
                  className="card-img-head"
                  src={group?.group_cover_pic ? `${host}/uploads/group/${group?.group_cover_pic}` : "/no_image.jpg"}
                  alt="File Upload"
                  width={100}
                  height={100}
                />
                <div className="close-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
                <p className="card-heade-text">
                  {group?.joinedGroupsCount} people joined this group
                </p>
              </div>
              <div className="card-text-img">
                {/* <Image
                  className="pag-logo"
                  src={''}
                  alt="File Upload"
                  width={0}
                  height={0}
                /> */}
                <div className="main-photo-container">
                  <div class="letter-container">
                    <div class="letter">{group?.group_name[0]?.toUpperCase()}</div>
                  </div>
                </div>

                <div className="card-pag-text">
                  <Link href={`/groupsinglePreview/${group?._id}`}> <h5>{camelizeName(group?.group_name)}</h5></Link>
                  <span className="group-privacy-text">
                    {camelizeName(group?.group_privacy)}
                  </span>
                  <p style={{
                    whiteSpace: 'pre-line',
                    overflowWrap: 'break-word',
                    display: 'flex',
                    fontSize: '0.6rem',
                    color: 'gray',
                    marginTop: '10px',
                    fontFamily: 'Poppins'

                  }} >{group?.group_description?.slice(0, 25)}</p>
                </div>
              </div>

              <div className="card-pag-button-div">
                <button
                  className="card-pag-button"
                  onClick={() => {
                    handleJoinRequest({ group_id: group?._id })
                      .then(res => {
                        showNotification(res?.message)
                        fetchAllGroups()
                      })
                      .catch(err => showNotification(err?.message, 'error'))
                  }}
                >
                  Join
                </button>
              </div>
            </Card>
            )
          }

        </Grid>
      </div>
    </div >
  );
};

export default DiscoverGroup;
