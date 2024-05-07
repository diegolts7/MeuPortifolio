
// Declaração das variaves dos elementos do DOM

const body = document.querySelector("body");
const conteiner = document.querySelector(".conteiner");
const modalMenu = document.querySelector(".modalMenu");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const iconeMenu = document.querySelector("#iconeMenu");
const iconeLua = document.querySelector("#iconeLua");
const iconeSol = document.querySelector("#iconeSol");
const iconeLogo = document.querySelector("#iconeLogo");
const iconeClose = document.querySelector("#iconeClose");
const LinksMenu = document.querySelector(".links");
const theme = document.querySelector(".theme");
const preDefinicao = document.querySelectorAll("*");
const texto = ", eu sou o SousaDev.";
const Div = document.querySelector("#efeitoDig");
const IconesRedeSocial = document.querySelectorAll("#iconeRedeSocial i");
const titulosProjeto = document.querySelector("#tituloProjetos");
const btnAbrirProjetos = document.querySelector("#abrirProjetos");
const btnFecharProjetos = document.querySelector("#fecharProjetos");
const meusProjetos = document.querySelector(".meusProjetos");

// orientação a objetos

class Projeto {
    constructor(titulo, descricao, img, links){
        this.titulo = titulo;
        this.descricao = descricao;
        this.img = img;
        this.links = links;
    }
}

class MeusProjetos {
    constructor() {
        this.listaProjetos = new Map();
    }
    addProjeto(projeto) {

        this.listaProjetos.set(projeto.titulo, projeto);

    }
    exibirProjetos(conteiner){
        
        this.fecharProjetos(conteiner);

        this.listaProjetos.forEach(elemento => {
            criarProjetos(elemento);
        })
        
        
    }
    fecharProjetos(conteiner){

        conteiner.innerHTML = "";
    }
}

let relacaoProjetos = new MeusProjetos();

let projeto2 = new Projeto("2. Jogo de carro", "Consite basicamente em um simples jogo de carro em uma rodovia, no qual o objetivo e desviar dos carros. Foi feito em sua grande parte com animações keyframes no css e o JavaScript para implementar os sistemas de colisão e mudança de direção, além de fazer o loop do jogo. Conta também com um sistema de pontuação conforme avança e o recorde é salvo no LocalStorage evitando perca.", ["img/Captura de tela 2024-04-26 160617.png", "img/Captura de tela 2024-04-26 160907.png", "img/Captura de tela 2024-04-26 160927.png"], ["https://github.com/diegolts7/Road-Car-Game"]);

let projeto3 = new Projeto("3. Cronômetro", "Uma aplicação básica de um Cronômetro funcional onde existe as funcionalidades de iniciar ele, pausar, continuar, resetar e ainda implementei um alarme para quando chegar no tempo definido ele vibrar. As principais funcionalidades foram feitas no java script, como o sitema de loop do tempo, a formatação do tempo e a função do alarme.", ["img/Captura de tela 2024-04-26 164326.png", "img/Captura de tela 2024-04-26 164344.png"], ["https://github.com/diegolts7/JavaScripts-Projects/tree/main/projetos/Cronometro"]);

let projeto4 = new Projeto("4. Sistema de cadastrar clientes Web", "Esse projeto foi construido usando HTML, CSS e JS. Se trata de um cadastro de clientes especializado onde terá as funcionalidades de adicionar, atualizar, exibir, buscar e excluir, basicamente um CRUD. Feito a partir da programação orientada a objetos e utilizando a estrutura de dados Map, além de um sistema automático de definição de matricula e a função de salvar os dados na LocalStorage.", ["img/Captura de tela 2024-05-07 143908.png", "img/Captura de tela 2024-05-07 143940.png"], ["https://github.com/diegolts7/RegisterClients-Web"]);

let projeto5 = new Projeto("5. Filmes&Séries", "Esse projeto se baseia na criação de uma página web responsiva com a principal função de uma lista de filmes e séries que o usuario tem interesse de ver. As funcionalidas são as de pesquisa, onde para ter acesso ao acervo eu implementei a comunicação com a API do The Movie Database, além disso o usuario pode adicionar, marcar como assistido e ver informações sobre o título escolhido. O salvamento dos dados ocorre na LocalStorage.", ["img/Captura de tela 2024-05-07 150705.png", "img/Captura de tela 2024-05-07 150827.png", "img/Captura de tela 2024-05-07 150757.png"], ["https://github.com/diegolts7/Filmes-Series", "https://diegolts7.github.io/Filmes-Series/"]);

relacaoProjetos.addProjeto(projeto2);
relacaoProjetos.addProjeto(projeto3);
relacaoProjetos.addProjeto(projeto4);
relacaoProjetos.addProjeto(projeto5);

// variaveis de base para uso nas funcionalidades

let loop;                   //variavel do intervalo que vai ser definido na função de efeito de digitação typing()

let iterador = 0;           //variavel que vai iterar na função typing()  

let themeWhite = true;     //tema que esta definido no momento

//verificando qual thema esta salvo na localStorage e salvando na variavel themeWhite

if(localStorage.getItem("theme") !== null){         
    if(localStorage.getItem("theme") === "true"){
        themeWhite = true;
    }else if(localStorage.getItem("theme") === "false"){
        themeWhite = false;
    }
}


// Eventos no DOM

window.addEventListener("DOMContentLoaded", mudarTema)
iconeMenu.addEventListener("click", abrirMenu);
theme.addEventListener("click", mudarTema);
iconeClose.addEventListener("click", fecharMenu);
window.addEventListener("resize", fecharMenuRedimensionar);
modalMenu.addEventListener("click", fecharMenuClick);
btnAbrirProjetos.addEventListener("click", () => {
    relacaoProjetos.exibirProjetos(meusProjetos);
    btnProjetoAberto();
});
btnFecharProjetos.addEventListener("click", () => {
    relacaoProjetos.fecharProjetos(meusProjetos);
    btnProjetoFechado();
});


// Funçoes

// esconder ou mostrar os botoes de projetos

function btnProjetoAberto() {

    btnFecharProjetos.style.display = "flex";
    btnAbrirProjetos.style.display = "none";
}

function btnProjetoFechado() {
    
    btnFecharProjetos.style.display = "none";
    btnAbrirProjetos.style.display = "flex";
}

// funções que vão criar os projetos no conteiner meusProjetos

function criarProjetos(elemento) {
    
    let divProjeto = document.createElement("div");
    divProjeto.classList.add("projeto");



    let titulo = document.createElement("h2");
    titulo.textContent = elemento.titulo;


    divProjeto.appendChild(titulo);

    let descricao = document.createElement("p");
    descricao.textContent = elemento.descricao;


    divProjeto.appendChild(descricao);

    let arrayImg = elemento.img;

    arrayImg.forEach(element => {

        let img = document.createElement("img");
        img.classList.add("imgProjeto");
        img.src = element;

        divProjeto.appendChild(img);
    });

    let linksProjetos = document.createElement("div");
    linksProjetos.classList.add("linksProjeto");

    divProjeto.appendChild(linksProjetos);

    let arrayLinks = elemento.links;

    let linkRepositorio = document.createElement("a");
    linkRepositorio.href = arrayLinks[0];
    linkRepositorio.target = "_blank";
    linkRepositorio.textContent = "Link do repositório";

    
    linksProjetos.appendChild(linkRepositorio);

    if(arrayLinks.length > 1){

        let linkSite = document.createElement("a");
        linkSite.href = arrayLinks[1];
        linkSite.target = "_blank";
        linkSite.textContent = "Link do site";

        if(themeWhite === false){
            linkSite.style.color = "black";
        }else {
            linkSite.style.color = "white";
        }

        linksProjetos.appendChild(linkSite);
    }

    meusProjetos.appendChild(divProjeto);
    
    if(themeWhite === false){

        titulo.style.color = "black";
        descricao.style.color = "black";
        linkRepositorio.style.color = "black";
        

    }else{

        titulo.style.color = "white";
        descricao.style.color = "white";
        linkRepositorio.style.color = "white";
    }
    
}

// Função para abrir o modal menu em telas menores

function abrirMenu() {
    
    modalMenu.style.display = "flex";
    iconeMenu.style.display = "none";
    
}

// Função que fecha o menu de dispositivos menores se a janela for redimensionada

function fecharMenuRedimensionar(){
    
    if(window.getComputedStyle(LinksMenu).display === "flex"){
        fecharMenu();
    }
}

// Função fechar menu das telas menores

function fecharMenu() {

    modalMenu.style.display = "none";
    iconeMenu.style.display = "flex";
}

// Função para fechar o menu ao clicar fora ou clicar em algum link

function fecharMenuClick(e) {
    if(e.target !== iconeClose){
        fecharMenu();
    }
}

// Função para mudar o tema e as cores dos elementos de acordo com o tema escolhido

function mudarTema() {

    relacaoProjetos.fecharProjetos(meusProjetos);
    btnProjetoFechado();

    if(themeWhite === true){        //verificando a variavel booleana do tema

        body.style.background = "white";     //mudando o background da pagina

        preDefinicao.forEach((elemento)=>{      //percorrendo todos os elemntos e mudando a cor
            elemento.style.color = "black"
        });
        
        titulosProjeto.style.color = "lightseagreen";

        Div.style.color = "lightseagreen";
        iconeLua.style.display = "flex";
        iconeSol.style.display = "none";
        

        localStorage.setItem("theme",`${themeWhite}`);
        themeWhite = false;

    }else {

        body.style.background = "black";       //mudando o background da pagina
        
        preDefinicao.forEach((elemento)=>{         //percorrendo todos os elemntos e mudando a cor
            elemento.style.color = "white"
        });

        IconesRedeSocial.forEach((elemento) => {
            elemento.style.color = "lightseagreen";
        });
        
        titulosProjeto.style.color = "lightseagreen";
        Div.style.color = "lightseagreen";
        iconeLua.style.display = "none";
        iconeSol.style.display = "flex";
        

        localStorage.setItem("theme",`${themeWhite}`);
        themeWhite = true;

    }
}

// Função typing que vai dar o efeito de digitação na tela inicial

function typing() {

    Div.textContent = texto.slice(0,iterador);
    iterador++;

    if(iterador > texto.length){        //quando o iterador for maior que a string e reseta o valor
        iterador = 0;
    }
}

loop = setInterval(typing,100);         //loop para a função typing ficar rodando

setTimeout(()=>{                        //definindo um tempo para limpr o intervalo, para que ele nao rode toda hora
    clearInterval(loop);
    Div.textContent = texto;
}, 6500)