const { Turnkey } = require("@turnkey/sdk-server");
require("dotenv").config();

const turnkey = new Turnkey({
    apiBaseUrl: "https://api.turnkey.com",
    apiPrivateKey: "0af8f76e98e9365e948e2bc0e04b71c83a4d95d5469cecdabcd228ddbd66745e",
    apiPublicKey: "02dd9931b147f71bde07c4c8901b8a17804babac13e2d57dc41e32e52717d99297",
    defaultOrganizationId: "ceddd4dd-272e-4e38-bd79-40401694ccef",
});

const apiClient = turnkey.apiClient();

const createOrganization = async (req, res) => {
    try {
        const subOrganizationResponse = await apiClient.createSubOrganization(
            req.body.organizationBody
        );
        res.status(200).json({success: true,data: subOrganizationResponse,message: "Works",statusCode: 200
        });
    } catch (error) {
        console.log('Turnkey error:', error.message);
        res.status(500).json({success: false,data: null,message: error.message,statusCode: 500
        });
    }
};

module.exports = { createOrganization };

