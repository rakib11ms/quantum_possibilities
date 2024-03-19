import { colorPicker } from '@/assets/newsfeed';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { addPostData, insertPostData } from '@/redux/features/NewsFeed/newsFeedSlice';
import { useSelector } from 'react-redux';

export default function ColorPicker({ setFormData }) {
   const [colorPickerShow, setColorPickerShow] = useState(false);
   const dispatch = useDispatch();
  
   //  console.log('addTextData__', addTextData);
   return (
      <div>
         <div className="color-picker-wrapper">
            <Image
               style={{
                  cursor: 'pointer',
                  zIndex: '20',
               }}
               onClick={() => {
                  setColorPickerShow(!colorPickerShow);
                  setFormData((prev) => ({
                     ...prev,
                     color: 'FFFFFF',
                  }));
               }}
               src={colorPicker}
               alt={'colorPicker'}
            />
            {colorPickerShow && (
               <div className="all__color__wrapper ">
                  {[
                     {
                        color: '000000',
                        name: 'black',
                     },
                     {
                        color: 'FFFFFF',
                        name: 'white',
                     },
                     {
                        color: 'FF0000',
                        name: 'red',
                     },
                     {
                        color: '00FF00',
                        name: 'green',
                     },
                     {
                        color: '0000FF',
                        name: 'blue',
                     },
                     {
                        color: 'FFFF00',
                        name: 'yellow',
                     },
                     {
                        color: '00FFFF',
                        name: 'cyan',
                     },
                     {
                        color: 'FF00FF',
                        name: 'magenta',
                     },
                     {
                        color: '',
                        name: 'No color',
                     },
                  ].map((each, index) => (
                     <div
                        key={index}
                        onClick={() => {
                           setFormData((prev) => ({
                              ...prev,
                              color: each.color,
                           }));

                           dispatch(insertPostData({ post_background_color: each.color }));
                        }}
                        onTouchStart={() => {
                           setFormData((prev) => ({
                              ...prev,
                              color: each.color,
                           }));

                           dispatch(
                              insertPostData({
                                 post_background_color: each.color == 'FFFFFF' ? '' : each.color,
                              }),
                           );
                        }}
                        style={{
                           border: '1px solid #e7e7e7',
                           backgroundColor: each.name,
                           height: '18px',
                           width: '18px',
                           cursor: 'pointer',
                           borderRadius: '4px',
                        }}
                     >
                        {each.color == '' ? 'NA' : ''}
                     </div>
                  ))}
               </div>
            )}
            {/* hidden-color-picker */}
         </div>
      </div>
   );
}
