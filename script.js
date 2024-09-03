document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    let cep = document.getElementById("cep").value;

    if (cep.length !== 8) {
        alert("CEP Inválido!");
        return;
    }

    buscarEndereco(cep);
});

function buscarEndereco(cep) {
    let url = "https://viacep.com.br/ws/" + cep + "/json/";

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Não foi possível buscar seu endereço!");
            }
        })
        .then(function (data) {
            let resultado = document.querySelector("#resultado");
            resultado.innerHTML = `
                <p>Cidade: ${data.localidade} - ${data.uf}</p>
                <p>Logradouro: ${data.logradouro}</p>
                <p>Bairro: ${data.bairro}</p>
            `;
            mostrarDiv();
        })
        .catch(function (error) {
            let resultado = document.querySelector("#resultado");
            resultado.innerText = error.message;
            mostrarDiv();
        });
}

function mostrarDiv() {
    document.getElementById('resultado').style.display = 'block';
}
