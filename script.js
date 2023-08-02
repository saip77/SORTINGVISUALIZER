const arrayContainer = document.getElementById("array-container");
const speedSlider = document.getElementById("speed-slider");
const arraySizeInput = document.getElementById("array-size");

function generateArray() {
  const arraySize = parseInt(arraySizeInput.value, 10);
  if (isNaN(arraySize) || arraySize < 5 || arraySize > 100) {
    alert("Please enter a valid array size between 5 and 100.");
    return;
  }

  const array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
  displayArray(array);
}

function displayArray(array) {
  arrayContainer.innerHTML = "";
  for (const value of array) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value * 2}px`;
    arrayContainer.appendChild(bar);
  }
}

async function bubbleSort(array) {
  const len = array.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (array[i] > array[i + 1]) {
        await swap(array, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

async function insertionSort(array) {
  const len = array.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      await swap(array, j, j - 1);
      j--;
    }
  }
}

async function quickSort(array, low = 0, high = array.length - 1) {
  if (low < high) {
    const partitionIndex = await partition(array, low, high);
    await quickSort(array, low, partitionIndex - 1);
    await quickSort(array, partitionIndex + 1, high);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;
      await swap(array, i, j);
    }
  }

  await swap(array, i + 1, high);
  return i + 1;
}

async function swap(array, idx1, idx2) {
  await sleep(100 - speedSlider.value); // Speed control
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  displayArray(array);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startBubbleSort() {
  const bars = document.querySelectorAll(".bar");
  const array = Array.from(bars, bar => Number(bar.style.height.slice(0, -2)) / 2);
  bubbleSort(array).then(() => console.log("Bubble Sort Done!"));
}

function startInsertionSort() {
  const bars = document.querySelectorAll(".bar");
  const array = Array.from(bars, bar => Number(bar.style.height.slice(0, -2)) / 2);
  insertionSort(array).then(() => console.log("Insertion Sort Done!"));
}

function startQuickSort() {
  const bars = document.querySelectorAll(".bar");
  const array = Array.from(bars, bar => Number(bar.style.height.slice(0, -2)) / 2);
  quickSort(array, 0, array.length - 1).then(() => console.log("Quick Sort Done!"));
}

generateArray();
