const api = 'api.frankfurter.app'
const selectMonedaFrom = document.querySelector('#tipoMoneda1')
const selectMonedaTo = document.querySelector('#tipoMoneda2')
const amountInput = document.querySelector('#amountInput')
const resultadoConversion = document.querySelector('#resultadoConversion')
const convertirDivisa = document.querySelector('#convertirDivisa')

let listadoDivisas
let amount = 0
let monedaFrom = 'default'
let monedaTo = 'default'
let rates = []


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
        listadoDivisas = await obtenerDivisas('/currencies')
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
init().catch(err => console.error(err))


const changeMonedaFrom = () => {
    selectMonedaFrom.addEventListener('change', (e) => {
        monedaFrom = selectMonedaFrom.value
        console.log(monedaFrom)
        validar()
    })
}
changeMonedaFrom()

const changeMonedaTo = () => {
    selectMonedaTo.addEventListener('change', (e) => {
        monedaTo = selectMonedaTo.value
        console.log(monedaTo)
        validar()
    })
}
changeMonedaTo()

const changeAmount = () => {
    amountInput.addEventListener('change', (e) => {
        amount = amountInput.value
        console.log(amount)
        validar()
    })
}
changeAmount()


const obtenerConversion = () => {
    fetch(`https://${api}/latest?amount=${amount}&from=${monedaFrom}&to=${monedaTo}`)
            .then(resp => resp.json())
            .then((data) => {
                console.log('CONVERSIÓN DATA=>', data.rates)
                console.log('CONVERSIÓN DATA=>', data.rates[monedaTo])
                let resultado = document.createElement('p')
                resultadoConversion.appendChild(resultado)
                resultado.innerText = `El resultado de la conversión es ${data.rates[monedaTo]}`

            }).catch(function (err) {
        // There was an error
        console.error('ERROR', err)
    })
    historicoConversion()
}

const historicoConversion = () => {
    fetch(`https://${api}/2021-01-01..?to=${monedaTo}`)
            .then(resp => resp.json())
            .then((data) => {
                console.log('CONVERSIÓN DATA=>', data)
            }).catch(function (err) {
        // There was an error
        console.error('ERROR', err)
    })
}

const validar = () => {
    convertirDivisa.disabled = monedaFrom === 'default' || monedaTo === 'default' || amount <= 0 || monedaFrom === monedaTo
}

let table
let yaxis = [0]
let maxx = 0
let minx = 0

let lineasX, lineasY
let width = 600
let height = 400
let margin = 40
let meses = 0


function setup() {
    const myCanvas = createCanvas(width, height)
    myCanvas.parent('tabla')
}

const diferenciaMeses = (fini = new Date(2021, 0, 1), ffin = new Date()) => {
    meses = ffin.getMonth() - fini.getMonth() + 12 * (ffin.getFullYear() - fini.getFullYear())
}

diferenciaMeses()

const getMonthName = (position) => {
    const meses = [
        'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ]

    return meses[position]
}

function draw() {
    background(220)
    let cantidad = 0

    //lineas alto
    let yaxis = height - margin
    let yDiv = (height - (margin * 2)) / 20


    do {
        text((cantidad++ / 10).toFixed(1), margin - 28, yaxis + 5)
        rect(margin, yaxis, width - margin * 2, 0.5)
        yaxis -= yDiv
    } while (cantidad <= 20)

    // lineas verticales
    let lineas = 0
    let xAxis = margin
    let xDiv = (width - (margin * 2)) / meses
    let mesIni = new Date(2021, 0, 1).getMonth()
    do {
        if (mesIni > 11) mesIni = 0
        text(getMonthName(mesIni++), xAxis - 3, height - margin + 20)
        rect(xAxis, margin, 0.5, height - margin * 2)
        xAxis += xDiv
        lineas += 1
    } while (lineas <= meses)


}