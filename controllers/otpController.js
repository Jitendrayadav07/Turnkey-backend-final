const { Turnkey } = require("@turnkey/sdk-server");
require("dotenv").config();

const turnkey = new Turnkey({
    apiBaseUrl: "https://api.turnkey.com",
    apiPrivateKey: "0af8f76e98e9365e948e2bc0e04b71c83a4d95d5469cecdabcd228ddbd66745e",
    apiPublicKey: "02dd9931b147f71bde07c4c8901b8a17804babac13e2d57dc41e32e52717d99297",
    defaultOrganizationId: "ceddd4dd-272e-4e38-bd79-40401694ccef",
});

const apiClient = turnkey.apiClient();

const emailAuth = async (req, res) => {
    try {
        const obj = {...req.body.params[0], "otpType": "OTP_TYPE_EMAIL", contact: req.body.params[0].email};
        const resp = await apiClient.initOtpAuth(obj);
        res.status(200).json({success: true,data: resp,message: "OTP initiated successfully"});
    } catch (err) {
        console.log("Turnkey error:", err.message);
        res.status(400).json({success: false,error: "Email not registered with organization",message: err.message});
    }
};

const verifyOtp = async (req, res) => {
    try{
        // otpId: string;
    // otpCode: string;
    //{otpId: "ea08a0d2-ef8e-4abb-91aa-b35f254ffcf9", otpCode: "681750",  targetPublicKey: "04afff3e2c8a5ca6129883e3a82b7d0772f42b3d8612831d6b12f812bbbbf3430665ffe47feb63b542acc7c15f1cf823acdb643551c5ccef900d6a3549289fb08a", organizationId:
    // "38ec9f70-8dbe-4bd3-8b99-953a171a329c"}
        const resp = await apiClient.otpAuth(req.body)
        res.send(resp)
    }catch(err) {
        console.log(err)
    }
};


const generateOtp = async (req, res) => {
    try{
        const obj = {...req.body.params[0], "otpType": "OTP_TYPE_EMAIL", contact: req.body.params[0].email}
        const initOtpAuthResponse = await apiClient.initOtpAuth({
            contact: obj.contact,
            otpType: process.env.OTP_TYPE_EMAIL,
            organizationId: obj.organizationId,
        });
    
        const { otpId } = initOtpAuthResponse;

    
        if (!otpId) {
          throw new Error("Expected a non-null otpId.");
        }
    
        res.status(200).send(Response.sendResponse(true, initOtpAuthResponse, "Works", 200))
  }catch(err) {
      console.log("err", err)
  }
};

module.exports = { emailAuth, verifyOtp,generateOtp };

