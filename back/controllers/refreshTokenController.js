const jwt = require("jsonwebtoken");
const ROLES_LIST = require("../utils/roles_list");

const RefreshTokens = require("../models/RefreshToken");
const Users = require("../models/User");



// Get a new access token when it expires
// [GET] http:/localhost:3500/api/refresh
exports.refreshTokenHandler = async (req, res) => {


  // 1 - Verify Cookies
  const cookies = req.cookies?.jwt;
  // 1.A ) No cookies sent (refresh token expired or not logged)
  if ( !cookies ) {

    return res.status( 403 ).json({ 'error':'Refesh expired or user not logged. Have to login.' });

  } else {

    // 1.B) Cookies sent

    const refreshToken = cookies;

    // 2 - Verify cookie Token 
    const cookieTokenDecoded = jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET)

    if (!cookieTokenDecoded) {
 
      return res.status(403).json({ 'error': 'Invalid Token. You have to login'});
    
    } else {

      // 3 - Search cookie in DB
      try {
      
        const tokenInDb = await RefreshTokens.findOne({ where: { token: refreshToken}, include: Users })

        if (tokenInDb && (tokenInDb.user.id === cookieTokenDecoded.userId)) {
        
          
        // Create new Refresh Token
        const newRefreshToken = jwt.sign(
          { userId: tokenInDb?.userId },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }                  // < ------------------ 1 day refresh token
        );

        // Create a new access token
        const accessToken = jwt.sign(
          {
            UserInfo: {
              userId: cookieTokenDecoded?.userId,
              userRole: ROLES_LIST[ tokenInDb?.user.role ], // sends the code, not the name of role
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }                   // < ------------------ 15 minutes access token
        );

        // Update Token 

        try {
          await RefreshTokens.update(
            { token: newRefreshToken }, 
            { where: {
            token: refreshToken,
            userId: tokenInDb?.user.id}}
          )
          // Clean Old cookie
          res.clearCookie( "jwt", { httpOnly: true, sameSite: "none", secure: true } ); 
            
          // Send new refresh token via cookie
          res.cookie( "jwt", newRefreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,          // < ------------------ 1 day cookie
          })

          // Send new access token

          return res.status( 200 ).json( {
            userId: tokenInDb?.user.id,
            userRole: ROLES_LIST[tokenInDb?.user.role],
            accessToken: accessToken,
          });
        } catch (err) {
          return res.status(500).json({"error": `Error: ${err} while updating refreshtoken`});
        }

        } else {
          RefreshTokens.destroy({
            where: { userId: cookieTokenDecoded.userId },
          })
          .then(() => {
            res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
            return res.status(403).json({"error":"token not found in DB or not of a user id. Reuse Situation."})
          })
          .catch((err) => {
            return res.status(500).json({"error" : `Error ${err} while destroying refresh on reuse situation`});
          })
        }

      } catch (error) {
        return res.status(500).json({"message": `Error: ${error} while looking for token in DB`});
      }
    } 
  }
}