const { validateToken } = require("../services/authentication");

function checkforAuthCookie(cookieName){
    
    return(req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
            return next();
        }


       try {
         const userPayload = validateToken(tokenCookieValue)
         req.user = userPayload;
       } catch (error) {
       }

       return next();

    };
}
module.exports = {checkforAuthCookie}