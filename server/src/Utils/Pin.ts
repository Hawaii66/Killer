function GetRandomPin()
{
    return Array.from(Array(4).keys()).map(_=>getRandomIntInclusive(0, 9).toString()).join("");
}

function getRandomIntInclusive(min:number, max:number):number 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export default GetRandomPin;