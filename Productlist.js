let productsData = [];

fetch('https://productsjson-kph3.onrender.com/products')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        displayProducts(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayProducts(data) {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';

    data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.onclick = function() {
            productDetails(product.id);
        };
    
        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.name;
    
        const heading = document.createElement('h3');
        heading.textContent = product.name;
    
        const paragraph = document.createElement('p');
        paragraph.textContent = '$'+product.price;
    
        productCard.appendChild(img);
        productCard.appendChild(heading);
        productCard.appendChild(paragraph);
    
        productListContainer.appendChild(productCard);
    });
    
}

function productDetails(productId) {
    window.location.href = `productdetails.html?id=${productId}`;
}

function sortProductsByPrice(order) {
    const sortedData = [...productsData];
    sortedData.sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
    displayProducts(sortedData);
}

function filterProductsByCategory(category) {
    const filteredData = category === '' ? productsData : productsData.filter(product => product.category === category);
    displayProducts(filteredData);
}
