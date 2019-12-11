"use strict";

document.addEventListener("deviceready", dispositivoPronto, false);

function dispositivoPronto(){

/* ETAPA 01
Verificação e carregamento de tarefas */
const lista = document.querySelector("#lista");

let itemSemTarefas = "<li class='list-group-item'>Sem tarefas</li>";

// Verificando o localStorage

if(localStorage.getItem("dados")){
    lista.innerHTML = localStorage.getItem("dados");
} else {
    lista.innerHTML = itemSemTarefas;
}

/* FIM ETAPA 01 */


/* ETAPA 02 
Capturar a tarefa digitada, salvar no localStorage e exibir no HTML */

const formulario = document.querySelector("form");

const inputTarefa = formulario.querySelector("#tarefa");

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    
    // Guardar a tarefa (em memória)
    let tarefa = inputTarefa.value;

    // Conteúdo existente
    let conteudo = "";

    /* Verificar o localStorage */
    if(localStorage.getItem("dados")){
        // Se existir, vamos guardar os dados já existentes
        conteudo = localStorage.getItem("dados");
    };

    /* HTML do Link de Remoção */
    const linkRemover = " <a href='' class='btn btn-danger'>Remover</a>";

    /* HTML Completo
    (conteudo + tarefa + linkRemover) */
    const completo = `${conteudo} <li class='list-group-item'>${tarefa} ${linkRemover}</li>`
    
    /* Salvar no localStorage */
    localStorage.setItem("dados", completo);

    /* Carregar os dados */
    lista.innerHTML = localStorage.getItem("dados");

    formulario.reset();
    inputTarefa.focus();

});

/* Fim da ETAPA 02 */


/* ETAPA 03
Remoção da tarefa */
lista.addEventListener("click", function (event){
    event.preventDefault();

    /* event: é o evento usado
    target: alvo do evento
    parentNode: volta ao elemento pai */

    let resposta = confirm("Tem certeza?");
    if(resposta){
        /* Somente se houver o clique em uma tag A */
        if(event.target.tagName == "A"){
            /* Volte para o parentNode (li) e faça a remoção no DOM */
            event.target.parentNode.remove();
        };

        /* Atualizar o localStorage:
        Le os dados atuais da lista, e os transmite para o localStorage */
        localStorage.setItem("dados", lista.innerHTML);
    };
});

}; // fim dispositivoPronto