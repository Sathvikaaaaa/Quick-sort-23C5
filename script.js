let array = [];

function generateArrayFromInput() {
    const input = document.getElementById('inputNumbers').value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    renderArray();
}

function renderArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = '40px'; // Scale height

        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = value;

        bar.appendChild(number);
        container.appendChild(bar);
    });
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
    renderArray();
}

async function partition(arr, left, right) {
    const pivotValue = arr[right];
    let pivotIndex = left;
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            renderArray();
            await new Promise(resolve => setTimeout(resolve, 300)); // Visual delay
        }
    }
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    renderArray();
    return pivotIndex;
}

document.getElementById('generate').addEventListener('click', generateArrayFromInput);

document.getElementById('sort').addEventListener('click', () => {
    quickSort(array);
});

// Initial state
renderArray();
