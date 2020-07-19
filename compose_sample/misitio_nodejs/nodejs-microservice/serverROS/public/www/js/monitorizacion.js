// NOTE: ESTE javascrip debe ser cargado debajo del js: map.js ya que muchas funciones son declaradas en map.js

import { getData, urls } from './lib/routes/links.js';
console.log(urls)
console.log(urls.mytopics)
getData(urls.mytopics)
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
//Table
var row_okey;
var selected_row;
//ROS
var new_listener;
var array_listeners = [];
// Almacenar objetos en un fichero
var textFile = null;

window.onload=function(){
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++){
        rows[i].onclick = function() {
            if(!this) return;    
            if(selected_row)selected_row.style.backgroundColor = "white";
            selected_row= this;
            row_okey=true;
            this.style.backgroundColor = "#D5E9FF";
        }      
    }
}
$(document).ready(function() {

    $("#mybody").on('click', 'tr', function () {
        if(!this) return;    
            if(selected_row)selected_row.style.backgroundColor = "white";
            selected_row= this;
            row_okey=true;
            this.style.backgroundColor = "#D5E9FF";
    });

    for (var paso = 0; paso < 5; paso++) {
      $("#topic_list").append("<li class='list-group-item'>"+paso+"</li>")
    }

    $("#option1b").click(function(){
      console.log("suscribir pulsador");
      $("#topic_list > li").remove()
      for (paso = 0; paso < 5; paso++) {
        $("#topic_list").append("<li class='list-group-item'>"+paso+"</li>")
      }
    });

    $("#option2b").click(function(){
      console.log("publicar pulsador");
      $("#topic_list > li").remove()
      for (paso = 5; paso < 10; paso++) {
        $("#topic_list").append("<li class='list-group-item'>"+paso+"</li>")
      }
    });

  });

  

/**ROS
var singleton = MySingleton.getInstance();
console.log('singleton',singleton.ros)

singleton.ros.on('connection', function() {
    console.log("Connected");
  });
  
  singleton.ros.on('error', function(error) {
    console.log( "Error");
  });
  
  singleton.ros.on('close', function() {
   console.log("Closed");
  });

  singleton.ros.getTopics(function(array) {
    download(JSON.stringify(array), 'topics_roslibjs.txt', 'text/plain');
      topics = array.topics;
      mlistTopics(topics,array.types)
  });**/


  function mlistTopics(array,array2) {
    var ol = document.querySelector("#list_robots");
    
    for (var i = 0; i < array.length; i++)
          {   
            li = document.createElement("li");
            console.log(array[i])
            li.appendChild(document.createTextNode(+array[i]));
            li.innerHTML='<a href="#" class="list-group-item"><i class="fas fa-check-square"></i>  '+array[i]+'</a>'
            //To get later = li.attributes.id
            li.setAttribute("id", array[i]); // added line
            li.setAttribute("type", array2[i]); // added line
            ol.appendChild(li);
        } 
    
        //Add listenet to each new li element
        var listItems = document.querySelectorAll("#list_robots li");
        listItems.forEach(function(item) {
          item.onclick = function(e) {
            e.preventDefault()
             // this returns clicked li's value
             $("#input_type").val(this.attributes.type.value);
             $( "#input_type" ).prop( "disabled", false );
             $("#input_name").val(this.attributes.id.value);
            $( "#input_name" ).prop( "disabled", false );
          }
        });

}
function addRobot(topicArray){
    //console.log(topicArray)
    $("#myModal").modal();
    onConnectTopic(topicArray);
}

function filloutTable(){
    if ($('#mytable tbody').length == 0) 
        $("#mytable").append('<tbody id="mybody"></tbody>');  
        $("#mytable tbody tr").remove(); 
 // Append product to the table
    for ( var i = 0; i < tagsArray.length; i ++ ) {
        $("#mytable tbody").append(
        '<tr class="w3-hover-text-green">' +
            "<td>"+tagsArray[i].userData.id+"</td>" +
            "<td>"+tagsArray[i].userData.des+"</td>" +
            "<td>"+"x:"+tagsArray[i].position.x+"  y:"+tagsArray[i].position.z+"</td>" +
            "<td>"+tagsArray[i].id+"</td>" +
        "</tr>"
        );
          
    }
}

function findObjectTable(id){ 
    var rows = document.getElementsByTagName("tr");
    console.log(rows)
    for (var i = 0; i < rows.length; i++){
        if(rows[i].cells)if(rows[i].cells.length>1){
            if(rows[i].cells[3].innerHTML==id){
                //console.log(rows[i].cells[0].innerHTML+' '+id);
                if(selected_row)selected_row.style.backgroundColor = "white";
                selected_row= rows[i];
                selected_row.style.backgroundColor = "#D5E9FF";
                i=rows.length;
            }
        }       
    }
}

//eventos del map
document.addEventListener('build', function (e) {
    // e.target matches document from above
    console.log('CustomEvent')
    console.log('tagsArray')
    filloutTable();

  }, false);


var one2,one;
  // Nueva conexion a un TOPIC
function onConnectTopic(topicArray) {
    current_topic=topicArray[0]; //[0] name - [1] messageType

      array_listeners.push( new ROSLIB.Topic({
        ros : singleton.ros,
        name : topicArray[0],
        messageType : topicArray[1]
      }))
      array_listeners[array_listeners.length-1].subscribe(function(m) { 
        var n = this.name.includes("turtle");
        property_message_name=this.name;
        if(one)console.log(m);
        one=false;
        if(n){
          if(m){
             coordinates = {
                x :  String(m.x).substring(0, 4)*100,
                z  : 0,
                y  :  String(m.y).substring(0, 4)*100,
              };
            eventSomeObject(property_message_name,coordinates); 
          }
        }else{
          var n = this.name.includes("vrpn_client_node");
          if(n){
            if(one2)console.log(m.pose);
            one2=false;
           /**document.getElementById("x3").innerHTML = String(m.pose.orientation.x).substring(0, 5);
            document.getElementById("y3").innerHTML = String(m.pose.orientation.y).substring(0, 5);
            document.getElementById("z3").innerHTML = String(m.pose.orientation.z).substring(0, 5);**/
          }
        }
    });
}

  function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

