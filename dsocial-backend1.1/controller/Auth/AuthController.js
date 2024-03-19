const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');

const {website_url}=require("../../config")
// Generate an access token
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
}

// Generate a refresh token
function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '7d' });
}

// Generate a password reset token
const generatePasswordResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};


const register = async (req, res) => {
    const { first_name, last_name, email, password, phone, gender, day, month, year } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: 404, errors: errors.array() });
        }

        const duplicate_check = await User.findOne({ email: email });

        if (duplicate_check) {
            return res.json({
                status: 400,
                error: 'Email is already in use'
            });
        } else {
            const date_of_birth = new Date(`${year}-${month}-${day}`);

            const hashedPassword = await bcrypt.hash(password, 10);
            const user_name = req.body.email.split('@')[0];

            const user = new User({
                first_name, last_name, email, password: hashedPassword, phone, username: user_name, gender, date_of_birth
            });

            // console.log('user',user)
            await user.save();


            return res.json({
                status: 200,
                user: user,
                message: "Registration successful"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{ msg: 'Internal Server Error' }]
        });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({ status: 400, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: 400, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ status: 400, message: 'Invalid email or password' });
        }

        const user_rel = await User.find({ email: email }).populate('gender religion').exec();


        res.cookie('auth', 'yes');

        // Generate access token and refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set the 'refreshToken' cookie as HttpOnly and secure
        res.cookie('refreshToken', 'staticValue', {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: false, // Set to true for HTTPS
            sameSite: 'strict',
            path: '/', // Adjust the path as needed
        });

        // JWT and user information as a response
        return res.json({
            status: 200,
            user: user_rel,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: 'Login successful',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

// Create a forgot password request
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // console.log("check email",email)

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ status: 400, message: 'User not found' });
        }

        const resetToken = generatePasswordResetToken();

        user.reset_password_token = resetToken;
        user.reset_password_token_expires = Date.now() + 3600000;

        await user.save();


        //nodemailer functions starts
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'moefdemo@gmail.com',
                pass: 'bllqmcxfyutlxflv',
            },
        });

        //reset email
        const resetPasswordLink = `${website_url}/resetpassword?token=${resetToken}`;
        // console.log("boom",resetPasswordLink)
        // const resetPasswordLink = `http://localhost:3000/resetpassword?token=${resetToken}`;

        const mailOptions = {
            from: 'moefdemo@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            //    html: `
            //        <html>
            //            <head>
            //                <style>
            //                    /* Your inline styles here */
            //                </style>
            //            </head>
            //            <body>
            //                <p>Hello,</p>
            //                <p>You have requested to reset your password. Click the link below to reset your password:</p>
            //                <a href="${resetPasswordLink}">Reset Password</a>
            //                <p>If you didn't request a password reset, please ignore this email.</p>
            //                <p>Thank you!</p>
            //            </body>
            //        </html>
            //    `,
            html: `<p>You have requested to reset your password. Click the link below to reset your password:</p> <a href="${resetPasswordLink}">Reset link</a>`


        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Password reset email sent: ' + info.response);
            }
        });



        return res.json({ status: 200, message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};
const checkCookie = async (req, res) => {
    const data = 'yes';

    // Set the 'myCookie' cookie
    res.cookie('auth', data);

    res.send('Cookie set successfully');


}

const logout = async (req, res) => {
    res.clearCookie('auth');
    return res.json({ status: 200, message: 'Cookie remove successfully' });

}


const resetPassword = async (req, res) => {
    const { reset_password_token, password } = req.body;

    try {
        const user = await User.findOne({ reset_password_token });

        if (!user) {
            return res.json({ status: 400, message: 'Token Expired' });
        }
        console.log(Date.now(), user.reset_password_token_expires);
        if (Date.now() <= user.reset_password_token_expires) {
            user.password = await bcrypt.hash(password, 10);
            user.reset_password_token = '';

            await user.save();
            return res.json({ status: 200, message: 'Password changed succcessfully' });
        } else {
            return res.json({ status: 400, message: 'Token Expired' });
        }




    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = { register, login, forgotPassword, resetPassword, checkCookie, logout }


