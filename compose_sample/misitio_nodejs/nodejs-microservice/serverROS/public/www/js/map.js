//import mqtt_client from '/client_mqtt.js'
var camera, scene, renderer;
var plane, container;
var raycaster;
var referencePointCube;
var  cube;
var objects = [];
var camera2,scene2,renderer2,axes2,cube,container2,
CANVAS_WIDTH = 200,
CANVAS_HEIGHT = 200,
MAPCANVAS_WIDTH = 600,
MAPCANVAS_HEIGHT = 400,
CAM_DISTANCE = 300;
var zoom = 1.0, inc = -0.01;
var refreshTime_dectorTag=3000;
var mInterval1,refreshIntervalId;
//Selecting
var raycaster,mouse,INTERSECTED,projector,directionVector,statsNode,clickInfo;
var textureTAG=new THREE.MeshBasicMaterial( { color: 0x00FF80});
//Ventana
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;
//Rojo: x Azul: y Verde: z
//Medidas plano
var yMaxPlanta=5000;
var xMaxPlanta=5000;

var xCol=500;
var yCol=650;
var zCol=3150;
//Door
var xDoor=2650;
var yDoor=50;
var zDoor=1300;
var yBetweenWallDoor=4430;

init_detection();
init();

var tagsArray= [];



function create_mainObjects(){
    
      {
        const door = 
            new THREE.Mesh(new THREE.BoxBufferGeometry(xDoor,zDoor,yDoor), 
            new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 1, transparent: false } ));
        door.position.set(-((xMaxPlanta/2-zDoor)-850),zDoor/2,-(yMaxPlanta/2) );
        scene.add(door);  
      }
    
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
      }
}
    

function init_detection(){

   //detect
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(), INTERSECTED;
    projector = new THREE.Projector();
    directionVector = new THREE.Vector3();
    //mouse info
    SCREEN_HEIGHT = window.innerHeight;
    SCREEN_WIDTH = window.innerWidth;

    clickInfo = {
            x: 0,
            y: 0,
            userHasClicked: false
        };
    //view stats
    statsNode = document.getElementById('stats');
    
    document.body.appendChild(statsNode);
    document.addEventListener('click', function (evt) {
        // The user has clicked; let's note this event
        // and the click's coordinates so that we can
        // react to it in the render loop
        console.log(evt)
        clickInfo.userHasClicked = true;
        clickInfo.x = evt.clientX;
        clickInfo.y = evt.clientY;
    }, false);
   
}  


function init() {
    var drawingSurface = document.getElementById( 'card' );
     

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 8000 );
    camera.position.set( 0, 1500, 4000 );
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );
    camera.lookAt( new THREE.Vector3(0, 0, 0) );
    
    var planeGeometry = new THREE.PlaneBufferGeometry( yMaxPlanta, xMaxPlanta );
    planeGeometry.rotateX( - Math.PI / 2 );
    var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.5 } );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add( plane );
    var helper = new THREE.GridHelper( yMaxPlanta, 50 );
    helper.position.y = 0;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add( helper );
    //Plane
    //NOTHING
   
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( $(drawingSurface).width(), MAPCANVAS_HEIGHT);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    drawingSurface.appendChild( renderer.domElement );
    //document.body.appendChild( renderer.domElement );


    //Cube
    var boxCube = new THREE.BoxBufferGeometry( 300, 300, 300 ); // x z y
    referencePointCube = new THREE.Mesh( boxCube, new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.6, transparent: true } ) );
    scene.add( referencePointCube );
    

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.target.copy(cube.position);
    controls.mouseButtons = {
	    LEFT: THREE.MOUSE.RIGHT,
	    MIDDLE: THREE.MOUSE.MIDDLE,
	    RIGHT: THREE.MOUSE.LEFT
    }


    /*document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'keydown', onDocumentKeyDown, false );
    document.addEventListener( 'keyup', onDocumentKeyUp, false ); **/
    //
    window.addEventListener( 'resize', onWindowResize, true );
    document.addEventListener( 'mousemove', onMouseMove, false );
// -----------------------------------------------

    // dom
    container2 = document.getElementById('inset');

    // renderer
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor( 0xf0f0f0, 4 );
    renderer2.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    container2.appendChild( renderer2.domElement );

    // scene
    scene2 = new THREE.Scene();

    // camera
    camera2 = new THREE.PerspectiveCamera( 50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
    camera2.up = camera.up; // important!
    
   
    // axes
    axes2 = new THREE.AxisHelper( 150 );
    console.log(axes2.geometry)
    
    scene2.add( axes2 );
        (function animate() {
            requestAnimationFrame( animate );
            controls.update();
            camera2.position.copy( camera.position );
            camera2.position.sub( controls.target );
            camera2.position.setLength( CAM_DISTANCE );
            camera2.lookAt( scene2.position );
            renderer.render(scene, camera);
            renderer2.render(scene2, camera2);
        })();
        create_mainObjects();
        render();  
        // target can be any Element or other EventTarget.
       
     // Creamos el evento.
    var myevent = new CustomEvent('build', { 'tagsArray': tagsArray });
    /* Definimos el nombre del evento que es 'build'.*/
    myevent.initEvent('build', true, true);

    document.dispatchEvent(myevent);
    
        //filloutTable();   
}    




function doSomething(x,y,z,tag) { 
    tag.position.x = x;
    tag.position.z = y;
}

/**refreshIntervalId = setInterval(function(){ 
    for (var i = 0; i < tagsArray.length; i++)
    {
        var startTime = tagsArray[i].userData.time
        var endTime = new Date();
        var timeDiff = endTime - startTime; //in ms
        // strip the ms
        timeDiff /= 1000;       
        // get seconds 
        var seconds = Math.round(timeDiff);
        console.log(tagsArray[i].userData.id+" -> "+seconds+" - "+refreshTime_dectorTag)
       if(seconds>=3){
        console.log("Tag: "+tagsArray[i].userData.id+" died");
        scene.remove(tagsArray[i]);
        tagsArray.splice(i, 1);
        console.log(tagsArray);
        filloutTable();
       }else 
       tagsArray[i].userData.time= new Date();
    }
     }, refreshTime_dectorTag);
**/
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
//tagsRefresh
function eventSomeObject(id,coordinates){
    var existTag = tagsArray.find( tag => tag['userData'].id === id );

    //Añadir
    if(!existTag){ //Create new Tag
        var color = getRandomColor();
        cube = new THREE.Mesh( new THREE.BoxBufferGeometry( 200, 250, 200 ), new THREE.MeshBasicMaterial( { color: getRandomColor()}) );
        cube.name=id;
        cube.userData = { id: id , des: "Robot", time: new Date(), medium: false, color: color };
        cube.position.x = coordinates.x;
        cube.position.y = 0;
        cube.position.z =coordinates.y;
        console.log("[event map.js] Add new Robot: "+id)
        var canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        var ctx = canvas.getContext("2d");
        ctx.font = "44pt Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(id, 128, 44);
        var tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        var spriteMat = new THREE.SpriteMaterial({
          map: tex
        });
        var sprite = new THREE.Sprite(spriteMat);
        cube.add(sprite)
        cube.updateMatrix();
        scene.add(cube);
        //añade al final de un array
        tagsArray.push(cube);
        filloutTable();
    }else{
        //Actualizar
        existTag.userData.time= new Date();
        if(coordinates) //Move Tag
        doSomething(coordinates.x,coordinates.y,0,existTag);
    }

}


  
function onWindowResize() {

    var col = document.getElementById( 'card' );
    const canvas = renderer.domElement;
    
    const width = $(col).width();
    const height = canvas.clientHeight;
    if (canvas.width !== width ||canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, true);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render( scene, camera );
        // set render target sizes here
    }
    tagsArray.forEach(function(tag) {
    var scaleFactor = 8;
    var sprite = tag.children[0];
    var scale = scaleVector.subVectors(tag.position, tag.position).length() / scaleFactor;
    sprite.scale.set(scale, scale, 1);
    });

}
function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
        var intersect = intersects[ 0 ];
        rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
    }
    render();
}


function onMouseMove( event ) {
    event.preventDefault();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function render() {
    var id=null;
  
    if (clickInfo.userHasClicked) {

        clickInfo.userHasClicked = false;

        statsNode.innerHTML = '';

        // The following will translate the mouse coordinates into a number
        // ranging from -1 to 1, where
        //      x == -1 && y == -1 means top-left, and
        //      x ==  1 && y ==  1 means bottom right
        var x = ( clickInfo.x / SCREEN_WIDTH ) * 2 - 1;
        var y = -( clickInfo.y / SCREEN_HEIGHT ) * 2 + 1;

        // Now we set our direction vector to those initial values
        directionVector.set(x, y, 1);

        // Unproject the vector
        projector.unproject(directionVector, camera);

        // Substract the vector representing the camera position
        directionVector.sub(camera.position);

        // Normalize the vector, to avoid large numbers from the
        // projection and substraction
        directionVector.normalize();

        // Now our direction vector holds the right numbers!
       // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects(tagsArray); //array
        console.log(intersects)
        //var intersects = ray.intersectObjects(scene.children);
        if (intersects.length) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                //Solo los objetos que sean tags
                if(intersects[ 0 ].object) 
                if ( INTERSECTED ) INTERSECTED.material.color.setHex( 0x00FF80 );
                INTERSECTED = intersects[ 0 ].object;
                console.log(INTERSECTED.name)
               
                INTERSECTED.material.color.setHex( 0xd5e9ff );
        
            }
            // intersections are, by default, ordered by distance,
            // so we only care for the first one. The intersection
            // object holds the intersection point, the face that's
            // been "hit" by the ray, and the object to which that
            // face belongs. We only care for the object itself.
            var target = intersects[0].object;
            id=target.id;
            statsNode.innerHTML = 'Name: ' + target.name
                    + '<br>'
                    + 'ID: ' + target.id;

    
        }
        if(row_okey)setSelectedObject(selected_row.cells);
            else{
               if(id) findObjectTable(id);
                renderer.render( scene, camera );
            }

    }
    requestAnimationFrame(render);
    renderer.render( scene, camera );
    renderer2.render( scene2, camera2 );
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

//Seleccion de objeto desde la tabla
function setSelectedObject(row) {
    row_okey=null;
    var id = row[3].innerHTML;
    if(!id) return;
    var data = tagsArray.find( tag => tag['id'] === Number(id) );
    if( data ) {    
        document.getElementById("stats").innerHTML  = '';
        //console.log( 'found' );
        if ( INTERSECTED != data ) {
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( 0x00FF80 );
                    INTERSECTED = data;               
                    INTERSECTED.material.color.setHex( 0xd5e9ff );     
            }   
            var target = data;
            document.getElementById("stats").innerHTML  = 'Name: ' + target.name
                    + '<br>'
                    + 'ID: ' + target.id;
                    renderer.render( scene, camera );
    }
}