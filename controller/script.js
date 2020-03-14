//DEbo esconder los formularios y asignarle el valor 'vacio' para que al recargar la pag se resetee en formulario
$('#formlat').hide();
$('#formubi').hide();
$('#fulltime').hide();
$('#tipoBusqueda').val('vacio')


//Dependiendo la opción de busqueda que el usuario elija se despliega el formulario a rellenar

$('#tipoBusqueda').change(function(){
    
 
    let tipoBusqueda = $('#tipoBusqueda').val();
    console.log(tipoBusqueda)
    if (tipoBusqueda =='lat'){
        $('#formlat').show();
        $('#formubi').hide();
        $('#fulltime').show();
    } else if (tipoBusqueda=='ubi'){
        $('#formubi').show();
        $('#formlat').hide();
        $('#fulltime').show();
    }else if (tipoBusqueda='vacio'){
        $('#formlat').hide();
        $('#formubi').hide();
        $('#fulltime').hide();
    }
    $('#tipoBusqueda')=='vacio';
});


//Se reciben los datos ingresados por el usuario

$('#filtro').submit(function(e){
    e.preventDefault();

    const ubicacion = document.querySelector('#ubicacion').value;
    const latitud = document.querySelector('#lat').value;
    const longitud = document.querySelector('#lon').value;
    const fulltime = document.querySelector('#fulltime').checked;


    variable = {ubicacion,latitud,longitud,fulltime};
    busca_url(variable)
})

const url_inicial = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?'

const busca_url = (variable)=>{
    let url_final=""
    if (variable.ubicacion!=""){
        url_final = url_inicial + "location="+ variable.ubicacion.replace(/\s/g, '+');
        if (fulltime==true){
            url_final += '&'+"full_time=true";
        }
    }else if (variable.latitud!="" &  variable.longitud!=""){
        url_final = url_inicial + "lat="+variable.latitud+"&"+"long="+variable.longitud
        if (fulltime==true){
            url_final += '&'+"full_time=true";
        }
    }

    return url_final
}


const  getJob= async (variable) => {
    let url = busca_url(variable)
    try {
        const resPost = await fetch (url)
        const jobs = await resPost.json()
        

        //Recorro el JSON sacando la info q quiero
        for (var i=0; i< jobs.length; i++){
           
            
            document.getElementById("lista").innerHTML+= 'Puesto '+ i + ' : '+ jobs[i].title + '<br>' + 'Nombre Empresa: ' + jobs[i].company + '<br> <br>';
          }


        
    } catch (error) {
        console.log(error);
    }
}

getJob()