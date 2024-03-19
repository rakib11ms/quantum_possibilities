import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

function Hobbies() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [hobbiesData, setHobbiesData] = useState([]);

  console.log('selected hobbies', selectedHobbies)
  console.log(' hobbies', hobbiesData)

  // Function to add or remove a hobby/interest to/from the selected list
  const toggleSelectedHobby = (hobby) => {
    const isHobbySelected = selectedHobbies.some((h) => h._id === hobby._id);

    if (isHobbySelected) {
      // If the hobby is already selected, remove it
      const updatedSelectedHobbies = selectedHobbies.filter(
        (h) => h._id !== hobby._id
      );

      setSelectedHobbies(updatedSelectedHobbies);
    } else {
      // If the hobby is not selected, add it
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  function fetchAllHobbies() {
    axiosInstance.get("/api/hobbies").then((res) => {
      if (res.data.status == 200) {
        setHobbiesData(res.data.allHobbies);
      }
    });
  }

  function fetchUserHobbies() {
    axiosInstance.get("/api/get-user-specific-hobbies").then((res) => {
     
      if (res.data.status == 200) {
        const newHobbies = res.data.userHobbies.map((myhobby) => myhobby.hobbies_id);

        setSelectedHobbies((prevSelectedHobbies) => {
          const deduplicatedHobbies = [...new Set([...prevSelectedHobbies, ...newHobbies])];
          return deduplicatedHobbies;
        });
      }
    });

  }

  const [user_id, setUser_id] = useState('')

  useEffect(() => {
    fetchAllHobbies();
    fetchUserHobbies();
    if (typeof window !== "undefined") {
      const user_id = JSON.parse(localStorage.getItem('userInfo'))[0]._id;
      setUser_id(user_id)

    }
  }, []);



  const handleHobbies = () => {
    const userData = {
      user_id: user_id
    }
    axiosInstance
      .post("api/delete-user-hobbies", userData)
      .then((res) => {
        if (res.data.status == 200) {
          selectedHobbies.map((selectedHobby) => {
            const data = {
              hobbies_id: selectedHobby._id,
              user_id: user_id
            }
            axiosInstance
              .post("api/save-user-hobbies", data)
              .then((res) => {

              })
          }

          );
        }
      });


    toast.success("Hobbies updated successfully", {
      position: "top-right",
      style: {
        background: "white",
        color: "black",
      },
    });

  };
  return (
    <div className="hobbies-and-interests-container">
      <div className="tag-clouds">
        {selectedHobbies.map((selectedHobby) => (
          <li key={selectedHobby.id} className="">
            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-hash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
                        </svg> */}

            <p className="selected-hobby-text">
              # {selectedHobby.hobbies_name}
            </p>
          </li>
        ))}
      </div>

      <div className="hobbies-interests-list">
        {hobbiesData.map((item) => (
          <div key={item._id} className="hobby-interest-item">
            <p className="hobby-interest-text"># {item.hobbies_name}</p>
            <input
              onClick={() => toggleSelectedHobby(item)}
              className="form-check-input chk-in"
              type="checkbox"
              value=""
              id={`checkbox-${item._id}`}
              checked={selectedHobbies.some((h) => h._id === item._id)}
            />
          </div>
        ))}
      </div>

      <div className="col col-lg-6 col-md-6 col-sm-12 col-12 hobbies-save-btn-div">
        <button
          type="button"
          onClick={handleHobbies}
          className="hobbies-save-btn"
        >
          Save all Changes
        </button>
      </div>
    </div>
  );
}

export default Hobbies;
