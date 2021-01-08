var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harrygupta238@gmail.com',
    pass: 'harry@gupt'
  }
});


function sendMail(mailOptions, callback){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            callback({status:500,message:"failed",result:error});
        } else {
            if(info.messageId!=undefined)
            callback({status:200,message:"success",result:info});
            else
            callback({status:500,message:"failed",result:info});
        }
      });
}

module.exports={sendMail};