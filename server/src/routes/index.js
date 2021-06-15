const AuthRouter = require('./auth')
const RoomRouter = require('./room')


function route(app){

        app.use('/api/auth',AuthRouter);
        app.use('/api/rooms',RoomRouter);
        // app.get('/',(rq,res)=>res.send('home'))
        
}

module.exports=route;