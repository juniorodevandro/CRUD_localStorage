    const getLocalStorage = () => JSON.parse(localStorage.getItem("registros")) ?? []
    const setLocalStorage = (dbClient) => localStorage.setItem("registros", JSON.stringify(dbClient));
    const readClient = () => getLocalStorage();

    const fillFields = (client) => {        
        document.getElementById('handle').value = client.id;
        document.getElementById('nome').value = client.nome;
        document.getElementById('rua').value = client.rua;
        document.getElementById('numero').value = client.numero;

        document.getElementById('regiao').value = client.regiao;
        
        let inputEstado = document.getElementById('estado');
        createOptionSelect(inputEstado, rscConsts.states);
        inputEstado.value = client.estado;

        let inputCidade = document.getElementById('cidade');        
        createOptionSelect(inputCidade, rscConsts.cities);
        inputCidade.value = client.cidade;

        document.getElementById(client.nacionalidade == 0 ? "Brasileiro" : "Estrangeiro").checked = true;
        document.getElementById('dataNascimento').value = client.dataNascimento
    }    

    const editClient = (event) => {   
        btnSubmit = document.getElementById('register') 
        btnSubmit.innerHTML = 'Salvar';        
        btnSubmit.removeEventListener('click', createClient);            
        btnSubmit.addEventListener('click', updateClient);
        document.getElementById('clean').removeAttribute('hidden')
        
        const index = event.target.id.split('-')        
        const client = readClient()[index]
        client.index = index
        fillFields(client);        
    };   

    const deleteClient = (event) => {        
        const index = event.target.id.split('-')
        const dbClient = readClient()
        dbClient.splice(index, 1)
        setLocalStorage(dbClient)            
        
        alert(`Registro exluido: ${index + 1}`)
        updateTela();
    }     

    function updateTela() {
        //-- so vai atualizar msm, sem tempo para melhorar isso por enquamto
        location.reload()
    }

    function createOptionSelect(select, options) {
        select.removeAttribute('disabled');
        options.forEach(opt => {
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(opt.name));
            option.setAttribute("value", opt.id);
            select.appendChild(option);
        });
    }

    function createInputElement(inputId, inputLabelText, inputType, inputHidden = false) {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group");
        
        let label = document.createElement("label");
        label.setAttribute("for", inputId);
        label.appendChild(document.createTextNode(inputLabelText));
        label.hidden = inputHidden;
    
        let input = document.createElement("input");
        input.setAttribute("id", inputId);
        input.setAttribute("name", inputId);
        input.setAttribute("class", "form-control");
        input.setAttribute("placeholder", inputLabelText);
        input.setAttribute("type", inputType);
        input.required = true;
        input.hidden = inputHidden
    
        div.appendChild(label);
        div.appendChild(input);
    
        return div;
    }
    
    function createComboBoxElement(selectId, inputLabelText, options) {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group");
    
        let label = document.createElement("label");
        label.setAttribute("for", selectId);
        label.appendChild(document.createTextNode(inputLabelText));
    
        let select = document.createElement("select");
        select.setAttribute("id", selectId);
        select.setAttribute("name", selectId);
        select.setAttribute("class", "form-control");
        select.required = true; 
    
        
        if (options == rscConsts.regions) {   
            let option = document.createElement("option")
            option.appendChild(document.createTextNode("Selecione uma região"));
            option.setAttribute("value", -1);                        
            select.add(option);
            createOptionSelect(select, options);
        } else {        
            select.setAttribute("disabled", "");
        }
    
        div.appendChild(label);
        div.appendChild(select);
    
        return div;
    }
    
    function createRadioElement(inputId, inputLabelText, inputValue){
        let rDiv = document.createElement('div');
        rDiv.setAttribute('class','mt-1 mb-3 form-check form-check-inline');
    
        let rInput = document.createElement('input');
        rInput.setAttribute('type','radio');
        rInput.setAttribute('id',inputLabelText);
        rInput.setAttribute('class','form-check-input');
        rInput.setAttribute('name',inputId);
        rInput.setAttribute('value',inputValue);
    
        let rLabel = document.createElement('label');
        rLabel.setAttribute('for',inputLabelText);
        rLabel.setAttribute('class','form-check-label');
        rLabel.appendChild(document.createTextNode(inputLabelText));
    
        rDiv.appendChild(rInput);
        rDiv.appendChild(rLabel);
    
        return rDiv;
    }        

    const updateClient = () => {
        debugger
        index = document.getElementById('handle').value
        const client = {
            id: document.getElementById('handle').value,
            nome: document.getElementById('nome').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,    
            regiao: document.getElementById('regiao').value,            
            estado:  document.getElementById('estado').value,          
            cidade: document.getElementById('cidade').value,        
            // nacionalidade: ,
            dataNascimento: document.getElementById('dataNascimento').value
        };
        debugger
        const dbClient = readClient()
        dbClient[index] = client
        setLocalStorage(client)
    }        

    const createClient = () => {
        let nome = document.getElementById("nome");
        if (nome.value == '') return;
    
        let rua = document.getElementById("rua");
        if (rua.value == '') return;
    
        let numero = document.getElementById("numero");
        if (numero.value == '') return;
    
        let regiaoInput = document.getElementById("regiao");
        if (regiaoInput.value == -1) {
            alert("Selecione uma Região");            
            regiaoInput.focus();
            return
        }                
        let estadoInput = document.getElementById("estado");
        if (estadoInput.value == -1) {
            alert("Selecione um Estado");
            estadoInput.focus();
            return;
        }
    
        let cidadeInput = document.getElementById("cidade");
        if (cidadeInput.value == -1) {
            alert("Selecione uma Cidade");
            cidadeInput.focus();
            return;
        }
    
        let nacionalidade = document.querySelector('input[name=nacionalidade]:checked');
        if (nacionalidade == null) {
            alert("Selecione a Nacionalidade");
            return;
        }                 
    
        let dataNascimento = document.getElementById("dataNascimento");
        if (dataNascimento.value == '') return;        

        const dbClient = getLocalStorage();
    
        let client = {
            nome: nome.value,
            rua: rua.value,
            numero: numero.value,
            regiao: regiaoInput.value,
            estado: estadoInput.value,
            cidade: cidadeInput.value,
            nacionalidadee: nacionalidade.value,
            nasc: dataNascimento.value,
            id: dbClient.length
        }      
        dbClient.push(client)
        setLocalStorage(dbClient)

        alert(`Registro salvo: ${client.id + 1}`)
        updateTela()
    }   