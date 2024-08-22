document.addEventListener('DOMContentLoaded', () => {
  
  let items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
  ];

  let column2 = [
    {
      id: '1',
      name: 'Box 1',
      items: [
        { id: '7', name: 'Item 7' },
        { id: '8', name: 'Item 8' },
      ],
    },
  ];

  let column3 = [
    {
      id: '2',
      name: 'Box 2',
      items: [
        { id: '5', name: 'Item 5' },
        { id: '6', name: 'Item 6' },
      ],
    },
    {
      id: '3',
      name: 'Box 3',
      items: [
        { id: '9', name: 'Item 9' },
        { id: '10', name: 'Item 10' },
      ],
    },
  ];

  function addItem(id) {
    const item = items.find((i) => i.id === id);
    column2[0].items.push(item);
    items = items.filter((i) => i.id !== id);
  }

  function removeItem(column, id) {
    column.forEach((box) => {
      box.items = box.items.filter((item) => item.id !== id);
    });
  }

  function removeBox(boxId) {
    column3.forEach((box) => {
      if (box.id === boxId) {
        items = [...items, ...box.items];
        box.items = [];
      }
    });
    column3 = column3.filter((box) => box.id !== boxId);
  }

  function moveBox(from, to, boxId) {
    from.forEach((box) => {
      if (box.id === boxId) {
        to.push(box);
      }
    });
    return from.filter((box) => box.id !== boxId);
  }

  const column1Container = document.getElementById('column1');
  const column2Container = document.getElementById('column2');
  const column3Container = document.getElementById('column3');

  function renderColumn1() {
    column1Container.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className =
        'flex items-center bg-white p-4 border border-gray-300 rounded-lg shadow-md';
      li.setAttribute('data-id', item.id);
      li.draggable = true;
      li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.id);
      });
      li.innerHTML = `
        <button class="add-item h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-700" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <span class="text-lg font-semibold text-gray-700 ml-2">${item.name}</span>
      `;
      column1Container.appendChild(li);
    });
  }

  function renderColumn2() {
    column2Container.innerHTML = '';
    column2.forEach((box) => {
      const boxDiv = document.createElement('div');
      boxDiv.className =
        'box p-4 bg-gray-100 rounded border border-gray-300';
      boxDiv.setAttribute('data-id', box.id);
      boxDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      boxDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        if (itemId) {
          addItem(itemId);
          updateDOM();
        }
      });
      boxDiv.innerHTML = `
        <div class="flex items-center mb-2">
          <button class="move-to-3 h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" data-id="${
            box.id
          }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h3 class="text-lg font-semibold">${box.name}</h3>
        </div>
        <ul class="space-y-2" id="box-${box.id}">
          ${box.items
            .map(
              (item) => `
              <li draggable="true" class="flex items-center bg-white p-4 border border-gray-300 rounded-lg shadow-md" data-id="${item.id}">
                <button class="remove-item h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" data-id="${item.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span class="text-lg font-semibold text-gray-700 ml-2">${item.name}</span>
              </li>
            `
            )
            .join('')}
        </ul>
      `;
      column2Container.appendChild(boxDiv);
    });
  }

  function renderColumn3() {
    column3Container.innerHTML = '';
    column3.forEach((box) => {
      const boxDiv = document.createElement('div');
      boxDiv.className =
        'box p-4 bg-gray-100 rounded border border-gray-300';
      boxDiv.setAttribute('data-id', box.id);
      boxDiv.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <button class="move-to-2 h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" data-id="${
              box.id
            }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 class="text-lg font-semibold">${box.name}</h3>
          </div>
          <button class="remove-box h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" data-id="${
            box.id
          }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul class="space-y-2" id="box-${box.id}">
          ${box.items
            .map(
              (item) => `
              <li class="flex items-center bg-white p-4 border border-gray-300 rounded-lg shadow-md" data-id="${item.id}">
                <button class="h-6 w-6 text-green-500 cursor-pointer hover:text-green-700" data-id="${item.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <span class="text-lg font-semibold text-gray-700 ml-2">${item.name}</span>
              </li>
            `
            )
            .join('')}
        </ul>
      `;
      column3Container.appendChild(boxDiv);
    });
  }

  function updateDOM() {
    renderColumn1();
    renderColumn2();
    renderColumn3();
    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll('.add-item').forEach((button) => {
      button.addEventListener('click', (e) => {
        const itemElement = e.target.closest('[data-id]');
        const itemId = itemElement ? itemElement.dataset.id : null;

        addItem(itemId);
        updateDOM();
      });
    });

    document.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', (e) => {
        const itemElement = e.target.closest('[data-id]');
        const itemId = itemElement ? itemElement.dataset.id : null;
        items.push({ id: itemId, name: `Item ${itemId}` });
        removeItem(column2, itemId);
        updateDOM();
      });
    });

    document.querySelectorAll('.remove-box').forEach((button) => {
      button.addEventListener('click', (e) => {
        const boxElement = e.target.closest('[data-id]');
        const boxId = boxElement ? boxElement.dataset.id : null;
        removeBox(boxId);
        updateDOM();
      });
    });

    document.querySelectorAll('.move-to-2').forEach((button) => {
      button.addEventListener('click', (e) => {
        const boxElement = e.target.closest('[data-id]');
        const boxId = boxElement ? boxElement.dataset.id : null;
        column3 = moveBox(column3, column2, boxId);
        updateDOM();
      });
    });

    document.querySelectorAll('.move-to-3').forEach((button) => {
      button.addEventListener('click', (e) => {
        const boxElement = e.target.closest('[data-id]');
        const boxId = boxElement ? boxElement.dataset.id : null;
        column2 = moveBox(column2, column3, boxId);
        updateDOM();
      });
    });

    document
      .querySelector('.add-box')
      .addEventListener('click', (e) => {
        const boxCount = column2.length+column3.length+1;
        console.log(boxCount);
        
        column3.push({
          id: `${boxCount}`,
          name: `Box ${boxCount}`,
          items: [],
        });
        updateDOM();
      });
  }

  updateDOM();
});
