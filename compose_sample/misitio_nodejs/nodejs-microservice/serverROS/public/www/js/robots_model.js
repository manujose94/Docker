import { getData,postData, urls_get } from './lib/routes/links.js';


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
	var table = $('#mytable_robotmodel').DataTable({
        "processing" : true,
        "ajax" : {
            "url" :urls_get.mymodels_robot,
            dataSrc : ''
        },
        "columns" : [
            
        {
            "data" : "id"
        }, {
            "data" : "name"
        }, {
            "data" : "description"
        },{
            "data" : "username"
        },{
            "data" : "password"
        }],
        "columnDefs": [
            {
                "targets": 4
            },
            { "visible": true,  "targets": [ 4 ] }
        ]
    });
   
    $('#mytable_robotmodel').on('click', 'tbody > tr', function() {
        
        if( !$(this).hasClass('selected') ) {
           
           $('#datatable > tbody > tr.selected').removeClass('selected')
           
           $(this).addClass('selected');
        
        }
        
    });

    $('#mytable_robotmodel').on('dblclick', 'tbody td', function() {
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

    $('#mytable_robotmodel').on('change', '.editable', function() {
        
        var inputVal = this.value;
        
        var cell = table.cell($(this).parent('td'));
        
        var row = table.row($(this).parents('tr'));
        
        var oldData = cell.data();
        
        cell.data(inputVal);
        
        console.log(JSON.stringify(row.data()));
        let robot_model=row.data();
        console.table({robot_model})
       // console.log({robot_unit})
       postData(urls_get.mymodels_robot,robot_model).then((result) => {
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
           table.cell(cell).data('example data');
            blur = false;
        }
    });

  
});