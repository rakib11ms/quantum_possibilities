const multer = require('multer');
const Location = require('../../models/settings/Location');
const { validationResult } = require('express-validator');
const { utils, readFile } = require('xlsx');
// change pro pic codes functionality
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/location");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },

    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    //   },
});

const uploadLocationFile = multer({ storage: storage });

const createLocation = async (req, res) => {
    const { location } = req.file;
    console.log(req.file);
    try {

        const workbook = await readFile(req.file.path);

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const range = utils.decode_range(worksheet['!ref']);

        const container = []
        for (let row = range.s.r; row <= range.e.r; row++) {

            const temp = {};
            if (row !== 0) {

                for (let col = range.s.c; col <= range.e.c; col++) {

                    const columnLetter = utils.encode_col(col);

                    const key = worksheet[`${columnLetter}1`].v
                    const value = worksheet[`${columnLetter}${row + 1}`]?.v

                    if(key == 'city_ascii'){
                        temp['location_name']= value
                        temp['city']= value
                    }
                    if(key == 'lat'){
                        temp['lat']= value
                       
                    }
                    if(key == 'lng'){
                        temp['lng']= value
                       
                    }
                    if(key == 'country'){
                        temp['country']= value
                       
                    }
                    if(key == 'iso3'){
                        temp['country_code']= value
                       
                    }

                }
                container.push(temp)
            }
        }
        console.log(container);
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        // const location = new Location({ location_name });
        // await location.save();

        await Location.insertMany(container)
        
        return res.json({
            status: 200,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}
const searchLocation = async (req, res) => {

    try {
        const searchTerm = req.body.searchTerm;
        let allLocation = {}
        if (searchTerm == "") {
            allLocation = await Location.find({});
        } else {
            console.log(searchTerm);
            allLocation = await Location.find({ location_name: { $regex: searchTerm, $options: 'i' } });
        }

        return res.json({
            status: 200,
            allLocation: allLocation
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}
const listLocation = async (req, res) => {

    try {
        const file = e.target.files[0];

        // 1. create url from the file
        const fileUrl = URL.createObjectURL(file);

        // 2. use fetch API to read the file
        const response = await fetch(fileUrl);
        console.log("response__", response);
        // 3. get the text from the response
        const text = await response.text();
        console.log(text);
        // 4. split the text by newline
        const lines = text.split("\n");
        console.log({ lines });
        // 5. map through all the lines and split each line by comma.
        const _data = lines.map((line) => line.split(","));


        return res.json({
            status: 200,
            allLocation: allLocation
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}
module.exports = { createLocation, searchLocation, listLocation, uploadLocationFile }