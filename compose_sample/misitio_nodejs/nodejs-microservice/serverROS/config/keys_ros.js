var argv = require('minimist')(process.argv.slice(2));

//? node server.js --host_ros_master=192.168.1.87 --port_ros_master=9091
module.exports = {
  
    ros_url: {

        host: argv.host_ros_master ||'localhost',
        port: argv.port_ros_master || '9090',
        ws: 'ws://'+(argv.host_ros_master ||'localhost')+':'+(argv.port_ros_master || '9090')
        
    }

};