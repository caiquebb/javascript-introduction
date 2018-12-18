
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {

        exibeMensagensDeErro(erros);
        return;   
    }

    adicionaPacienteNaTabela(paciente);
    
    form.reset();
    document.querySelector("#mensagens-erro").innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {

    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);    
}

function exibeMensagensDeErro(erros) {
    
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = "";

    erros.forEach(function(erro) {

        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    
    return paciente;
}

function montaTd(dado, classe) {

    var td = document.createElement("td");

    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function montaTr(paciente) {
    
    var tr = document.createElement("tr");

    tr.classList.add("paciente");
    
    tr.appendChild(montaTd(paciente.nome, "info-nome"));
    tr.appendChild(montaTd(paciente.peso, "info-peso"));
    tr.appendChild(montaTd(paciente.altura, "info-altura"));
    tr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    tr.appendChild(montaTd(paciente.imc, "info-imc"));

    return tr;
}

function validaPaciente(paciente) {

    var erros = [];

    if (paciente.nome.length == 0) {

        erros.push("O nome não pode ficar em branco.");
    }
    
    if (!validaPeso(paciente.peso)) {

        erros.push("O peso é inválido.");
    }

    if (!validaAltura(paciente.altura)) {
    
        erros.push("A altura é inválida.");
    }

    if (paciente.gordura.length == 0) {
        
        erros.push("A gordura não pode ficar em branco.");
    }
        
    return erros;
}