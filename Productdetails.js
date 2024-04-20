const productId = new URLSearchParams(window.location.search).get('id');
fetch(`https://productsjson-kph3.onrender.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetailsContainer = document.getElementById('product-details');
        const productImagesContainer = document.createElement('div'); 
        productImagesContainer.classList.add("imagecont")
        
        product.images.forEach(image => {
            if (image) { 
                const img = document.createElement('img');
                img.src = image;
                img.alt = product.name;
                productImagesContainer.appendChild(img); 
            }
        });

        const shortDescription = product.description.slice(0, 15);
        const productDetails = `
            <div class="product-details">
                <h2>${product.name}</h2>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${shortDescription}</p>
            </div>
        `;
        
        productDetailsContainer.innerHTML = productDetails;
        productDetailsContainer.appendChild(productImagesContainer); 
    })
    .catch(error => console.error('Error fetching data:', error));
