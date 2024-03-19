const Friends = require('../models/Friends');


const getToDayBirthday = async (req, res) => {
    try {
        const userId = req.userId;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), 0, 21, 0, 0, 0, 0); // January 21
        const endOfDay = new Date(today.getFullYear(), 0, 21, 23, 59, 59, 999); // January 21


        const friendlist = await Friends.find({
            accept_reject_status: "1",
            $or: [
                { connected_user_id: userId },
                { user_id: userId }
            ]
        })
            .populate('user_id', '_id first_name last_name username profile_pic gender date_of_birth')
            .populate('connected_user_id', '_id first_name last_name username profile_pic gender date_of_birth')
            .sort({ _id: -1 });
        //   return res.json({
        //         status: 200,
        //         message: "Birthday List Found",
        //         results: friendlist
        //     });
        // Filter the results to include only those with a birthday matching today
        const filteredResults = friendlist.filter(item => {
            const userBirthday = new Date(item.user_id.date_of_birth);
            const connectedUserBirthday = new Date(item.connected_user_id.date_of_birth);

            // if (userId.toString() !== item.user_id._id.toString()) {

            //     console.log(item.user_id.first_name, ' ', item.user_id.date_of_birth,' ',userBirthday.getDate(), "   ", userBirthday.getMonth(), " today__",today.getMonth(),'  ',today.getDate(), userBirthday.getDate(),);
            // }
            // else console.log(item.connected_user_id.first_name, item.connected_user_id.date_of_birth,' ',connectedUserBirthday.getDate(), "   ", connectedUserBirthday.getMonth(), "today__",today.getMonth(),' ',today.getDate(), connectedUserBirthday.getDate(),);

            // const userMatch = userBirthday.getMonth() == today.getMonth() && userBirthday.getDate() == today.getDate() && item.user_id._id != userId;
            
            if (userId.toString() !== item.user_id._id.toString()) return userBirthday.getMonth() == today.getMonth() && userBirthday.getDate() == today.getDate()

            else return connectedUserBirthday.getMonth() == today.getMonth() && connectedUserBirthday.getDate() == today.getDate()
            

        });


        res.json({
            status: 200,
            message: "Birthday List Found",
            results: filteredResults
        });
    } catch (err) {
        res.json({
            status: 400,
            message: err.message
        });
    }
}




module.exports = { getToDayBirthday }