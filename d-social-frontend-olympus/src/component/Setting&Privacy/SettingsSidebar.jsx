import React from "react";
import "./style.css";
import BagIcon from "@/component/ManageAds/ui/icons/BagIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sideBarItemList = [
  {
    id: 1,
    title: 'Personal details',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    ),
  },
  {
    id: 2,
    title: 'Password and security',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.9101 11.1198C20.9101 16.0098 17.3601 20.5898 12.5101 21.9298C12.1801 22.0198 11.8201 22.0198 11.4901 21.9298C6.64008 20.5898 3.09009 16.0098 3.09009 11.1198V6.72978C3.09009 5.90978 3.7101 4.97979 4.4801 4.66979L10.0501 2.38982C11.3001 1.87982 12.7101 1.87982 13.9601 2.38982L19.5301 4.66979C20.2901 4.97979 20.9201 5.90978 20.9201 6.72978L20.9101 11.1198Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 12.5V15.5" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    )
  },
  {
    id: 3,
    title: 'Posts Privacy',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM5 4C4.44772 4 4 4.44772 4 5V10H20V5C20 4.44772 19.5523 4 19 4H5ZM4 12V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V12H4ZM14 13C14.2652 13 14.5196 13.1054 14.7071 13.2929L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L14 15.4142L11.7071 17.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L9.58579 17L9 16.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L8.29289 14.2929C8.48043 14.1054 8.73478 14 9 14C9.26522 14 9.51957 14.1054 9.70711 14.2929L11 15.5858L13.2929 13.2929C13.4804 13.1054 13.7348 13 14 13ZM11 7C11 6.44772 11.4477 6 12 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H12C11.4477 8 11 7.55228 11 7ZM7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z" fill="#292D32" />
    </svg>
    )
  },
  {
    id: 4,
    title: 'Stories Privacy',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 6H9C8.44772 6 8 6.44772 8 7V17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17V7C16 6.44772 15.5523 6 15 6ZM9 4C7.34315 4 6 5.34315 6 7V17C6 18.6569 7.34315 20 9 20H15C16.6569 20 18 18.6569 18 17V7C18 5.34315 16.6569 4 15 4H9Z" fill="#292D32" />
      <path d="M2 6C2 5.44772 2.44772 5 3 5C3.55228 5 4 5.44772 4 6V18C4 18.5523 3.55228 19 3 19C2.44772 19 2 18.5523 2 18V6Z" fill="#292D32" />
      <path d="M20 6C20 5.44772 20.4477 5 21 5C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19C20.4477 19 20 18.5523 20 18V6Z" fill="#292D32" />
    </svg>
    )
  },
  {
    id: 5,
    title: 'Block List',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.364 5.63604C19.9926 7.26472 21 9.51472 21 12C21 16.9706 16.9706 21 12 21C9.51472 21 7.26472 19.9926 5.63604 18.364M18.364 5.63604C16.7353 4.00736 14.4853 3 12 3C7.02944 3 3 7.02944 3 12C3 14.4853 4.00736 16.7353 5.63604 18.364M18.364 5.63604L5.63604 18.364" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    )
  },
  {
    id: 6,
    title: 'Customize Menu',
    icon: (<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18.2143H20M17 21.4286V15" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />
      <path d="M8.4 4.28564H5.6C5.17565 4.28564 4.76869 4.46626 4.46863 4.78775C4.16857 5.10924 4 5.54527 4 5.99993V8.99993C4 9.22505 4.04139 9.44797 4.12179 9.65596C4.2022 9.86395 4.32006 10.0529 4.46863 10.2121C4.6172 10.3713 4.79359 10.4976 4.98771 10.5837C5.18183 10.6699 5.38988 10.7142 5.6 10.7142H8.4C8.61011 10.7142 8.81817 10.6699 9.01229 10.5837C9.20641 10.4976 9.3828 10.3713 9.53137 10.2121C9.67994 10.0529 9.7978 9.86395 9.87821 9.65596C9.95861 9.44797 10 9.22505 10 8.99993V5.99993C10 5.54527 9.83143 5.10924 9.53137 4.78775C9.23131 4.46626 8.82435 4.28564 8.4 4.28564Z" fill="white" stroke="black" stroke-width="2" stroke-miterlimit="10" />
      <path d="M8.4 14.9999H5.6C5.17565 14.9999 4.76869 15.1805 4.46863 15.502C4.16857 15.8235 4 16.2596 4 16.7142V19.7142C4 20.1689 4.16857 20.6049 4.46863 20.9264C4.76869 21.2479 5.17565 21.4285 5.6 21.4285H8.4C8.82435 21.4285 9.23131 21.2479 9.53137 20.9264C9.83143 20.6049 10 20.1689 10 19.7142V16.7142C10 16.2596 9.83143 15.8235 9.53137 15.502C9.23131 15.1805 8.82435 14.9999 8.4 14.9999ZM18.4 4.28564H15.6C15.1757 4.28564 14.7687 4.46626 14.4686 4.78775C14.1686 5.10924 14 5.54527 14 5.99993V8.99993C14 9.45459 14.1686 9.89062 14.4686 10.2121C14.7687 10.5336 15.1757 10.7142 15.6 10.7142H18.4C18.8243 10.7142 19.2313 10.5336 19.5314 10.2121C19.8314 9.89062 20 9.45459 20 8.99993V5.99993C20 5.54527 19.8314 5.10924 19.5314 4.78775C19.2313 4.46626 18.8243 4.28564 18.4 4.28564Z" fill="black" fill-opacity="0.16" stroke="black" stroke-width="2" stroke-miterlimit="10" />
    </svg>

    )
  },
]
const SettingsSidebar = ({ setActiveDiv, activeDiv }) => {
  const router = useRouter()
  console.log("activeDiv__", activeDiv);
  return (
    <div>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title" style={{ textAlign: 'start' }}>Account settings</h6>
        </div>

        <div className="ui-block-content">
          {
            sideBarItemList.map(i => {
              if (i.id == 6) {
                return <Link href={'/customize-menu'}>
                  <div className="d-flex align-items-center">
                    <span>{i.icon}</span>
                    <p
                      tabIndex="0"
                      className="ads-sidebar-btn"
                      style={activeDiv == i.id ? { color: '#307777' } : { color: "black" }}
                    >
                      {i.title}
                    </p>
                  </div>
                </Link>
              }
              return <div onClick={() => {
                setActiveDiv(i.id)
              }}>
                <div className="d-flex align-items-center">
                  <span>{i.icon}</span>
                  <p
                    tabIndex="0"
                    className="ads-sidebar-btn"
                    style={activeDiv == i.id ? { color: '#307777' } : { color: "black" }}
                  >
                    {i.title}
                  </p>
                </div>
              </div>
            }

            )
          }

        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
