# Study

## Introdução

Esse repositório consiste no backend da aplicação ***Study*** desenvolvida para a disciplina de Otimização de Sistemas do curso de Ciência da Computação, PUCMinas - 2020/1

O backend da aplicação foi desenvolvido no framework javascript Node.js e está upado em forma de REST-API na plataforma da Heroku.

[API](https://plano-estudo-enem.herokuapp.com) - Somente aceita requisições do tipo POST com a estrutura de dados abaixo.

Foi utilizada a lib [simplex-solver](https://www.npmjs.com/package/simplex-solver) para a resolução da problemática.

## Dados de entrada

A entrada de dados dessa api pode estar tanto no formato ***JSON*** quanto ***x-www-form-urlencoded*** e deve conter a estrutura do exemplo abaixo:

```json
{
    "difficulty": [
		{ "name": "Geografia", "note": 3 },
		{ "name": "Historia", "note": 1 },
		{ "name": "Fisica", "note": 4 },
		{ "name": "Quimica", "note": 1 },
		{ "name": "Biologia", "note": 2 },
		{ "name": "Matematica", "note": 3 },
		{ "name": "Arte", "note": 3 },
		{ "name": "Filosofia", "note": 2 },
		{ "name": "Sociologia", "note": 4 },
		{ "name": "Lingua Estrangeira", "note": 4 },
		{ "name": "Portugues", "note": 3 },
		{ "name": "Literatura", "note": 2 },
		{ "name": "Redacao", "note": 1 }
	],
	"options": ["monday", "tuesday", "wednesday", "thursday", "friday"],
	"hoursPerDay": 4,
	"startStudyDay": 13
}
```
***difficulty*** - Se trata do array principal onde estão contidas as matérias e o nivel de dificuldade em cada uma. ***É obrigatório o envio das 13 matérias!***

***Matéria*** -

    ***name*** - Nome da Matéria.

    ***note*** - Nivel de dificuldade da matéria que varia entre 1 (menor dificuldade) à 5 (maior dificuldade).

***options*** - Array de Strings que conterá os dias da semana (em ingles) que serão disponíveis para estudo.

***hoursPerDay*** - Inteiro que representa o tempo de estudo diário (determinado pelo usuário da aplicação).

***startStudyDay*** - Inteiro que representa o horário de inicio dos estudos (na versão atual não é utilizado).

## Dados de saída

A saída de dados dessa API se trata de ***JSON*** contendo o plano de estudos gerado.
Saída para o exemplo acima:
```json
{
  "agenda": [
    { "name": "monday", "materias": [ "Biologia", "Arte", "Lingua Estrangeira", "Matematica" ] },
    { "name": "tuesday", "materias": [ "Quimica", "Fisica", "Portugues", "Portugues" ] },
    { "name": "wednesday", "materias": [ "Geografia", "Lingua Estrangeira", "Literatura", "Sociologia" ] },
    { "name": "thursday", "materias": [ "Redacao", "Fisica", "Matematica", "Filosofia" ] },
    { "name": "friday", "materias": [ "Geografia", "Sociologia", "Historia", "Arte" ] },
    { "name": "saturday", "materias": [] },
    { "name": "sunday", "materias": [] }
  ],
  "options": [ "monday", "tuesday", "wednesday", "thursday", "friday" ],
  "hoursPerDay": 4,
  "startStudyDay": 13,
  "message": ""
}
```
***agenda*** - Se trata do array principal onde conterá os objetos referentes a cada dia da semana e as matéria à serem estudas em cada um.

***Dia*** -

    ***name*** - Nome do dia

    ***materias*** - Array contendo as matérias à serem estudas no dia.

***options*** - Array de Strings que conterá os dias da semana (em ingles) que serão disponíveis para estudo.

***hoursPerDay*** - Inteiro que representa o tempo de estudo diário (determinado pelo usuário da aplicação).

***startStudyDay*** - Inteiro que representa o horário de inicio dos estudos (na versão atual não é utilizado).