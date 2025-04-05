<h1 align="center" width="100%"> Fullstack Web com FastAPI e HTML/CSS/JavaScript para gestão de doações para causas solidárias com criptoativos da Ethereum </h1>

<p align="center" width="90%">

<img src="https://github.com/user-attachments/assets/53aaff0b-de99-40b5-a1da-1a88e3a7af2e" alt="" width="65%">
  
</p>

<h3 align="center" width="60%"> Python + FastAPI + PostgreSQL + Tecnologias Web + Web3 + JWT </h3>

<p align="center" width="50%">

<img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python"/>
<img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="Fastapi"/>
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres"/>
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="Ethereum"/>

</p>

<h1 align="center" width="100%"> Descrição </h1>

<p>
O seguinte projeto realiza a gestão de doações em criptoativos para causas solidárias e humanitárias, por meio de cadastro e autenticação de usuário que podem estar associados a várias causas e doações, neste caso, as doações são feitas em ETH, criptomoeda da rede blockchain Ethereum, conhecida pelo suporte aos contratos inteligentes e pela criptografia de curva elíptica, e os valores doados são convertidos em dólar americano. Como regras de negócio, ficou estabelecido que a exclusão de uma causa só pode ser realizada após ter recebido um valor em doação, por mínimo que seja e esse montante doado tenha sido utilizado para a sua proposta de fato, ou seja, o status do montante foi atualizado de "stored" para "applied" (armazenado para aplicado) e claramente essa atualização só pode acontecer após ter ocorrido pelo menos uma doação para esta causa e mais doações só podem ser realizadas a uma causa se esta ainda não tiver aplicado seu montante recebido. Cada causa possui um código de certificação que valida sua veracidade e cada valor em ETH é simbólico (décimos ou centésimos que representam muitas vezes cumprimento de contratos inteligentes ou apenas um gas fee desse tipo de tecnologia de sistema distribuído) e quando convertidos para o dólar representam valores consideráveis. Como exemplo, usei uma causa solidária que ajuda vítimas humanas e outros animais de desastres ambientais e incêndios florestais.
</p>

<h1 align="center" width="100%"> Como criar o projeto na sua máquina? </h1>

<p> Abra o terminal e digite :
  
  ```bash
  mkdir fastapi_project
 ```
  ```bash
  cd fastapi_project
 ```

Crie e ative o ambiente virtual :
  ```bash
  python -m venv venv
 ```
Para Windows : 
  ```bash
  venv\Scripts\activate
 ```

Para Linux/macOS : 
  ```bash
  source venv/bin/activate
 ```

Instale o framework FastAPI e o servidor Uvicorn :
  ```bash
  pip install fastapi uvicorn
 ```

Abra o Visual Studio Code :
  ```bash
  code .
 ```
ou o Pycharm.

Instale o Jinja2 para que o servidor possa se comunicar com o cliente:
  ```bash
  pip install jinja2
 ```
Está tudo em containers Docker, pode executar com:
  ```bash
  docker compose up --build
 ```
Você pode criar o arquivo __init__.py com o seguinte comando no terminal:

  ```bash
  touch project/package/__init__.py
 ```
Trocando "project" e "package" pelos respectivos nomes de seus diretórios.

Ou se preferir, apenas faça o git clone deste projeto :

  ```bash
  git@github.com:Doug16Yanc/fastapi_project.git
 ```
Utilize o PostgreSQL como banco de dados dentro de um container Docker com o seguinte comando:
```bash
 docker-compose up --build
 ```
Caso a porta 5432 esteja executando algum serviço em background no sistema operacional, é possível identificar o PID (identificador de processo) e 
finalizar o processo a fim de permitir a execução do banco de dados dentro do container com os seguintes comandos:

```bash
 sudo lsof -i :5432
 ```
Em seguida:
 ```bash
 sudo kill -9 PID
 ```
Execute o frontend no seu navegador, de preferência o Mozilla Firefox com as rotas de URL estabelecidas: http://localhost:8000/templates

<h1 align="center"> Autor </h1>

<p>Douglas Holanda</p>
                                                                                                                                                         

