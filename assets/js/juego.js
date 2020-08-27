
// Patron modulo
//funcion anonima autoinvocada
const miModulo = (() =>{
    'use strict'

    
    let deck          = []
    const tipos       = ['C','D','H','S'],
          especiales  = ['A','J','Q','k'];

/*     let puntosJugador = 0,
        puntosComputadora = 0; */
    let puntosJugadores = [];   
    //referencias del HTML
    const btnPedir  = document.querySelector('#btnPedir'),
          btnDetenr = document.querySelector('#btnDetener'),
          btnNuevo  = document.querySelector('#btnNuevo');

    const divCartasJugador     = document.querySelectorAll('.divCartas'),
            puntosHTML         = document.querySelectorAll('small');

    // esta funcion inicialliza el juego
    const inicializarJuego = ( numJugadores = 2) =>{
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
            
        }
        puntosHTML.forEach( elemento => elemento.innerText = 0);

        divCartasJugador.forEach(elemento => elemento.innerHTML = '');

        btnPedir.disabled = false;
        btnDetenr.disabled = false;
    }

    const crearDeck = () =>{

        deck = [];
        for (let i = 2; i <=10; i++) {

            for(let tipo of tipos){

                deck.push(i + tipo)
            }
            
        }// fin for

        for(let tipo of tipos){

            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }// fin for of tipo

        return _.shuffle(deck);
    }

    // esta funcion me permite tomar una carta
    const pedirCarta = () =>{
        
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    // sirve para obtener el valor de la carta0
    const valorCarta = (carta) =>{

        const valor = carta.substring(0,carta.length-1);
        // isNan = no es un numero - deveulve booelan true si no es un numero
        return (isNaN(valor)) ? 
                 (valor === 'A') ? 11 : 10 
                : valor * 1  
    /*    if(isNaN(valor)){
            puntos = (valor === 'A') ? 11 : 10
        }else{
            puntos = valor * 1 
        } */

    }

    const acumularPuntos = ( carta, turno ) =>{
        
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntosHTML[turno].innerHTML= puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta,turno) =>{

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos,puntosComputadora] = puntosJugadores;
        console.log(puntosMinimos+','+puntosComputadora);
        setTimeout(() => {
            if(puntosComputadora  === puntosMinimos) { 
                alert('NADIE GANA')
            }else if(puntosMinimos > 21){  
            alert('GANA EL COMPUTADOR')
            }else{ 
            alert('GANA EL JUGADOR')
            }
            reiniciarJuego()
        }, 50);

    }
    // turno de la computadora
    const turnoComputadora = (puntosMinimos) =>{

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);

            if(puntosMinimos > 21){
                break;
            }
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <=21) );

        determinarGanador();
    }

    // eventos 

    btnPedir.addEventListener('click',()=>{

        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta,0);
        
        crearCarta(carta,0);

        if (puntosJugador >21) {
            btnPedir.disabled = true
            btnDetenr.disabled = true
            turnoComputadora( puntosJugador )
        }else if(puntosJugador === 21){
            btnPedir.disabled = true
            btnDetenr.disabled = true
            turnoComputadora( puntosJugador )
        } 
    });

    btnDetenr.addEventListener('click',()=>{

        btnPedir.disabled = true;

        turnoComputadora(puntosJugador)
    })

    const reiniciarJuego = () =>{

/*         deck = [];
        deck = crearDeck(); */
        inicializarJuego();
   
    }

    btnNuevo.addEventListener('click',()=>{
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();// fin funcion anonima autoinvocada
