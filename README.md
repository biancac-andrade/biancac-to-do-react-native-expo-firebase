# Aplicativo básica de To-Do

#### Aplicativo foi construido com a linguagem de Javascript, styles component para estilação do aplicativo , com framework React Native.

Para emulação foi utilizado Expo Go para fazer as emulações de dispositivo.

### O que é necessário para executar:

- Visual Code
- Conta do Firebase
- Áplicativo do Expo Go instalado no seu Android ou usar tecnologia do QR Code caso o seu for IOS.

1. baixar a dependencia no terminal para executar o Expo Go:

```javascript
npm install -g expo-cli
```

### Firebase
1. Criar um projeto no firebase, segue um [tutorial aqui](https://medium.com/@adsonrocha/como-criar-um-projeto-no-firebase-273b984ea1b3)
   
2. Crir uma aplicativo formato web e pegar credenciais para executar, segue um [tutorial aqui](https://medium.com/@adsonrocha/como-criar-um-projeto-no-firebase-273b984ea1b3#:~:text=Acesse%20o%20site%20do%20Firebase,consolee%20poder%C3%A1%20criar%20projetos.) 

3. Ativar autenticação de email/senha para uso do login, segue um [tutorial aqui https://firebase.google.com/docs/auth?hl=pt-br]

### Aplicação

1. Baixa o projeto no github
~~~javascript
  git clone https://github.com/biancac-andrade/biancac-to-do-react-native-expo-firebase.git
~~~

2. Adicionar as credenciais no arquivo config.js
    - Abre o Visual Code
    - Acessa o arquivo config.js
    - Adiciona valores da credenciais do aplicativo que criou no firebase dentro das parenteses, como exemplo abaixo: 
  
~~~javascript
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXX.firebaseapp.com",
  projectId: "XXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXX",
};
~~~
  
3.  Baixar as dependencias necessária do projeto
   
~~~javascript
  cd nomeProjeto
  npm i
~~~

4. Executar o projeto no emulador Expo

~~~javascript
  npm start
~~~

ou

~~~javascript
expo start
~~~

5. Escaneia o QrCode que vai ser gerado no seu terminal

### Login

- Para acesso primeira vez ou não possuir uma conta registrada no firebase:
Clica em register no aplicativo

- Cadastra seu email e senha, na qual vai ficar registrado no firebase, não é necessário de uma conta de email verdadeiro/real


## Melhorias Futuras

1. Adicionar testes unitários e integração
2. Melhorias de estado (Redux) em Datas 
3. Melhorias de Registros de dados no banco de dados
4. Mais fluidez na aplicação


#### Dias trabalhados:
- Aproxidamente em 3 dias


### Imagens do Aplicativo
1. Login

![Login](https://raw.githubusercontent.com/biancac-andrade/biancac-to-do-react-native-expo-firebase/images/login.jpeg)

2. Adiciona Tarefa

![Adiciona Tarefa](https://raw.githubusercontent.com/biancac-andrade/biancac-to-do-react-native-expo-firebase/images/editaLista.jpeg)

3. Lista de Tarefa
   
![Lista Tarefa](https://raw.githubusercontent.com/biancac-andrade/biancac-to-do-react-native-expo-firebase/images/lista.jpeg)

4. Altera tarefa
   
![Edita Tarefa](https://raw.githubusercontent.com/biancac-andrade/biancac-to-do-react-native-expo-firebase/images/updateLista.jpeg)