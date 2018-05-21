var tableInfo = [
    {
      name: 'Thor Walton',
      position: 'Developer',
      office: 'New York',
      age: 61,
      startDate: '2013/08/11',
      salary: 98540,
    },
    {
      name: 'Quinn Flynn',
      position: 'Support Lead',
      office: 'Edinburgh',
      age: 22,
      startDate: '2013/03/03',
      salary: 342000,
    },
    {
      name: 'Jennifer Acosta',
      position: 'Junior Javascript Developer',
      office: 'Edinburgh',
      age: 43,
      startDate: '2013/02/01',
      salary: 75650,
    },
    {
      name: 'Haley Kennedy',
      position: 'Senior Marketing Designer',
      office: 'London',
      age: 43,
      startDate: '2012/12/18',
      salary: 313500,
    },
    {
      name: 'Brielle Williamson',
      position: 'Integration Specialist',
      office: 'New York',
      age: 61,
      startDate: '2012/12/02',
      salary: 372000,
    },
    {
      name: 'Michael Silva',
      position: 'Marketing Designer',
      office: 'London',
      age: 66,
      startDate: '2012/11/27',
      salary: 198500,
    },
    {
      name: 'Bradley Greer',
      position: 'Software Engineer',
      office: 'London',
      age: 41,
      startDate: '2012/10/13',
      salary: 132000,
    },
    {
      name: 'Dai Rios',
      position: 'Personnel Lead',
      office: 'Edinburgh',
      age: 35,
      startDate: '2012/09/26',
      salary: 217500,
    },
    {
      name: 'Herrod Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      age: 59,
      startDate: '2012/08/06',
      salary: 137500,
    },
    {
      name: 'Zorita Serrano',
      position: 'SoftwareEngineer',
      office: 'San Francisco',
      age: 56,
      startDate: '2012/06/01',
      salary: 115000,
    },
    {
      name: 'Norita Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      age: 32,
      startDate: '2013/06/01',
      salary: 125000,
    },
  ];

// ========================================================== DRAWING ==============================================================

//Creating an elements
var table = document.createElement('table');
table.className = 'table table-sm sort';
var thead = document.createElement('thead');
thead.className = 'thead-light';
var tr = thead.insertRow(0);

// Filling a cells

for (var i = 0; i < tableInfo.length; i++) {
    var row = table.insertRow(i);
    row.className = 'num';
    row.setAttribute('data-range',i+1);
    var counter = 0;
    for (var key in tableInfo[i]){
        var cell = row.insertCell(counter);
        cell.innerHTML = tableInfo[i][key];
        counter++;
    }
}

// Creating a thead

var th = '';
var title;
for (var key in tableInfo[0]) {
    switch (key){
        case 'name':
        title = 'Name';
        break;
        case 'position':
        title = 'Position';
        break;
        case 'office':
        title = 'Office';
        break;
        case 'age':
        title = 'Age';
        break;
        case 'startDate':
        title = 'Start Date';
        break;
        case 'salary':
        title = 'Salary';
        break;
    }
    if (key == 'startDate') {
        th = th+'<th data-type=\'date\'>'+title+'</th>';
    } else{
    th = th+'<th data-type=\''+typeof tableInfo[0][key]+'\'>'+title+'</th>';
    }
}
tr.innerHTML = th;

// Publication

document.getElementById('customers').appendChild(table);
table.insertBefore(thead,table.children[0]);

//============================================================ SORTING ============================================================

//Define function
table.onclick = function(e) {
    if (e.target.tagName != 'TH') return;
    sorter(e.target.cellIndex, e.target.getAttribute('data-type'));
};
//Creating an array of rows
var tbody = table.getElementsByTagName('tbody')[0];
var rowsArray = [].slice.call(tbody.rows);
//Вызов счётчиков
var c, c0 = 1, c1 = 1, c2 = 1, c3 = 1, c4 = 1, c5 = 1;

function sorter(numCol, type) {
    var compare;
//Define kinds of compare
    switch (type) {
        case 'number':
            compare = function(rowA, rowB) {
            return rowA.cells[numCol].innerHTML - rowB.cells[numCol].innerHTML;
            };
            break;
        case 'string':
            compare = function(rowA, rowB) {
            return rowA.cells[numCol].innerHTML.localeCompare(rowB.cells[numCol].innerHTML);
            };
            break;
        case 'date':
            compare = function(rowA, rowB){
                return Date.parse(rowA.cells[numCol].innerHTML) - Date.parse(rowB.cells[numCol].innerHTML);
            }
    }
    switch(numCol) {
        case 0:
        c0 += 1;
        c = c0%2;
        break;
        case 1:
        c1 += 1;
        c = c1%2;
        break;
        case 2:
        c2 += 1;
        c = c2%2;
        break;
        case 3:
        c3 += 1;
        c = c3%2;
        break;
        case 4:
        c4 += 1;
        c = c4%2;
        break;
        case 5:
        c5 += 1;
        c = c5%2;
        break;
    }
    rowsArray.sort(compare);
    if (c == 0){
      for (var i = 0; i < rowsArray.length; i++) {
          rowsArray[i].setAttribute('data-range',i+1);
          tbody.appendChild(rowsArray[i]);
      }
    } else {
      for (var i = rowsArray.length-1; i > -1; i--) {
        rowsArray[i].setAttribute('data-range',c);
        tbody.appendChild(rowsArray[i]);
        c++;
      }
      rowsArray = [].slice.call(tbody.rows);
    }

    //For pagination updating
    var nums = 1;
    var dataPage = 0;
    mainPage.classList.remove('paginatorActive');
    mainPage = document.getElementById('page1');
    mainPage.classList.add('paginatorActive');

    var j = 0;
    for (var i = 0; i < rowsArray.length; i++) {
        var dataRange = rowsArray[i].dataset.range;
        if (dataRange <= dataPage || dataRange >= dataPage)
        rowsArray[i].style.display = 'none';

    }
    for (var i = dataPage; i < rowsArray.length; i++) {
        if (j >= cnt) break;
        rowsArray[i].style.display = 'table-row';
        j++;
    }
}

//======================================================= PAGINATION ==============================================================

//There is nothing to explain
document.querySelector('.paginator').onclick = function(){
    pagination();
};
var count = rowsArray.length;
var cnt = 5;
var cnt_page = Math.ceil(count / cnt);

var paginator = document.querySelector('.paginator');
var page = '';
for (var i = 0; i < cnt_page; i++) {
  page += '<span data-page=' + i * cnt + '  id=\'page' + (i + 1) + '\'>' + (i + 1) + '</span>';
}
paginator.innerHTML = page;

for (var i = 0; i < rowsArray.length; i++) {
  if (i < cnt) {
    rowsArray[i].style.display = 'table-row';
  }
}

var mainPage = document.getElementById('page1');
mainPage.classList.add('paginatorActive');

function pagination(event) {
  var e = event || window.event;
  var target = e.target;
  var id = target.id;
  
  if (target.tagName.toLowerCase() != 'span') return;
  
  var nums = id.substr(4);
  var dataPage = +target.dataset.page;
  mainPage.classList.remove('paginatorActive');
  mainPage = document.getElementById(id);
  mainPage.classList.add('paginatorActive');

  var j = 0;
  for (var i = 0; i < rowsArray.length; i++) {
    var dataRange = rowsArray[i].dataset.range;
    if (dataRange <= dataPage || dataRange >= dataPage)
      rowsArray[i].style.display = 'none';

  }
  for (var i = dataPage; i < rowsArray.length; i++) {
    if (j >= cnt) break;
    rowsArray[i].style.display = 'table-row';
    j++;
  }
}