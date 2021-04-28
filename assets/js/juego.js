
//encapsulacion de codigo en una funcion anonima autoinvocada con use strict

const capsula = (()=>{
    'use strict'

    let deck = [];

    const palo = ['C','D','H','S'],
          figuras = ['A','J','Q','K'];


    //referencias html
    const btnNuevo = document.querySelector('#nuevo'),
          btnPedir = document.querySelector('#pedir'),
          btnParar = document.querySelector('#parar');

    const cartasJugador = document.querySelector('#jugador-cartas'),
          cartasPC = document.querySelector('#pc-cartas'),
          puntajeJugador = document.querySelector('#puntaje-jugador'),
          puntajePC = document.querySelector('#puntaje-pc');


    //Puntuacion
    let puntosJugador = 0,
        puntosPC = 0,
        valor = 0,
        tmpValor = 0;

    
    const disableBtn = () => {
        btnPedir.disable = true;
        btnParar.disable = true;  
        return false;
    }

    const actualizaTurno = () => {

    }

    const createDeck = () => {

        deck = [];

        puntosJugador = 0;
        puntosPC = 0;
        
        cartasJugador.innerHTML = ''; 
        cartasPC.innerHTML = '';
        puntajeJugador.innerHTML = '0'; 
        puntajePC.innerHTML = '0';  

        let i = 0;
        let j = 0;

        for( i = 2; i <= 10; i++ ){
            for( j = 0; j < 4; j++ ){
                deck.push(`${i}${palo[j]}`);  
            }   
        }

        for( i = 0; i < 4; i++ ){
            for( j = 0; j < 4; j++ ){
                deck.push(`${figuras[i]}${palo[j]}`);  
            }  
        } 
        
        deck = _.shuffle(deck);
        return deck;
    }


    const pedirCarta = (turno) => {
        if (deck.lenght !== 0){
            const carta = deck.pop();
            muestraCarta(carta, turno);
            return carta;
        }
    }

    const valorCarta = (carta) => {

        let valorNumerico;
        const valorCarta = carta.slice(0, -1);

        if(isNaN(valorCarta))
            valorNumerico = (valorCarta === "A") ? 11 : 10; 
        else
            valorNumerico = parseInt(valorCarta);

        return valorNumerico;
    }

    const muestraCarta = (carta, turno) => {

        const img = document.createElement('img');
        img.src = `assets/cartas/${carta}.png`;
        img.classList.add('carta');

        if (turno === 'jugador') 
            cartasJugador.append(img);
        else   
            cartasPC.append(img);
    }

    const finPartida = (mensaje) => {
        const empezar = confirm(mensaje);
        if(empezar)
            btnNuevo.click();

        return false;
    }

    const turnoPC = () => {
        do {
            valor =  pedirCarta('pc');
            tmpValor = valorCarta(valor);
            puntosPC = puntosPC + tmpValor;
            puntajePC.innerHTML = puntosPC;

            if(puntosJugador > 21 || puntosPC === 21)
                break;

        } while ((puntosPC <= puntosJugador) && puntosJugador <= 21);

        setTimeout(()=>{
            if(puntosPC === puntosJugador)
                finPartida('Empate!!! \n¿Quieres empezar otra partida?'); 
            else if(puntosPC < puntosJugador && puntosJugador <= 21){
                finPartida('Enhorabuena has ganado\n¿Quieres empezar otra partida?'); 
            }
            else if (puntosPC > puntosJugador && puntosPC <= 21){
                finPartida('Lo siento has perdido\n¿Quieres empezar otra partida?'); 
            }
            else if (puntosJugador > 21){
                finPartida('Lo siento has perdido\n¿Quieres empezar otra partida?'); 
            }
            else if (puntosPC > puntosJugador && puntosJugador <= 21){
                finPartida('Enhorabuena has ganado\n¿Quieres empezar otra partida?');  
            }
        }, 100)
    }

    btnNuevo.addEventListener('click', () => {
        createDeck();  
    });

    btnPedir.addEventListener('click', () => {

        if(deck.length === 0)
            createDeck();

        if(puntosJugador <= 21){
            valor =  pedirCarta('jugador');
            tmpValor = valorCarta(valor);
            puntosJugador = puntosJugador + tmpValor;
            puntajeJugador.innerHTML = puntosJugador;
            if(puntosJugador > 21){   
                disableBtn();
                turnoPC();  
            }
            else if (puntosJugador === 21){
                disableBtn();
                turnoPC();   
            }
        }

    });

    btnParar.addEventListener('click',()=>{
        disableBtn();  
        turnoPC();
    });

    //lo que devolvamos aqui sera publico en el frontend
    return {

    };
})();

