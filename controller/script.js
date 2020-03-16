window.onload = function (){






//DEbo esconder los formularios y asignarle el valor 'vacio' para que al recargar la pag se resetee en formulario
$('#formlat').hide();
$('#formubi').hide();
$('#fulltime').hide();
$('#boton').hide();
$('#tipoBusqueda').val('vacio')




//Dependiendo la opción de busqueda que el usuario elija se despliega el formulario a rellenar

$('#tipoBusqueda').change(function(){
    
 
    let tipoBusqueda = $('#tipoBusqueda').val();
    console.log(tipoBusqueda)
    if (tipoBusqueda =='lat'){
        $('#formlat').show();
        $('#formubi').hide();
        $('#fulltime').show();
        $('#boton').show();
    } else if (tipoBusqueda=='ubi'){
        $('#formubi').show();
        $('#formlat').hide();
        $('#fulltime').show();
        $('#boton').show();
    }else if (tipoBusqueda='vacio'){
        $('#formlat').hide();
        $('#formubi').hide();
        $('#fulltime').hide();
    }
    $('#tipoBusqueda')=='vacio';
});

//Se reciben los datos ingresados por el usuario

$('#filtro').on('click', function(e){
    e.preventDefault();

    $('#lista').empty()

    let ubicacion = document.getElementById('ubicacion').value;
    let latitud = document.getElementById('lat').value;
    let longitud = document.getElementById('lon').value;
    let fulltime = document.getElementById('fulltime').checked;
 
    busca_url(ubicacion,latitud,longitud,fulltime);
});

const url_inicial = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?';

const busca_url = function(ubicacion,latitud,longitud,fulltime){
    let url_final="";
    if (ubicacion !=""){
        let filtro = /\s/g;
        url_final = url_inicial + "location="+ ubicacion.replace(filtro, '+');
        if (fulltime==true){
            url_final += '&'+"full_time=true";
        }
    }else if (latitud!="" &  longitud!=""){
        url_final = url_inicial + "lat="+latitud+"&"+"long="+longitud
        if (fulltime==true){
            url_final += '&'+"full_time=true";
        }
    }

    if (ubicacion !="" || (latitud!="" &  longitud!="")){
        getJob(url_final);
    }else{
        alert("Debe definir parámetros de búsqueda!!!");
    }


    
};

const  getJob= async (variable) => {
    let url = variable;
    try {
        const resPost = await fetch (url);
        const jobs = await resPost.json()
        

        //Recorro el JSON sacando la info q quiero
        for (var i=0; i< jobs.length; i++){
            let imprimir =
            '<div class="card">'+
            '<div class="d-flex justify-content-start">'+
                '<img src="'+jobs[i].company_logo+'" class="rounded float-left" alt="...">'+
                '<div>'+
                    '<h5 class="card-header">'+jobs[i].title+'</h5>'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+ jobs[i].company+'</h5>'+
                        '<a href="'+jobs[i].url+'" class="btn btn-dark">Más Info</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
          '</div>'
            
                
            document.getElementById("lista").innerHTML+= imprimir;
          }


        
    } catch (error) {
        console.log(error);
    }
}






}






