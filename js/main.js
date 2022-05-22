const api = 'api.frankfurter.app'
const selectMonedaFrom = document.querySelector('#tipoMoneda1')
const selectMonedaTo = document.querySelector('#tipoMoneda2')
const amountInput = document.querySelector('#amountInput')
const convertirDivisa = document.querySelector('#convertirDivisa')

let listadoDivisas
let amount = 0
let monedaFrom = 'default'
let monedaTo = 'default'


const obtenerDivisas = (url) => {
    return new Promise((res, rej) => {
        fetch(`https://${api}${url}`)
                .then(resp => resp.json())
                .then((data) => {
                    res(data)
                }, (error) => {
                    rej(error)
                })
    })
}

const init = async () => {
    try {
        listadoDivisas = await obtenerDivisas('/currencies');
        for (const key in listadoDivisas) {
            // console.log('DIVISA FOR IN ==> ', key)
            let option = document.createElement('option')
            option.value = key
            option.textContent = listadoDivisas[key]
            selectMonedaFrom.appendChild(option)
        }
        for (const key in listadoDivisas) {
            // console.log('DIVISA FOR IN ==> ', key)
            let option = document.createElement('option')
            option.value = key
            option.textContent = listadoDivisas[key]
            selectMonedaTo.appendChild(option)
        }
    } catch (e) {
        console.log(e)
    }

}
init()


const changeMonedaFrom = () => {
    selectMonedaFrom.addEventListener('change', (e) => {
        monedaFrom = selectMonedaFrom.value
        console.log(monedaFrom)
    })
}

const changeMonedaTo = () => {
    selectMonedaTo.addEventListener('change', (e) => {
        monedaTo = selectMonedaTo.value
        console.log(monedaTo)
    })
}

const changeAmount = () => {
    amountInput.addEventListener('change', (e) => {
        amount = amountInput.value
        console.log(amount)
    })
}

changeAmount()
changeMonedaFrom()
changeMonedaTo()


const obtenerConversion = () => {
    fetch(`https://${api}/latest?amount=${amount}&from=${monedaFrom}&to=${monedaTo}`)
            .then(resp => resp.json())
            .then((data) => {
                console.log('CONVERSIÓN DATA=>', data.rates)
                console.log('CONVERSIÓN DATA=>', data.rates.monedaTo)
            }).catch(function (err) {
        // There was an error
        console.error('ERROR', err)
    })
}


//Esto hice sin mirar el enunciado
// const inicio = () => {
//     let option = document.createElement('option')
//     option.value = ''
//
//     fetch(`https://${api}/currencies`)
//             .then(resp => resp.json())
//             .then((data) => {
//                 listadoDivisas = data
//                 console.log('MONEDAS LISTADO CÓDIGO Y NOMBRE =>', data)
//                 for (const key in listadoDivisas) {
//                     // console.log('DIVISA FOR IN ==> ', key)
//                     option = document.createElement('option')
//                     option.value = key
//                     option.textContent = listadoDivisas[key]
//                     selectMonedaFrom.appendChild(option)
//                 }
//                 for (const key in listadoDivisas) {
//                     // console.log('DIVISA FOR IN ==> ', key)
//                     option = document.createElement('option')
//                     option.value = key
//                     option.textContent = listadoDivisas[key]
//                     selectMonedaTo.appendChild(option)
//                 }
//             }).catch(function (err) {
//         // There was an error
//         console.error('ERROR', err)
//     })
// }


// const validar = () => {
//     if (monedaFrom === 'default' || monedaTo === 'default' || amount <= 0) {
//         convertirDivisa.disabled = true
//     } else {
//         convertirDivisa.disabled = false
//     }
// }


const myCanvas = createCanvas(600, 400);
myCanvas.parent('tabla');




