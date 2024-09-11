// try
// catch
// throw

const dividir = (n1,n2) => {
    try{
        if(n2 === 0){
            throw new Error("No se puede dividir por cero"); // creando una instancia de Error
        }
        const res = n1 / n2
        return res;
    } catch(error){

        return error;
    }
}

const resultado = dividir(1,0);
console.log(resultado);
console.log(resultado instanceof Error); // El resultado es una instancia de Error?

if(resultado instanceof Error){
    console.error(resultado.message)
} else{
    console.log(resultado)
}


class Perro {
    "name" = "Pepe";
}

const pepe = new Perro();

console.log(pepe)