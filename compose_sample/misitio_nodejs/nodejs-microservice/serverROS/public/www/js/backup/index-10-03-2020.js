
import { getData, urls_get, postData, urls_post, getURLtoTest } from './lib/routes/links.js';

var array_test = [];
window.current_test = null;
/**
 * * Not use 08/04/2020
getData(urls_get.mytopics)
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
    mlistTopics(data[0], data[1])
  });
**/
getData(urls_get.ros)
  .then((objRos) => {
    onChangeStatus(objRos);
  });

getData(urls_get.models)
  .then((array) => {
    mlistTests(array)
    /** postData(urls_post.start_test+obj[0].id,obj).then((obj2) => {
       console.log("resultado post",obj2)
     });**/
  });
  getData(urls_get.mytestreadymoreinfolast)
  .then((array) => {
    mlistTestsReady(array)
   
  });

 var mIntervalTestReady= setInterval(function() {
  getData(urls_get.mytestreadymoreinfolast)
  .then((array) => {
    mlistTestsReady(array)
   
  })
  }, 3000);

/**
 * * Not use 08/04/2020
 * getData(urls_get.mytest_withoutmodel)
  .then((tests) => {
    mlistTests2(tests); // JSON data parsed by `response.json()` call
  });
**/

function onChangeStatus(objRos) {
  let status = document.getElementById("status")
  console.log("objRos::", objRos.status)
  if (objRos.status == "disconnected" || objRos.status == "error") {
    status.className = "alert alert-warning";
    status.innerHTML = '<strong>Error!</strong> Error con la comunicacion con Websocket ROS(Rosbridge)';
  } else {
    status.className = "alert alert-success";
    status.innerHTML = '<strong>Success!</strong> Exito con la comunicacion con Websocket ROS(Rosbridge)';
  }
  let status2 = document.getElementById("status2")

  if (objRos.optitrack.status != "disconnected") {
    status2.className = "alert alert-success";
    status2.innerHTML = '<strong>Success!</strong> Exito con la comunicacion con Optitrack';
  } else {
    status2.className = "alert alert-warning";
    status2.innerHTML = '<strong>Error!</strong> Error con la comunicacion con Optitrack';
  }
}

function isFindOptitrack(result) {
  var status = document.getElementById("status2")
  if (result) {
    status.className = "alert alert-success";
    status.innerHTML = '<i class="fa fa-camera"></i><strong>Success!</strong> Exito con la comunicacion OptiTrack';
  } else {
    status.className = "alert alert-warning";
    status.innerHTML = '<i class="fa fa-camera"></i><strong>Error!</strong> Error con la comunicacion con OptiTrack';
  }
}


window.onload = function () {
  this.console.log("Ventana cargada")
  //document.getElementById('modal_start_button').addEventListener('click', onStartTest, true);

}
document.addEventListener('build', function (e) {
  // e.target matches document from above
  console.log("[main customEvent]", e)

}, false);

/**
 * * List of models and unit_robot
 *  ! The last array elemnt contains a commands array (empty if there aren't commands)
 */
function mlistTests(array) {
  array_test = array;
  var ol = document.querySelector("#list_test");
  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    /**
     * Bold
     */
    let bold = document.createElement('strong')
    let textnode = document.createTextNode(array[i].test_name); 
    bold.appendChild(textnode); 
    li.appendChild(bold);li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode(array[i].test_description + " ["+array[i].model_name+"]"));
    li.className = "tm-list-group-item";
    li.setAttribute("id", array[i].model_id); // added line
    li.setAttribute("test_id", array[i].test_id); // added line
    li.setAttribute("array_position", i);
    ol.appendChild(li);
    //console.table( array[i])
  }
  //Añadir listener a cada uno NUEVO GENERADO
  var listItems = document.querySelectorAll("#list_test li");
  listItems.forEach(function (item) {
    item.onclick = function (e) {
      console.log(this.attributes); // this returns clicked li's value        
      /**
       * ? Posicion donde se encuentra el modelo seleccionado en el Array Global (omdex-js)
       */
      let pos = this.attributes.array_position.value;

      if (pos > array_test.length) return;

      let model = array_test[this.attributes.array_position.value]
      window.current_test=model;
      let { type, model_id, test_name, model_name, ip, unit_name, test_description, test_comment, test_id } = model;

      console.table(model);
      document.getElementById("modal_title").innerHTML = " Iniciar Test " + test_name + " " + ip;
      document.getElementById("modal_name").innerHTML = model_name;
      document.getElementById("modal_unit_name").innerHTML = unit_name;
      document.getElementById("modal_info").innerHTML = test_description + "<br>" + test_comment + "";
      document.getElementById("modal_start_button").value = pos;
      /**
       * ! Se tiene que intentar meter model.id y model.model_id (params to url) or post with content into body
       */

      $("#modal_start_button").attr('model_id', model_id);
      $("#modal_start_button").attr('test_id', test_id/** model.id = test.id */);
      $("#modal_start_button").attr('type', type);

      $("#modal_start_button").click(() => {
        /**
         * * Habilitar snipper 
         */
        $('#modal_start_button').html("<i class='spinner-border spinner-border-sm'></i> Test lanzandose...");
        /**
         * ? To do Test - model_id - test_id - type
         */
        onStartTest($('#modal_start_button').attr('model_id'), $('#modal_start_button').attr('test_id'), $('#modal_start_button').attr('type'));

      });

      $('#modalStartTest').modal();

    }
  });

}

function mlistTestsReady(array) {
  //console.log(array)
  var ol = document.querySelector("#list_test_ready");
  if (ol) { while (ol.firstChild) { ol.removeChild(ol.firstChild); } }
  //document.getElementById("list_test_ready").innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    let bold = document.createElement('strong');
    let textnode = document.createTextNode(array[i].test_name); 
    bold.appendChild(textnode); 
    
    let result= array[i].result==1? "Exitoso":"Fallido"
    /** Formato Fecha YYYY/mm/dd hh:m:sec*/
    let end_date = array[i].end_date.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    li.appendChild(bold);li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode(end_date+" "+result));
    li.className = "tm-list-group-item";
    li.setAttribute("id", array[i].id);
    li.setAttribute("array_position", i);
    ol.appendChild(li);
  }
  //Añadir listener a cada uno NUEVO GENERADO
  var listItems = document.querySelectorAll("#list_test_ready li");
  listItems.forEach(function (item) {
    item.onclick = function (e) {
     
      let {test_name,model_name,init_date,end_date} = array[this.attributes.array_position.value]
      let finit_date = init_date.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
      let fend_date = end_date.toString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
      document.getElementById("modal_title").innerHTML = " Test " + test_name;
      document.getElementById("modal_name").innerHTML = model_name;
      document.getElementById("modal_info").innerHTML = finit_date + "<br>" + fend_date + "";
      $("#modal_start_button").hide();
      $("#modal_start_button").attr('value', url);
    
      /**
       * ! Este modal deberá ser cambiado
       */

      $('#modalStartTest').modal();

    }
  });

}


function mlistTests2(array) {
  console.log(array)
  var ol = document.querySelector("#list_test_without_model");
  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    console.table(array[i])
    li.appendChild(document.createTextNode(array[i].test_name + " :: " + array[i].type));
    li.className = "tm-list-group-item";
    li.setAttribute("id", array[i].test_id);
    li.setAttribute("array_position", i);
    ol.appendChild(li);
  }
  //Añadir listener a cada uno NUEVO GENERADO
  var listItems = document.querySelectorAll("#list_test_without_model li");
  listItems.forEach(function (item) {
    item.onclick = function (e) {
      console.log(this.attributes); // this returns clicked li's value        
      let {test_name,test_comment,test_description} = array[this.attributes.array_position.value]

      document.getElementById("modal_title").innerHTML = " Iniciar Test " + test_name;
      document.getElementById("modal_name").innerHTML = test_name;
      document.getElementById("modal_info").innerHTML = test_description + "<br>" + test_comment + "";

      /**
       * ! Se tiene que intentar meter model.id y model.model_id (params to url) or post with content into body
       */
      let params = new URLSearchParams();
      //Add a third parameter.
      params.set('com1', 'lsb_release -a');
      params.set('com2', 'uname -a');
      params.set('com3', 'rosversion -d');

      let url = urls_get.start_commands + '?' + params.toString();
      console.info({ url })
      $("#modal_start_button").attr('value', url);
      $("#modal_start_button").off().click(function () {
        /**
         * * Habilitar snipper 
         */
        $('#modal_start_button').html("<i class='spinner-border spinner-border-sm'></i> Test lanzandose...");
        onStartTest2($('#modal_start_button').val());
      });

      $('#modalStartTest').modal();

    }
  });

}


function onStartTest(model_id, test_id, type) { 
  /**
   * * Pasar por params model_id, test_id, type
   */
  console.info({ model_id, test_id, type });
  console.table({current_test});

  if(!model_id || !test_id){ console.assert(false, "model_id or tes_id is null"); mSetResultInModal(false, "Error model or test not available");}
  
  let url = getURLtoTest(type);
  if(!url)mSetResultInModal(false, "Error Test Type not available");
  // ADD PARAMS
  let params = new URLSearchParams();
  params.set('model_id', model_id); //nombre del param como el que existe como nombre de col en la bd.
  params.set('test_id', test_id);
  params.set('type', type);
  params.set('username', current_test.username);
  params.set('password', current_test.password);
  params.set('ip', current_test.ip);
  
  url=url+'?' + params.toString()
  /**if (type == "python") url = urls_get.start_test_launch + '?' + params.toString(); // Tipo de Test con Python
  else if(type == "python") url = urls_get.start_test_launch + '?' + params.toString(); // Tipo de Test con Python
  else if (type == "topic") url = urls_get.start_test_info + '?' + params.toString(); // Tipo Test con Topics ROS
  else if (type == "commands") url = urls_get.start+'?' + params.toString(); // Tipo test con commands (Si no se especifica nada en type serán commands)
  else { console.assert(false, "test type not available"); mSetResultInModal(false, "Error Test Type not available"); }**/

  console.log("[onStartTest]", { url })
  getData(url)
    .then((data) => {
      if (!data) return
      if (data == "") return;
      let { message, succes } = data;
      let innerHTML
      if (!succes)
        innerHTML = 
          '<strong>Problema!</strong> ' + "Timeout to connect with robot model:" + model_id + '<p>' + message + '</p>';
      else
        innerHTML = 
          '<strong>Exito!</strong> ' + message;
      mSetResultInModal(succes,innerHTML);
      
    });
}

/**
 * 
 * @param {urtl with commands params} url 
 */
function onStartTest2(url) {
  getData(url)
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
      let { message, succes } = data;

      let innerHTML;
      if (!succes)
       innerHTML = 
          '<strong>Problema!</strong> ' + message;
      else innerHTML = 
            '<strong>Exito!</strong> ' + message;
      mSetResultInModal(succes,innerHTML);
    });
}





function mlistTopics(array, array2) {
  if (!array || !array2) return;
  var ol = document.querySelector("#list_subs");
  var searched = false;
  for (let i = 0; i < array.length; i++) {
    if (!searched)
      searched = array[i].includes("vrpn");

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(+array[i]));
    li.innerHTML = '<a href="#" class="list-group-item"><i class="fas fa-check-square"></i>  ' + array[i] + '</a>'
    //To get later = li.attributes.id
    li.setAttribute("id", array[i]); // added line
    li.setAttribute("type", array2[i]); // added line
    ol.appendChild(li);
  }
  //Añadir listener a cada uno NUEVO GENERADO
  var listItems = document.querySelectorAll("#list_subs li");
  listItems.forEach(function (item) {
    item.onclick = function (e) {
      console.log(this.attributes); // this returns clicked li's value
      $("#input_type").val(this.attributes.type.value);
      $("#input_name").val(this.attributes.id.value);
    }
  });

  console.log('search', searched)
  isFindOptitrack(searched);


  //Añadir listener a cada uno NUEVO GENERADO
  var listItems = document.querySelectorAll("#list_subs li");
  listItems.forEach(function (item) {
    item.onclick = function (e) {
      console.log(this.attributes); // this returns clicked li's value
      $("#input_type").val(this.attributes.type.value);
      $("#input_name").val(this.attributes.id.value);
    }
  });

}
function deletelist() {
  var ol = document.querySelector("#list_subs");
  var child = ol.lastElementChild;
  while (child) {
    ol.removeChild(child);
    child = ol.lastElementChild;
  }
}


function mSetResultInModal(succes, innerHTML) {
  let modal_result = document.getElementById("modal_result")

  if (!succes) {
    modal_result.className = "alert alert-danger";
    modal_result.innerHTML = innerHTML;
  } else {
    modal_result.className = "alert alert-success";
    modal_result.innerHTML = innerHTML;
  }
  /**
  * * DesHabilitar snipper 
  */
  $('#modal_start_button').html("Start test"); //Pone de nuevo como contenido el texto anterior
}


//Establecer datos de un topic en los inputs
//Solo funciona si esta creado en el HML
$('#list_subs li').click(function () {
  var textLoaded = 'Loading element with id='
    + $(this).data('id');
  console.log(textLoaded)
  //document.getElementById("mytext").value = "My value";
});
