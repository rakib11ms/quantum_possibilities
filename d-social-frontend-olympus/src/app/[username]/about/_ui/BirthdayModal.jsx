import React from 'react';
import "./BirthdayModal.css";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";

function BirthdayModal({ setIsOpenModal, getUserInfo, birthday }) {
    const [month, setMonth] = React.useState(new Date(birthday).toLocaleString('default', { month: 'long' }));
    const [day, setDay] = React.useState(new Date(birthday).getDate());
    const [year, setYear] = React.useState(new Date(birthday).getFullYear());

    const handleMonthChange = (event) => {
        setMonth(event.target.value)
    }

    const handleDayChange = (event) => {
        setDay(event.target.value)
    }

    const handleYearChange = (event) => {
        setYear(event.target.value)
    }

    const handleCancel = () => {
        setMonth("")
        setDay("")
        setYear("")
        setIsOpenModal({ "birthday": false })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let birthday = `${day}/${month}/${year}`;
        birthday = new Date(birthday)

        axiosInstance.patch(`${host}/api/update-user-birthday/`, {
            birth_date: birthday
        }).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                setMonth("")
                setDay("")
                setYear("")
                setIsOpenModal({ "birthday": false })
                getUserInfo()
            }
        });
    }

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(
                <MenuItem value={i}>{i}</MenuItem>
            );
        }
        return options;
    };
    return (
        <div className='tas_birthday_modal_wrapper'>
            <p className='tas_birthday_modal_title'>Edit your birthday</p>
            <div className='tas_birthday_modal_details_container'>
                <p className='tas_birthday_modal_details'>This birthday is used for the accounts and profiles in this Accounts Center. Any changes you make will apply to all of them.</p>
            </div>
            <div>
                <Box className="mt-4" sx={{ width: "100%", display: 'flex', flexDirection: "row" }} >
                    <FormControl sx={{ width: "100%", height: 50, display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                        <Select
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300, // Adjust the maxHeight as needed
                                    },
                                },
                            }}
                            value={month}
                            onChange={handleMonthChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ width: 130, height: 50 }}
                        >
                            <MenuItem value={""}>Month</MenuItem>
                            <MenuItem value={"January"}>January</MenuItem>
                            <MenuItem value={"February"}>February</MenuItem>
                            <MenuItem value={"March"}>March</MenuItem>
                            <MenuItem value={"April"}>April</MenuItem>
                            <MenuItem value={"May"}>May</MenuItem>
                            <MenuItem value={"June"}>June</MenuItem>
                            <MenuItem value={"July"}>July</MenuItem>
                            <MenuItem value={"August"}>August</MenuItem>
                            <MenuItem value={"September"}>September</MenuItem>
                            <MenuItem value={"October"}>October</MenuItem>
                            <MenuItem value={"November"}>November</MenuItem>
                            <MenuItem value={"December"}>December</MenuItem>
                        </Select>
                        <Select
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300, // Adjust the maxHeight as needed
                                    },
                                },
                            }}
                            value={day}
                            onChange={handleDayChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ width: 130, height: 50 }}
                        >
                            <MenuItem value="">Day</MenuItem>
                            {generateOptions(1, 31)}
                        </Select>
                        <Select
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300, // Adjust the maxHeight as needed
                                    },
                                },
                            }}
                            value={year}
                            onChange={handleYearChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ width: 130, height: 50 }}
                        >
                            <MenuItem value={""}>Year</MenuItem>
                            {generateOptions(1900, 2024)}
                        </Select>
                    </FormControl>
                </Box>
                <div className="">
                    <div className="tas_brithday_container mt-4">
                        <input type="submit" onClick={handleSubmit} className="tas_form_bithday_submit_btn" value="Continue" />
                        <input type="submit" onClick={handleCancel} className="tas_form_birthday_cancle_btn" value="Cancel" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BirthdayModal;