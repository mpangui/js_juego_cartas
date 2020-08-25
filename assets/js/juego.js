
let deck = []
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','k']
let puntosJugador = 0
let puntosComputadora = 0
//referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetenr = document.querySelector('#btnDetener')
const btnNuevo  = document.querySelector('#btnNuevo')

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const puntosHTML = document.querySelectorAll('small');

const crearDeck = () =>{

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
    deck = _.shuffle(deck)
    return deck;
}

// esta funcion me permite tomar una carta
crearDeck()

const pedirCarta = () =>{
    
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop()
    return carta
}

//pedirCarta()

const valorCarta = (carta) =>{

    const valor = carta.substring(0,carta.length-1)
    // isNan = no es un numero - deveulve booelan true si no es un numero
     return (isNaN(valor)) ? 
            puntos = (valor === 'A') ? 11 : 10 
            : puntos = valor * 1  
 /*    if(isNaN(valor)){
        puntos = (valor === 'A') ? 11 : 10
    }else{
        puntos = valor * 1 
    } */

}

// turno de la computadora

const turnoComputadora = (puntosMinimos) =>{

    do {
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntosHTML[1].innerHTML= puntosComputadora
        
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta)

        if(puntosJugador > 21){
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

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

// eventos 

btnPedir.addEventListener('click',()=>{

    carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerHTML= puntosJugador
    
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta)

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

    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerHTML= '0';
    puntosHTML[1].innerHTML= '0';
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    btnPedir.disabled = false;
    btnDetenr.disabled = false;
}

btnNuevo.addEventListener('click',()=>{
    reiniciarJuego()
});
