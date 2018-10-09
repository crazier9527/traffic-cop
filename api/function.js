var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB();
// Update the Table name below
var tablename = process.env.TABLE_NAME;

exports.scandb = (event, context, callback) => {
    dynamodb.scan({
        TableName: tablename
    }, (err, data) => {
        callback(null, data['Items']);
    });
};

exports.insertitem = (event, context, callback) => {
    var params = {
        TableName: tablename,
        Item: {
            "payload": {
                "M": {
                    "location": {
                        "L": [{
                                "N": "-31.99388"
                            },
                            {
                                "N": "115.9108"
                            }
                        ]
                    },
                    "ssid": {
                        "M": {
                            "channel": {
                                "N": "12"
                            },
                            "rssi": {
                                "N": "-90"
                            },
                            "ssid": {
                                "S": "Sauc3"
                            }
                        }
                    }
                }
            },
            "timestamp": {
                "N": "1538917567782"
            },
            "topic": {
                "S": "hackathons/aws-devpost/gps-glover-01"
            }
        }
    };

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
};
