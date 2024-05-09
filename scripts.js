
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

lerProjetos();

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

// Ler projetos do projetos.json

async function lerProjetos(){

    let dados = await fetch("projetos.json");
    let projetos = await dados.json();
    console.log(projetos);

    projetos.forEach(projeto => {
        relacaoProjetos.addProjeto(new Projeto(projeto.titulo, projeto.descricao, projeto.imagens, projeto.links));
    });
}

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