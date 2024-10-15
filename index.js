const currentPowerElement = document.getElementById('current-power');
const totalEnergyElement = document.getElementById('total-energy');
let totalEnergy = 0;

// Configurando o gráfico de energia
const ctx = document.getElementById('energyChart').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Power Output (kW)',
            data: [],
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Função para simular a geração de energia
function generateRandomPower() {
    return (Math.random() * 5 + 1).toFixed(2); // gera valores entre 1 e 6 kW
}

// Função para atualizar os dados
function updateData() {
    const power = generateRandomPower();
    currentPowerElement.textContent = `${power} kW`;

    // Atualizando energia total gerada
    totalEnergy += parseFloat(power) / 12; // Acumulando energia gerada em intervalos de 5 segundos (5s/3600s = 1/12 h)
    totalEnergyElement.textContent = `${totalEnergy.toFixed(2)} kWh`;

    // Adicionando dados ao gráfico
    const time = new Date().toLocaleTimeString();
    energyChart.data.labels.push(time);
    energyChart.data.datasets[0].data.push(power);
    energyChart.update();

    // Mantendo o gráfico com até 10 pontos
    if (energyChart.data.labels.length > 10) {
        energyChart.data.labels.shift();
        energyChart.data.datasets[0].data.shift();
    }
}

// Atualizando os dados a cada 5 segundos
setInterval(updateData, 5000);
