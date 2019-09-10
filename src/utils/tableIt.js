export function tableIt (element, data, options) {
    let mutableData = [...data];
    let prevKey;

    const pagination = document.createElement('div');
    pagination.classList.add('btn-group');

    const handleClickFactory = (index) => () => {
        renderRows(index * options.maxPerPage);
    };

    const renderButtons = (length, activePage = 0) => {
        [].slice.call(pagination.children).forEach((child) => {
            pagination.removeChild(child);
        })
        console.log(length, options.maxPerPage)
        const count = Math.ceil(length / options.maxPerPage);
        Array.call(...new Array(count + 1)).forEach((_, index) => {
            const button = document.createElement('button');
            button.innerText = index + 1;
            button.classList.add('btn');
            button.classList.add('btn-secondary');
            if (index === activePage) {
                button.classList.add('active');
            }
            button.addEventListener('click', handleClickFactory(index));
            pagination.appendChild(button);
        })
    }

    const table = document.createElement('table');
    table.classList.add('table');
    const thead = table.createTHead();
    thead.classList.add('thead-light');
    const headRow = thead.insertRow();
    
    const handleHeaderClickFactory = (key) => () => {
        mutableData = key !== prevKey ? mutableData.sort((a, b) => {
            if (!!+new Date(a[key]) && !!+new Date(b[key])) {
                if (new Date(a[key]) > new Date(b[key])) return 1;
                if (new Date(a[key]) < new Date(b[key])) return -1;
                return 0;
            }

            if (!!Number(a[key]) && !!Number(b[key])) {
                if (Number(a[key]) > Number(b[key])) return 1;
                if (Number(a[key]) < Number(b[key])) return -1;
                return 0;
            }

            if (a[key].toUpperCase() > b[key].toUpperCase()) return 1;
            if (a[key].toUpperCase() < b[key].toUpperCase()) return -1;
            return 0;
        }) : mutableData.reverse();

        prevKey = key;

        renderRows();
    };

    for (const label in data[0]) {
        const cell = document.createElement('th');
        cell.innerText = label;
        cell.addEventListener('click', handleHeaderClickFactory(label));
        headRow.appendChild(cell);
    }

    const tbody = table.createTBody();

    function renderRows (offset = 0) {
        [].slice.call(tbody.children).forEach(element => {
            tbody.removeChild(element);
        });

        mutableData.slice(offset, offset + options.maxPerPage)
            .forEach((item) => {
                const row = tbody.insertRow();
                for (const key in item) {
                    const cell = row.insertCell();
                    cell.innerText = !!+new Date(item[key]) && new Date(item[key]).toISOString() === item[key] ?
                        new Date(item[key]).toLocaleDateString() : item[key];
                }
            });

        renderButtons(mutableData.length, offset / options.maxPerPage);
    }

    const handleInput = ({currentTarget: {value}}) => {
        mutableData = data.filter(({name}) => {
            return new RegExp(`(^|\\b)${value}`, 'i').test(name);
        });
        renderRows();
    };

    const searcher = document.createElement('div');
    searcher.classList.add('input-group');
    searcher.classList.add('mb-3');
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Type name...');
    searchInput.addEventListener('input', handleInput);
    searchInput.classList.add('form-control');
    searcher.appendChild(searchInput);

    renderRows();

    element.appendChild(searcher);
    element.appendChild(table);
    element.appendChild(pagination);
}
