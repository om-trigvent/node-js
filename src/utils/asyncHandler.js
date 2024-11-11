
// using promise handler
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };


// Higher functions using try catch
// const asyncHandler =(fn) =>async (request,response,next) => {
// try{
//     await fn(request,response,next)
// } catch(error){
//     response.status(error.code || 500 ).json({
//         success : false,
//         message : error.messages
//     })
//     // console.error(error)
// }
// }
