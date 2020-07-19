import { getData,postData, urls_get } from './lib/routes/links.js';

getData(urls_get.mymodels_robot)
  .then((array) => {
      console.log(urls_get.mymodels_robot)
      console.log(array)
        filloutTable(array)
  });

function filloutTable(array){
    
    if ($('#mytable_models tbody').length == 0) 
        $("#mytable_models").append('<tbody id="mybody"></tbody>');  
    $("#mytable_models tbody tr").remove(); 
 // Append product to the table
    for ( var i = 0; i < array.length; i ++ ) {

        let{id,name,description,supplier,username,password} = array[i];
        $("#mytable_models tbody").append(
        '<tr class="w3-hover-text-green">' +
            '<th scope="row"><i class="fas fa-database fa-lg"></i></th>' +
            '<td>'+id+'</td>' +
            '<td class="text-center">'+name+'</td>' +
            '<td class="text-center">'+username+' :: '+password+'</td>'+
        '</tr>'
        );
          
    }
}

/**
 * return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
 */

$(document).ready(function () {
	var table = $('#mytable_robotunits').DataTable({
        "processing" : true,
        "ajax" : {
            "url" :urls_get.myuntis_robot,
            dataSrc : ''
        },
        "columns" : [
            
        {
            "data" : "id"
        }, {
            "data" : "name"
        }, {
            "data" : "ip"
        }, {
            "data" : "description"
        },{
            "data" : "comment"
        },{
            "data" : "robot_model_id"
        }],
        "columnDefs": [
            {
                "targets": 5
            },
            { "visible": true,  "targets": [ 5 ] }
        ]
    });
   
    $('#mytable_robotunits').on('click', 'tbody > tr', function() {
        
        if( !$(this).hasClass('selected') ) {
           
           $('#datatable > tbody > tr.selected').removeClass('selected')
           
           $(this).addClass('selected');
        
        }
        
    });

    $('#mytable_robotunits').on('dblclick', 'tbody td', function() {
        console.log($(this))
        
        var text =table.cell($(this)).data();
        
        var inputElement = document.createElement('input');
        
        inputElement.type = "text";
        
        inputElement.value = text;
        
        inputElement.className = "editable";
        
        this.innerHTML = '';
        
        this.appendChild(inputElement);
        
        $(inputElement).focus();
    
    });
  

    $('#mytable_robotunits').on('change', '.editable', function() {
        
        var inputVal = this.value;
        
        var cell = table.cell($(this).parent('td'));
        
        var row = table.row($(this).parents('tr'));
        
        var oldData = cell.data();
        
        cell.data(inputVal);
        
        console.log(JSON.stringify(row.data()));
        let robot_unit=row.data();
       // console.log({robot_unit})
        postData(urls_get.myuntis_robot,robot_unit).then((result) => {
            let{message,succes} =result;
            if(succes)alert("[EXITO] Cambio  establecido sobre: "+message)
            else{

                alert("[ERROR] Cambio NO establecido")
                window.location.reload();
            } 
          })
        // Make an ajax call to update table.
        
        // If the ajax call fails, put the old data back
        // and show a warning.
                
        table.draw();
        
    });
    
    var blur = false;
    $('table').on('blur', 'td select', function() {
        if (!blur) {
            blur = true;
            var cell = $(this).closest('td');
           // table.cell(cell).data('example data');
            blur = false;
        }
    });

    
  
});

