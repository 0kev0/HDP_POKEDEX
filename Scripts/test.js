const CallAPI = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(Result => { Result.json() } )
        .then(dataResult => { console.log(dataResult) });
        let datos = JSON.stringify(datos);
        console.log(datos);
}

CallAPI()