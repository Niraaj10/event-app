import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDI_NAME, 
    api_key: process.env.CLOUDI_API_KEY, 
    api_secret: process.env.CLOUDI_API_SECRET
});

const uploadOnCloudi = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        //file uploaded
        // console.log(res)
        // console.log("File is uploaded on cloudinary : ", res.url)

        fs.unlinkSync(localFilePath)
        return res;
 
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file when the upload is failed

        return null;
    }
}


export { uploadOnCloudi }