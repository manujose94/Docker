//http://localhost:1860/bd/testsready
//[{"id":11,"init_date":"2020-02-22T09:45:54.000Z","end_date":"2020-02-22T09:45:54.000Z","finished":1,"id_operario":1,"test_id":3,"qa_id":1,"result":1,"related_components":null,"id_model":2,"name_model":"summit"},
function format ( d ) {
   

    return 'Test name: ' +d.test_name+ '<br>'+
        'Test type: '+d.test_type+' <br>'+
        'Operario: '+d.operario_name+' <br>'
        ;
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
	var table = $('#dt-select').DataTable({
        "processing" : true,
        "ajax" : {
            "url" : "http://0.0.0.0:8080/bd/testsready/moreinfo",
            dataSrc : ''
        },
        "columns" : [{
            "class":          "details-control",
            "orderable":      false,
            "data":           null,
            "defaultContent": ''
        },
            
        {
            "data" : "test_id"
        }, {
            "data" : "init_date"
        }, {
            "data" : "end_date"
        }, {
            "data" : "model_name"
        },{
            "data" : "result"
        }],
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    console.log({data,type,row})
                    return row.result==1? "Exitoso":"Fallido";
                },
                "targets": 5
            },
            { "visible": true,  "targets": [ 5 ] }
        ]
    });
    $('#dt-select tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

   
    
  
});

