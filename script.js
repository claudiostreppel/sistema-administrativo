window.addEventListener("load", async function() {
    try {
        const response = await fetch('http://localhost:8082');
        const data = await response.json();
        const text1 = document.getElementsByClassName('text-1')[0]
        const text2 = document.getElementsByClassName('text-2')[0]
        const text3 = document.getElementsByClassName('text-3')[0]
        const btnTitle = document.getElementsByClassName('btn_title')[0]
        const btnLink = document.getElementsByClassName('btn_link')[0]

        text1.textContent = data.datahome.text_one;
        text2.textContent = data.datahome.text_two
        text3.textContent = data.datahome.text_trhee;
        btnTitle.textContent = data.datahome.btn_title
        btnLink.href = data.datahome.btn_link

    } catch (error) {
        console.error(error);
    }
});
const text1Input = document.querySelector('input[name="text1"]');
console.log(text1Input.value);
const form = document.querySelector('form');
console.log(form)
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // previne o comportamento padrão do formulário (recarregar a página)
  const formData = new FormData(form); // cria um objeto FormData com os dados do formulário
  console.log(formData)
  try {
    const response = await fetch('http://localhost:8082/add-home', { // envia uma requisição POST com os dados do formulário para a URL /add-home
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      alert('Formulário enviado com sucesso!');
      form.reset(); // limpa o formulário
    } else {
      alert('Ocorreu um erro ao enviar o formulário.');
    }
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao enviar o formulário.');
  }
});
