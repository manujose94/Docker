
 var hostname = "http://0.0.0.0:"
 var port = "8000"
 var root=hostname+port;
 var types_test_ros ={ getinfo: "info" /** get string of Ros obj message */ ,getmessage: "message"/* get obj message of ros lib **/ }
 var urls_get = { 
  start: root+"/startcommands/ssh/", start_commands: root+"/startcommands/local/",
  mytopics: root+"/ros/mytopics", ros: root+"/ros",models: root+"/bd/models",
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
 
 /**fetch('http://localhost:1860/ros/mytopics')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  }).catch( (error)=> {
    console.log(error);
  })
**/
/**
 *  ? Kind of tests
 */
function getURLtoTest(type){
  let url;
  if (type == "python") url = urls_get.start_test_launch ; // Tipo de Test con Python
  else if(type == "pythoncommands") url = urls_get.start_test_launch_command ; // Tipo de Test con Python
  else if (type == "topic") url = urls_get.start_test_info ; // Tipo Test con Topics ROS
  else if (type == "commands") url = urls_get.start; // Tipo test con commands (Si no se especifica nada en type serán commands)
  else console.assert(false, "test type not available");
  return url;
}

  async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
     
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  async function postData(url = root+'/ros/mytopics', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  //ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}"      | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1
  //cat /sys/class/net/$(ip route show default | awk '/default/ {print $5}')/address
 //cat /etc/*-release | grep DESCRIPTION


    export { getData, urls_get, postData, urls_post, getURLtoTest };
