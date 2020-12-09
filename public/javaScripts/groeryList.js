let groceryList = [];

let sortDirection = false;
window.onload = () => {
    fetchGroceryList();
    loadTableData();
    console.log(totalPrice())
}

const setTableData = (groceries) => {
    groceryList = groceries
}
const fetchGroceryList = () => {
    fetch('/api/groceries')
        .then((res) => res.json())
        .then((data) => {
            setTableData(data);
            loadTableData(data);
            console.log('response from api', data)
        })
}

const totalPrice = () => {
    const total =  groceryList && groceryList.reduce((acc, curr) => {
        return acc + curr.cost
    }, 0)
    return total
}

function loadTableData(groceryList){
    const tableBody = document.getElementById('tableData');
    let data_html = '';
    const priceTotal = totalPrice();
    groceryList && groceryList.length && groceryList.forEach((item, idx) => {
        console.log(item.name);
        data_html += `<tr><td><img src=${item.imgUrl}></td><td>${item.name}</td><td>${item.cost}</td></tr>`
    })

    //print console
    console.log(data_html);
    tableBody.innerHTML = data_html + `<td>Sum</td>`+`<td></td>`+`<td>${priceTotal}</td>`;

}
