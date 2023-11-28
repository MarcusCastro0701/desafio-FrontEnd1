const apiUrl = 'https://dummyjson.com/users';
const container = document.getElementById("list-container");

let usersArr = JSON.parse(localStorage.getItem('usersArr')) || [];

async function deleteUser(id){

    usersArr = usersArr.filter((u) => u.id !== id)

    localStorage.setItem('usersArr', JSON.stringify(usersArr));

    window.alert('Usuário removido!')

    window.location.reload()

}

//se a array do local storage estiver vazia
if(usersArr.length === 0){

    console.log('arr vazia')

    async function findData() {

        try {
    
          const response = await fetch(apiUrl);
          const data = await response.json();

          localStorage.setItem('usersArr', JSON.stringify(data.users));

          console.log('Dados recebidos:', data);
    
            data.users.map((o) => (
                container.innerHTML +=  `
                
                <div class="user-card">
    
                    <img src=${o.image}/>
                    <p>usuário: ${o.firstName} ${o.lastName}</p>
                    <p>idade: ${o.age}</p>
                    <p>email: ${o.email}</p>

                    <h1 onclick="deleteUser(${o.id})>Remover usuário<h1>
    
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

    try {

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Dados recebidos:', data);

      const containerValue = document.getElementById("list-container");

        usersArr.map((o) => (
            containerValue.innerHTML +=  `
            
            <div class="user-card">

            <img src=${o.image}/>
            <p>${o.firstName} ${o.lastName}</p>
            <p>${o.age} anos</p>
            <p>${o.email}</p>

            <h1 onclick="deleteUser(${o.id})" >Remover usuário<h1>

        </div>
            
            `
        ))

    } catch (error) {
      console.error('Erro na requisição:', error);
    }
}
setContainer()


document.getElementById("myForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const imgInput = document.getElementById('imagem');
    const imgValue = imgInput.value;

    const nomeInput = document.getElementById("nome");
    const nomeValue = nomeInput.value;

    const sobrenomeInput = document.getElementById("sobrenome");
    const sobrenomeValue = sobrenomeInput.value;

    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value;

    const idadeInput = document.getElementById("idade");
    const idadeValue = idadeInput.value;

    if(nomeValue.length < 3 ){
        window.alert("O nome não pode ter menos do que 3 caracteres")
        return
    }

    if(nomeValue.length > 50){
        window.alert("O nome não pode ter mais do que 50 caracteres")
        return
    }

    if(sobrenomeValue.length > 50){
        window.alert("O sobrenome não pode ter mais do que 50 caracteres")
        return
    }

    if(sobrenomeValue.length < 3 ){
        window.alert("O sobrenome não pode ter menos do que 3 caracteres")
        return
    }

    if(sobrenomeValue.length > 50){
        window.alert("O sobrenome não pode ter mais do que 50 caracteres")
        return
    }

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(emailValue) || emailValue === ''){
        window.alert('Insira um email válido')
        return
    }

    if(Number(idadeValue) > 120 || Number(idadeValue) < 0 || idadeValue === ''){
        window.alert('Insira uma idade válida')
        return
    }

    if(imgValue.length <= 0){
        window.alert('Insira uma url para sua imagem')
        return
    }

    const body = {
        id: (usersArr.length + 1),
        firstName: nomeValue,
        lastName: sobrenomeValue,
        age: idadeValue,
        email: emailValue,
        image: imgValue
    }

    fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(console.log);

    usersArr.push(body)

    localStorage.setItem('usersArr', JSON.stringify(usersArr));

    window.alert('Usuário adicionado!')

    window.location.reload()
});





    






