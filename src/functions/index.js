function isBisexto(year) {
    if (year%400 === 0){
        return true;
    }

    if ((year%4 === 0) && (year%100 !== 0)){
        return true;
    }

    return false;
}

function daysOfMonth(number, year) {
    if (number === 2) {
        if (isBisexto(year)){
            return 29;
        }

        return 28;
    }

    if (number === 8) {
        return 31;
    }
    
    if (number === 1 || number === 3 || number === 5 || number === 7 || number === 9 || number === 11){
        return 31;
    }

    return 30;
}

function convertMili(ms) {
    let data = '';
    
    let ano = 1900;
    let mes = 1;
    let dia = 1;
    let hora = 0;
    let minuto = 0;
    let segundo = 0;

    while (ms > 31536000000) {
        ms -= 31536000000;
        ano++;
    }

    while (ms > 2) {
        
    }

    return data;
}



module.exports = { convertMili };
