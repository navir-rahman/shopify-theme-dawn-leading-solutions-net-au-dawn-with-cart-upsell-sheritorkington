function bv_sectionJS() {
    try {
      
        document.getElementById('bv_all_options').addEventListener('change', (e) => {
            // variabls
            let current_variant = '';
            const options = []
            const selected_option = e.target;
            const all_select_options = document.querySelectorAll('.bv_option_container select');
            let selected_node = " ";
            const clicked_id = parseFloat(selected_node.value);
            // set the selected variant 
            all_select_options.forEach((e, i, array) => {
                // 
                i === array.length - 1 ?
                    current_variant += e.value
                    :
                    current_variant += e.value + ' ' + '/' + ' '
    
            });
    
            // set selected variant 
            const main_varientname = document.querySelectorAll('#bv_varient_selector option')
            main_varientname.forEach(e => {
                if (e.innerText === current_variant) {
                    selected_node = e;
                    if (e.value != "disabled") {
                        main_varientname.forEach(i => i.removeAttribute("selected"))
                        e.setAttribute("selected", "selected")
                        document.getElementById('bv_stock').innerHTML = `
                <svg class="icon icon-checkbox-checked" height="32" version="1.1" viewbox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"> <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z"> </path></svg> &nbsp;<span> In Stock</span>`
                    } else {
                        document.getElementById('bv_stock').innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18" viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/></g></svg> &nbsp;<span> Out of Stock</span>`
                    }
                }
            });
    
            const varientPrice = selected_node.getAttribute('data-varient_price')
            bv_updatePrice(varientPrice);
    
            product_data.variants.map(v => {
                if (v.id == parseFloat(selected_node.value)) {
                    bv_updateSKU(v.sku)
                }
            })
    
        })
    
    } catch (error) {
      console.log(error)
    }
    
        const bv_Varient_change = (event) => {
            const varientPrice = document.getElementById("varient" + event.target.value).getAttribute('data-varient_price')
            const clicked_id = parseFloat(event.target.value);
            product_data.variants.map(v => {
                if (v.id == clicked_id) {
    
                    bv_updateSKU(v.sku)
                    bv_updatePrice(varientPrice);
                }
            })
        }
    
        // change on thumbnail 
        const bv_varient_changeONClick = (event) => {
            const varientPrice = document.getElementById(event.target.id).getAttribute('data-varient_price')
            const clicked_id = parseFloat(event.target.id);
            product_data.variants.map(v => {
                if (v.id == clicked_id) {
                    bv_updateSKU(v.sku)
                    bv_updatePrice(varientPrice);
                    bv_updateSelect(v.id)
                }
            })
        }
    
        // update SKU 
        const bv_updateSKU = (sku) => {
            document.getElementById('bv_sku').innerText = sku;
        }
    
        // updatePrice
        const bv_updatePrice = (price) => {
            document.getElementById('bv_varient_price').innerHTML = price
        }
    
    
        // update selected varient 
        const bv_updateSelect = id => {
            const varient_select = document.getElementById("bv_varient_selector");
            const update_varient = document.getElementById("varient" + id);
            Array.from(varient_select).forEach((el) => el.removeAttribute("selected"));
            update_varient.setAttribute('selected', 'selected');
    
        }
    
        // Initialise Carousel
        const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
            Dots: false,
            Thumbs: false,
        });
    
        // Thumbnails
        const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
            Sync: {
                target: mainCarousel,
                friction: 0,
            },
            Dots: false,
            Navigation: true,
            center: true,
            slidesPerPage: 1,
            infinite: false,
        });
    
        // Customize Fancybox
        Fancybox.bind('[data-fancybox="gallery"]', {
            Toolbar: false,
            closeButton: "top",
            Carousel: {
                on: {
                    change: (that) => {
                        mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
                            friction: 0,
                        });
                    },
                },
            },
    
        });
    
    }
    document.addEventListener('DOMContentLoaded', function () {
    bv_sectionJS();
    })
    
    //variant options
    document.addEventListener("shopify:section:load", function (event) {
        bv_sectionJS();
    });
    



