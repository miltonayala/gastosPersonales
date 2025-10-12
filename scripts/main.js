function getDate() { //Para obtener el mes para el titulo y tambien hacer la primera letra en mayuscula
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {year: 'numeric', month: 'long'});
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    console.log(capitalizedDate);
    return capitalizedDate;
}

getDate();