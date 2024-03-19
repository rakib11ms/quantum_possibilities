"use cl"
import React, { useState } from 'react';
import fileupSVG from "../../../public/fileup.svg"
import Image from 'next/image';
import NewsfeedReels from '../newsfeedreels/NewsfeedReels';

const MobileStorieReels = () => {

     // Mobile 
  const [activediv, setactivediv] = useState('Story'); // State to manage active tab

  const handleTabClick = (tab) => {
    setactivediv(tab); // Set the active tab when clicked
  };
    return (
        <div>
            <div>
            <div className="mobile-tabs-stories-reels">
                    <span
                      className={`tab ${activediv === 'Story' ? 'active-tab-mobile' : ''}`}
                      onClick={() => handleTabClick('Story')}
                    >
                      Stores
                    </span>
                    <span
                      className={`tab ${activediv === 'Reels' ? 'active-tab-mobile' : ''}`}
                      onClick={() => handleTabClick('Reels')}
                    >
                      Reels
                    </span>
                 
            </div>

            <div className="content-stories-reels ">
                    {activediv === 'Story' && (
                      <div>
                        <NewsfeedReels/>
                      </div>
                    )}
                    {activediv === 'Reels' && (
                    <div>
                    <NewsfeedReels/>
                  </div>
                    )}
                   
                

                </div>
            </div>
        </div>
    );
}

export default MobileStorieReels;






// import React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import NewsfeedReels from '../newsfeedreels/NewsfeedReels';

// const MobileStorieReels = () => {
//     const [value, setValue] = React.useState('1');

//     const handleChange = (event, newValue) => {
//       setValue(newValue);
//     };
  


//     return (
//         <div>
//  <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList   sx={{
//     "& .MuiTab-textColorSecondary": {
//       color: 'secondary', // Change text color to secondary
//     },
//     "& .MuiTab-indicator": {
//       backgroundColor: 'red', // Change indicator color
//     },
//   }} onChange={handleChange} aria-label="lab API tabs example">
//             <Tab  label="Stories" value="1" />
//             <Tab label="Reels" value="2" />
          
//           </TabList>
//         </Box>
//         <TabPanel value="1">
//             <NewsfeedReels/>
//         </TabPanel>
//         <TabPanel value="2">     <NewsfeedReels/></TabPanel>
//       </TabContext>
//     </Box>

//         </div>
//     );
// }

// export default MobileStorieReels;



