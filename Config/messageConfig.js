const msg = {
    databaseErr: {
        status: 502,
        message: "Error occured while accessing MongoDb!"
    },
    invalidParams: {
        status: 404,
        message: "Required params are missing"
    },
    invalidUrl: {
        status: 404,
        message: "Entered URL is not found, Please enter correct URL!"
    }    
}

module.exports = msg;