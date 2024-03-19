const UserLoginActivity = require('../../models/UserActivity/UserLoginActivity');

const loginActivity = async (req, res) => {
    // generateToken();
    const formData = req.body;
    console.log("Test");
    console.log(formData);
    const userLoginActivty = new UserLoginActivity();
    userLoginActivty.user_id                   = req.body.name;
    userLoginActivty.location                  = req.body.email;
    userLoginActivty.device_id                 = req.body.phone;
    userLoginActivty.userLoginActivty_role     = req.body.userLoginActivty_role;
    userLoginActivty.total_login_attempt_count = 1;
    userLoginActivty.data_status               = 1;
    userLoginActivty.ip_address                = 1;
    userLoginActivty.created_by                = 1;

    userLoginActivty.save().then((result) => {
        res.setHeader('Content-Type', 'application/json');
        data = {
            message: "User Created Successfully Done",
            status: 'success'
        }
        res.json(data);
    }).catch((err) => {
        data = {
            message: "Something went wrong",
            status: 'success',
            error: err
        }

        res.json(data);
    });


}

module.exports = {
    login
}