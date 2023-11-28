const apiUrl = 'https://dummyjson.com/products';
const container = document.getElementById("list-container");

let productsArr = JSON.parse(localStorage.getItem('productsArr')) || [];

console.log(productsArr)

async function deleteProduct(id){

    productsArr = productsArr.filter((u) => u.id !== id)

    localStorage.setItem('productsArr', JSON.stringify(productsArr));

    window.alert('Produto removido!')

    window.location.reload()

}

//se a array do local storage estiver vazia
if(productsArr.length === 0){

    console.log('arr vazia')

    async function findData() {

        try {
    
          const response = await fetch(apiUrl);
          const data = await response.json();

          console.log(data)

          localStorage.setItem('productsArr', JSON.stringify(data.products));

          console.log('Dados recebidos:', data);
    
            data.products.map((o) => (
                container.innerHTML +=  `
                
                <div class="products-card">
    
                    <img src=${o.thumbnail}/>
                    <p>${o.title}</p>
                    <p>${o.description}</p>
                    <p>preço: ${o.price}</p>
                    <p>marca: ${o.brand}</p>
                    <p>categoria: ${o.category}</p>

                    <h1 onclick="deleteProduct(${o.id})">Remover produto<h1>
    
                </div>
                
                `
            ))
    
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    
      findData()
}

//se a array do local storage não estiver vazia
async function setContainer() {

    console.log('arr não vazia')

      const containerValue = document.getElementById("list-container");

        productsArr.map((o) => (
            containerValue.innerHTML +=  `
            
                <div class="user-card">
    
                    <img src=${o.thumbnail}></img>
                    <p>${o.title}</p>
                    <p>${o.description}</p>
                    <p>preço: ${Number(o.price).toFixed(2)}</p>
                    <p>marca: ${o.brand}</p>
                    <p>categoria: ${o.category}</p> 
                    <h1 onclick="deleteProduct(${o.id})">Remover produto<h1>
    
                </div>
            
            `
        ))
}
setContainer()


document.getElementById("myForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const tituloInput = document.getElementById('titulo');
    const tituloValue = tituloInput.value;

    const descriçaoInput = document.getElementById("descriçao");
    const descriçaoValue = descriçaoInput.value;

    const preçoInput = document.getElementById("preço");
    const preçoValue = preçoInput.value;

    const marcaInput = document.getElementById("marca");
    const marcaValue = marcaInput.value;

    const categoriaInput = document.getElementById("categoria");
    const categoriaValue = categoriaInput.value;

    const imagemInput = document.getElementById("imagem");
    const imagemValue = imagemInput.value;


    if(tituloValue.length > 50){
        window.alert("O título não pode ter mais do que 50 caracteres")
        return
    }

    if(tituloValue.length < 3){
        window.alert("O título não pode ter menos do que 3 caracteres")
        return
    }

    if(descriçaoValue.length > 50){
        window.alert("A descrição não pode ter mais do que 50 caracteres")
        return
    }

    if(descriçaoValue.length < 3){
        window.alert("A descrição não pode ter menos do que 3 caracteres")
        return
    }

    if(marcaValue.length < 3 ){
        window.alert("A marca não pode ter menos do que 3 caracteres")
        return
    }

    if(marcaValue.length > 50){
        window.alert("A marca não pode ter mais do que 50 caracteres")
        return
    }

    if(categoriaValue.length < 3 ){
        window.alert("A categoria não pode ter menos do que 3 caracteres")
        return
    }

    if(categoriaValue.length > 50){
        window.alert("A categoria não pode ter mais do que 50 caracteres")
        return
    }

    if(imagemValue.length <= 0){
        window.alert('Insira uma url para sua imagem')
        return
    }

    if(Number(preçoValue) < 0 || Number(preçoValue) > 120){
        window.alert("Insira um preço válido");
        return
    }

    const body = {
        id: (productsArr.length + 1),
        title: tituloValue,
        description: descriçaoValue,
        price: preçoValue,
        category: categoriaValue,
        brand: marcaValue,
        thumbnail: imagemValue
    }

    fetch('https://dummyjson.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(console.log);

    productsArr.push(body)

    localStorage.setItem('productsArr', JSON.stringify(productsArr));

    window.alert('Produto adicionado!')

    window.location.reload()
});





    






