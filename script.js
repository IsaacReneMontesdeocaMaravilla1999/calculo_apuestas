var boton=document.getElementById('agregar');
var guardar=document.getElementById('guardar');
var lista=document.getElementById("lista");
var data=[];
boton.addEventListener("click",agregar);
guardar.addEventListener("click",save);
var cant=0;
function agregar(){
    var nombre=document.querySelector('#nombre').value;
    var cantidad=parseFloat(document.querySelector('#cantidad').value)
    var momio=parseFloat(document.querySelector('#momio').value)
    var fecha=document.querySelector('#fecha').value;
    var pronostico=document.querySelector('#pronostico').value;
    var resultado=document.querySelector('#resultado').value;
    var ganado=parseFloat(document.querySelector('#ganado').value);
    var perdidos=parseFloat(document.querySelector('#perdidos').value);
    var total=ganado+cantidad;
    //agrega elementos al arreglo
    data.push(
        {"id":cant,"nombre":nombre,"cantidad":cantidad,"momio":momio,"fecha":fecha,"pronostico":pronostico,"resultado":resultado,"ganado":ganado,"perdidos":perdidos,"total":total}
    );
   
   //convertir el arreglo a json
  // console.log(JSON.stringify(data));
  var id_row='row'+cant;
  var fila='<tr id='+id_row+'><td>'+nombre+'</td><td>' + "$"+ cantidad+'</td><td>'+momio+'</td><td>'+fecha+'</td><td>'+pronostico+'</td><td>'+resultado+'</td><td>'+ "$"+ganado+'</td><td>'+ "$"+total+'</td><td><a href="#" class="btn btn-danger" onclick="eliminar('+cant+')";>Eliminar</a><a href="#" class="btn btn-warning" onclick="cantidad('+cant+')";>Modificar</a></td></tr>';
  //agregar fila a la tabla
  $("#lista").append(fila);
  $("#nombre").val('');
  $("#cantidad").val('');
  $("#momio").val('');
  $("#fecha").val('');
  $("#pronostico").val('');
  $("#resultado").val('');
  $("#ganado").val('');
  $("#perdidos").val('');
  $("#nombre").focus();
  cant++;
  sumar();
  gastado();
  perdido();
}
function eliminar(row){
    //remueve la fila de la tabla html
    $("#row"+row).remove();
   //remover el elmento del arreglo
   //data.splice(row,1);
   //buscar el id a eliminar
   var i=0;
   var pos=-1;
   for (x of data){
       console.log(x.id);
       if (x.id==row){
           pos=i;
       }
       i++;
   }
   data.splice(pos,1);
  sumar();
  
  
}
function cantidad(row){
    var canti=parseInt(prompt("Modificar cantidad a apostar:"));
    data[row].cantidad=canti;
    data[row].total=data[row].cantidad+data[row].ganado;
    var filaid=document.getElementById("row"+row);
    celda=filaid.getElementsByTagName('td');
    celda[1].innerHTML=canti;
    celda[7].innerHTML= data[row].total;
    console.log(data);
    sumar(); 

    //El Momio solo es lo mismo pero se suma con un punto, por ejemplo 1 con momio de +475 = 5.75
    //Este tiene un momio de -400. en este caso, la apuesta tendrá que ser de 400 MXN para ganar 100 MXN.
    
}
function sumar(){
    let tot=0;
    for (x of data){
       tot=tot+x.total;
    }
    document.querySelector("#total").innerHTML="Total: "+ tot;
}    

//Gastado
function gastado(){
    let gas=0;
    for (x of data){
       gas=gas+x.ganado;
    }
    document.querySelector("#resultado_ganador").innerHTML= "$" + gas;
}    

//Perdido
function perdido(){
    let per=0;
    for (x of data){
       per=per+x.perdidos;
    }
    document.querySelector("#resultado_perdedor").innerHTML= "$" + per;
}    

function save(){
    var json=JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "api.php",
        data: "json="+json,
        success:function(respo){
           location.reload();
        }
        
    });
}

var miCanvas=document.getElementById("MiGrafica").getContext("2d");

var chart = new Chart(miCanvas,{
    type:"pie",
    data:{
        labels:["Ganancia", "Perdida"],
        datasets:[
            {
                backgroundColor: ["green", "red"],
                borderColor:"black",
                data:[61,39]
            }
        ]
    }
})