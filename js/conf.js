const urlGit = 'https://api.github.com/users/';

var error = $('#lblerror');
var aguarda = $('#info');
var profile = $('#profile-info');
var informations = $('#lblinformation');

error.hide();
informations.hide();
aguarda.hide();

$('#btn-search').click(() => {
    
    var user = $('#search').val();
    profile.empty();
    error.hide();
    aguarda.show().fadeIn(3000).delay(8);

    $.getJSON(urlGit + user, (data) => {
        
        //formatação da data
        var dataCriada = new Date(data.created_at);
        var atualizadoEm = new Date (data.updated_at);

        var dataCriadaFormatada = dataCriada.getDay() + "/" + dataCriada.getMonth() + "/" + dataCriada.getFullYear();
        var dataAtualizadaFormatada = atualizadoEm.getDay() + "/" + atualizadoEm.getMonth() + "/" + atualizadoEm.getFullYear();

        
        
        console.log("success");
        //aguarda.fadeIn(500).fadeOut(500);
        
        $(`<div class="col-md-3">
        <img 
        src= ${data.avatar_url}
        alt="GitHub Avatar" 
        class="img-fluid img-thumbnail">
        </div>
    <div class="col-md-9">

        <div>
        <label for="name"><b>Nome: </b>
        </label><span id="name"> ${data.name}</span>
        </div>

        <div>
        <label for="login"><b>Login: </b>
        </label><span id="login"> ${data.login}</span>
        </div>

        <div>
        <label for="url"><b>Url do perfil: </b>
        </label><a id="url" href="${data.html_url}" target="_blank"> ${data.url}</a>
        </div>

        <div>
        <label for="location"><b>Localização: </b>
        </label><span id="location"> ${data.location}</span>
        </div>

        <div>
        <label for="public-repos"><b>Repositórios públicos: </b>
        </label>
        <span id="public-repos"> ${data.repos_url} </span>
        </div>

        <div>
        <label for="created-at"><b>Criado em: </b>
        </label><span id="created-at"> ${dataCriadaFormatada} </span>
        </div>

        <div>
        <label for="updated-at"><b>Atualizado em: </b></label>
        <span id="updated-at"> ${dataAtualizadaFormatada} </span>
        </div>
    </div>            
    </div>`).appendTo('#profile-info');
    
    })
        .fail(function (data) {
            console.log("error");
           
            aguarda.hide();
            informations.hide();
            //profile.hide();

            $('#lblerror').append(`<span>${data.status}</span>`);
            error.show();
        })
        .always(function () {
            console.log("completo");
            aguarda.hide();
        });        
    });