class ProductCartRecommendations extends HTMLElement {
    constructor() {
        super();

        const handleIntersection = (entries, observer) => {
            if (!entries[0].isIntersecting) return;
            observer.unobserve(this);
            fetch(this.dataset.url)
                .then(response => response.text())
                .then(text => {
                    const html = document.createElement('div');
                    html.innerHTML = text;
                    const recommendations = html.querySelector('product-cart-recommendations');

                    if (recommendations && recommendations.innerHTML.trim().length) {
                        this.innerHTML = recommendations.innerHTML;
                    }

                    /* if (html.querySelector('.grid__item')) {
                    this.classList.add('product-recommendations--loaded');
                    } */
                })
                .catch(e => {
                    console.error(e);
                });
        }

        new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 200px 0px' }).observe(this);
    }
}

customElements.define('product-cart-recommendations', ProductCartRecommendations);




// add recommendition to cart action
const add_recommendation_to_cart = (e) => {
    const selected_id = e.getAttribute('data-variant_id')
    const variantId = document.getElementById(selected_id).value

    let formData = {
        'items': [{
            'id': variantId,
            'quantity': 1
        }]
    };

    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(async (response) => {
        console.log(response);
        await cart_data();
        document.querySelector(`.${selected_id}`).classList.add('bv_hidden')
        return response.json();

    }
    ).catch((error) => {
        console.error('Error:', error);
    }
    );

}



const show_varient = (e) => {
    const selected_id = e.getAttribute('data-variant_id')
    document.getElementById(selected_id).classList.remove('bv_hidden')
    const containerID = e.getAttribute('data-add-to-cart-btn-containerID')
    document.getElementById(containerID).innerHTML = ` <button id="recommendation_add_to_cart" data-variant_id="${selected_id}" onclick="add_recommendation_to_cart(this)" class=" cart_add_product_to_cart">add to cart</button>`

}