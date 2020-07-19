var hostname = process.env.HOST || 'http://'+'0.0.0.0'
var port = process.env.PORT  || 8080
var root=hostname+':'+port;
var types_test_ros ={ getinfo: "info" /** get string of Ros obj message */ ,getmessage: "message"/* get obj message of ros lib **/ }
var urls_get = { 
    start: root+"/startcommands/ssh/", start_commands: root+"/startcommands/local/",
    mytopics: root+"/ros/mytopics", ros: root+"/ros",models: root+"/bd/models",
    translatetopic: root+'/bd/translatetopic',
    mytest_withoutmodel: root+"/bd/testmachine",
    mytestreadymoreinfo: root+"/bd/testsready/moreinfo",
    mytestreadymoreinfolast: root+"/bd/testsready/moreinfolast",
    myuntis_robot: root+'/bd/robotunits',
    mymodels_robot: root+'/bd/robotmodels',
    myuntis_from_robot: root+'/bd/robotmodels/:id',
    start_test_info: root+'/startros/'+types_test_ros.getinfo,
    start_test_launch: root+'/startlaunch/ros',
    start_test_launch_command: root+'/startlaunch/commands'
};
var urls_post = { start_test: root+"/start/"}

module.exports = urls_get;