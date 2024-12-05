async function obterTaxaSelic() {
    try {
        const response = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json");
        const data = await response.json();
        return data.valor; // Retorna o valor atual da taxa Selic
    } catch (error) {
        console.error("Erro ao obter a taxa Selic:", error);
        alert("Não foi possível obter a taxa Selic. Usando valor padrão de 13.75%.");
        return 13.75; // Valor padrão em caso de erro
    }
}

async function configurarTaxaSelic() {
    const taxaSelic = await obterTaxaSelic();
    document.getElementById("taxaSelicDisplay").innerText = `${taxaSelic.toFixed(2)}%`;
    return taxaSelic / 100; // Convertendo para decimal
}

async function calcularInvestimento() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const taxaSelic = await configurarTaxaSelic(); // Obtém a taxa Selic em tempo real
    const meses = parseInt(document.getElementById('meses').value);

    if (isNaN(valorInicial) || isNaN(meses)) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    const rendimentos = [];
    let montante = valorInicial;

    for (let i = 0; i < meses; i++) {
        montante += montante * (taxaSelic / 12); // Taxa Selic anual convertida para mensal
        rendimentos.push(montante.toFixed(2));
    }

    document.getElementById('resultado').innerText = `Montante após ${meses} meses: R$ ${montante.toFixed(2)}`;

    desenharGrafico(rendimentos);
}

function desenharGrafico(dados) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const labels = dados.map((_, i) => `Mês ${i + 1}`);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Evolução do Investimento',
                data: dados,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Montante (R$)',
                    },
                },
            },
        }
    });
}

// Configura a taxa Selic ao carregar a página
window.onload = configurarTaxaSelic;
