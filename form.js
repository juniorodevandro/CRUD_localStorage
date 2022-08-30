
{
    let bootstrapCss = document.createElement("link");
    bootstrapCss.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css");
    bootstrapCss.setAttribute("rel", "stylesheet");
    bootstrapCss.setAttribute("integrity", "sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We");
    bootstrapCss.setAttribute("crossorigin", "anonymous");

    let bootstrapJs = document.createElement("script");
    bootstrapJs.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js");
    bootstrapJs.setAttribute("integrity", "sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj");
    bootstrapJs.setAttribute("crossorigin", "anonymous");

    let head = document.getElementsByTagName("head");
    head[0].appendChild(bootstrapCss);
    head[0].appendChild(bootstrapJs);
}

let div = document.getElementById("container");
div.setAttribute("class", "container");

let container = document.getElementById("container");

let form = document.createElement("form");

form.appendChild(createInputElement("handle", "handle", "number", true));
form.appendChild(createInputElement("nome", "Nome", "text"));
form.appendChild(createInputElement("rua", "Rua", "text"));
form.appendChild(createInputElement("numero", "Número", "number"));
form.appendChild(createComboBoxElement("regiao", "Região", rscConsts.regions));
form.appendChild(createComboBoxElement("estado", "Estado", null));
form.appendChild(createComboBoxElement("cidade", "Cidade", null));

let labelTextNacionalidade = document.createElement("label");
labelTextNacionalidade.setAttribute("class", "mt-3");
labelTextNacionalidade.appendChild(document.createTextNode("Nacionalidade: "));
form.appendChild(labelTextNacionalidade);
let lbreak = document.createElement("br");
form.appendChild(lbreak);

form.appendChild(createRadioElement("nacionalidade", "Brasileiro", "0"));
form.appendChild(createRadioElement("nacionalidade", "Estrangeiro", "1"));
form.appendChild(createInputElement("dataNascimento", "Data de nascimento", "date"));

let btnSubmit = document.createElement("button");
btnSubmit.setAttribute("class", "btn btn-success");
btnSubmit.setAttribute("type", "submit");
btnSubmit.setAttribute("id", "register");
btnSubmit.addEventListener('click', createClient);
btnSubmit.appendChild(document.createTextNode("Cadastrar"))

let btnLimpar = document.createElement("button");
btnLimpar.setAttribute("class", "btnb tn btn-light");
btnLimpar.setAttribute("id", "clean");
btnLimpar.setAttribute("onClick", "updateTela()");
btnLimpar.setAttribute("hidden", "true");
btnLimpar.appendChild(document.createTextNode("Limpar"))


form.appendChild(document.createElement("br"));
form.appendChild(btnSubmit);
form.appendChild(btnLimpar);

container.appendChild(form);

let regiaoInput = document.getElementById("regiao");

regiaoInput.addEventListener("change", () => {
    let estadoInput = document.getElementById("estado");
    estadoInput.removeAttribute('disabled');
    estadoInput.innerHTML = '';

    let estados = rscConsts.states.filter((obj) => {
        return (obj.region_id == regiaoInput.value);
    });

    let option = document.createElement("option");
    option.appendChild(document.createTextNode("Selecione uma estado"));
    option.setAttribute("value", -1);    
    estadoInput.appendChild(option);

    estados.forEach(opt => {
        let option = document.createElement("option");
        option.setAttribute("value", opt.id);
        option.appendChild(document.createTextNode(opt.name));

        estadoInput.appendChild(option);
    });
})

let estadoInput = document.getElementById("estado");
estadoInput.addEventListener("change", () => {
    let cidadeInput = document.getElementById("cidade");
    cidadeInput.removeAttribute('disabled');
    cidadeInput.innerHTML = '';

    let cidades = rscConsts.cities.filter((obj) => {
        return (obj.state_id == estadoInput.value);
    });

    let option = document.createElement("option");
    option.appendChild(document.createTextNode("Selecione uma cidade"));
    option.setAttribute("value", -1);
    cidadeInput.appendChild(option);

    cidades.forEach(opt => {
        let option = document.createElement("option");
        option.setAttribute("value", opt.id);
        option.appendChild(document.createTextNode(opt.name));

        cidadeInput.appendChild(option);
    });
})

//Criação da tabela de registros
{
    let tabela = document.createElement("table");
    tabela.setAttribute("class", "table table-striped");
    tabela.setAttribute("id", "tableClient");

    let thead = document.createElement("thead");
    let headCol = document.createElement("tr");

    let col1 = document.createElement("th");
    col1.setAttribute("scope", "col");
    col1.appendChild(document.createTextNode("Nome"));
    
    let col2 = document.createElement("th");
    col2.setAttribute("scope", "col");
    col2.appendChild(document.createTextNode("Rua"));
    
    let col3 = document.createElement("th");
    col3.setAttribute("scope", "col");
    col3.appendChild(document.createTextNode("Número"));
    
    let col4 = document.createElement("th");
    col4.setAttribute("scope", "col");
    col4.appendChild(document.createTextNode("Região"));
    
    let col5 = document.createElement("th");
    col5.setAttribute("scope", "col");
    col5.appendChild(document.createTextNode("Estado"));
    
    let col6 = document.createElement("th");
    col6.setAttribute("scope", "col");
    col6.appendChild(document.createTextNode("Cidade"));
    
    let col7 = document.createElement("th");
    col7.setAttribute("scope", "col");
    col7.appendChild(document.createTextNode("Nacionalidade"));
    
    let col8 = document.createElement("th");
    col8.setAttribute("scope", "col");
    col8.appendChild(document.createTextNode("Data de nascimento"));
    
    let col9 = document.createElement("th");
    col9.setAttribute("scope", "col");
    col9.appendChild(document.createTextNode("Ação"));

    headCol.appendChild(col1);
    headCol.appendChild(col2);
    headCol.appendChild(col3);
    headCol.appendChild(col4);
    headCol.appendChild(col5);
    headCol.appendChild(col6);
    headCol.appendChild(col7);
    headCol.appendChild(col8);
    headCol.appendChild(col9);

    thead.appendChild(headCol);
    tabela.appendChild(thead);
    
    let tbody = document.createElement("tbody");

    let registrosGuardados = getLocalStorage();
    if (registrosGuardados != null) {
        registrosGuardados.forEach(element => {
            let trow = document.createElement("tr");

            let tdata0 = document.createElement("td");
            tdata0.setAttribute("hidden", "true");            
            tdata0.setAttribute("id", element.id)            

            let tdata1 = document.createElement("td");
            tdata1.appendChild(document.createTextNode(element.nome));
            
            let tdata2 = document.createElement("td");
            tdata2.appendChild(document.createTextNode(element.rua));
            
            let tdata3 = document.createElement("td");
            tdata3.appendChild(document.createTextNode(element.numero));
            
            let tdata4 = document.createElement("td");
            let regiao = rscConsts.regions.filter((obj) => {
                return (obj.id == element.regiao)
            });            
            tdata4.appendChild(document.createTextNode(regiao[0].name));
            
            let tdata5 = document.createElement("td");
            let estado = rscConsts.states.filter((obj) => {
                return (obj.id == element.estado)
            });
                        
            tdata5.appendChild(document.createTextNode(estado[0].name));
            
            let tdata6 = document.createElement("td");
            let cidade = rscConsts.cities.filter((obj) => {
                return (obj.id == element.cidade)
            });

            tdata6.appendChild(document.createTextNode(cidade[0].name));    
            
            let tdata7 = document.createElement("td");
            tdata7.appendChild(document.createTextNode((element.nacionalidade == 0) ? "Brasileiro" : "Estrangeiro"));
            
            let tdata8 = document.createElement("td");
            tdata8.appendChild(document.createTextNode(element.nasc));
            
            let btnEditar = document.createElement("button");
            btnEditar.setAttribute("class", "btn btn-primary");     
            btnEditar.setAttribute("id", `${element.id}`);        
            btnEditar.addEventListener('click', editClient);
            btnEditar.appendChild(document.createTextNode("Editar"));
            
            let btnExcluir = document.createElement("button");
            btnExcluir.setAttribute("class", "btn btn-danger");            
            btnExcluir.setAttribute("id", `${element.id}`);        
            btnExcluir.addEventListener('click', deleteClient);
            btnExcluir.appendChild(document.createTextNode("Excluir"));                 
            
            let tdata9 = document.createElement("td");
            tdata9.appendChild(btnEditar);            
            tdata9.appendChild(btnExcluir);            

            trow.appendChild(tdata0);
            trow.appendChild(tdata1);
            trow.appendChild(tdata2);
            trow.appendChild(tdata3);
            trow.appendChild(tdata4);
            trow.appendChild(tdata5);
            trow.appendChild(tdata6);
            trow.appendChild(tdata7);
            trow.appendChild(tdata8);
            trow.appendChild(tdata9);

            tbody.appendChild(trow);

        })
    }

    tabela.appendChild(tbody);
    
    let tableTitle = document.createElement("h1");
    tableTitle.setAttribute("class", "text-center");
    tableTitle.appendChild(document.createTextNode("Registros cadastrados: "));

    container.appendChild(tableTitle);
    container.appendChild(tabela);
}