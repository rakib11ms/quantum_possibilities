const path = require('path')
const fs = require('fs')
const fsp = require('fs/promises')

const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) console.log(err);
        })
    }
}
const copyFile = (from, to) => {
    fs.copyFile(from, to, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const allocateDirectory = async (folderName) => {
    if (folderName && typeof (folderName) == 'string') {
        try {
            await fsp.readdir(folderName);
        } catch (error) {
            await fsp.mkdir(folderName);
        }
    }
}
module.exports = { deleteFile, copyFile, allocateDirectory }