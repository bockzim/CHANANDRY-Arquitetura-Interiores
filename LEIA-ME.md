# Chanandry Arquitetura & Interiores — site

Site de portfólio com cara de landing page. HTML, CSS e JavaScript puros (sem frameworks, sem build). Para publicar, envie esta pasta inteira para qualquer hospedagem (Netlify, Vercel, Cloudflare Pages, Hostinger, etc.) ou abra `index.html` no navegador para visualizar.

## Estrutura

```
index.html              página única (todas as seções)
assets/css/style.css    todo o visual (cores e fontes no topo, em :root)
assets/js/main.js       interações (configuração no topo do arquivo)
assets/img/             fotos em WebP (versão normal e "-sm" para miniaturas)
```

## 1. Contatos

WhatsApp (+55 96 98115-9999), e-mail e Instagram já estão ativos. Para trocar o número, edite `CONFIG.whatsapp` no topo de `assets/js/main.js` (DDI 55 + DDD + número, só dígitos) e o número exibido na seção Contato do `index.html`.
Horário de atendimento, CAU, CNPJ, formação e prêmios estão no `index.html` (seções Sobre, Contato e rodapé) e nos dados do Google (`application/ld+json`).

## 2. Projetos e fotos

Cada projeto é um bloco `<article class="card ...">` dentro de `<div class="grid" id="grid">` no `index.html`. Para adicionar um projeto:

1. Coloque as fotos em `assets/img/` (um arquivo grande `.webp` e uma miniatura `-sm.webp` de cerca de 720 px de largura).
2. Copie um bloco `<article>` existente e troque: título, categoria (`data-cat` e o texto do `card-tag`), a imagem de capa e o JSON dentro de `<script class="gal">` (título, texto e lista de imagens).
3. Se criar uma categoria nova, acrescente também um botão no bloco `#filters` (`data-f` igual ao `data-cat`).
4. Na grade de 3 colunas (computador), um card com a classe `wide` ocupa 2 colunas. A ordem atual fecha as linhas certinho a cada 5 projetos; ao inserir um projeto no meio, ajuste a classe `wide` dos vizinhos.

### Botão "Ver mais projetos"
A página mostra poucos projetos de cada vez: 4 no celular, 6 no tablet e 5 no computador. O botão revela o mesmo tanto a cada toque e, no final, vira "Mostrar menos". Para mudar a quantidade, edite a função `pageSize()` em `assets/js/main.js`. Os filtros funcionam sobre todos os projetos, e o botão só aparece quando a categoria tem mais projetos que a quantidade inicial.

### Categorias (filtros)
Arquitetura (5), Áreas externas (1), Salas (3), Quartos e closets (4), Banheiros (3), Cozinhas e halls (3). Total: 19 projetos.

Os nomes dos projetos foram criados a partir das legendas das postagens e das fotos. Troque pelos nomes reais quando quiser.

Mapa das fotos para os projetos (arquivos em `assets/img/`):
- Casa Acolhimento: `acolhimento-00`, `luz-02`, `luz-03`
- Casa Amanhecer: `amanhecer-00`, `amanhecer-01`, `amanhecer-02`, `luz-08`
- Residência Contemporânea: `luz-01`, `luz-00`
- Sobrado Verde: `luz-04`, `luz-05`
- Entrada com Porta de Madeira: `entrada-1`
- Quintal com Piscina: `luz-06`, `luz-07`
- Sala de Pedra e Madeira: `sala-alta-1`, `sala-alta-2`, `sala-alta-3`
- Sala & Home Office: `elegancia-00`, `elegancia-01`
- Sala de Estar: `sala-estar-1`, `sala-estar-2`
- Suíte do Casal: `suite-casal-1`
- Suíte & Closet: `elegancia-08`, `elegancia-06`
- Closets: `closet-1`, `closet-2`
- Quartos Infantis: `infantil-1`, `infantil-2`
- Banhos & Lavanderia: `elegancia-07`, `elegancia-04`, `elegancia-05`
- Lavabos: `lavabo-1`, `lavabo-2`
- Banheiros Claros: `banho-1`, `banho-2`, `banho-3`
- Cozinha Integrada: `elegancia-02`, `elegancia-03`
- Cozinha & Marcenaria: `cozinha-1`, `cozinha-2`
- Hall de Entrada: `hall-1`, `hall-2`
- Retrato da Érica (seção Sobre): `erica-01`
- Escritório (seção nova): `escritorio-1` a `escritorio-4`

### Categoria "Consultoria e ambientação"
Reúne as fotos antigas do escritório (`consultoria-1..4.webp`), agora como projetos do portfólio.

### Seção "Obras em execução"
Fica logo depois do portfólio e do "Do dia à noite" (`id="obras"`), separada dos projetos. Cada foto é uma `<figure class="obra-fig">` dentro de `#obraGal`; a classe `wide` ocupa a largura toda no celular (2 colunas no computador). Só as 3 primeiras aparecem de início; as demais têm a classe `ob-extra` e entram no botão "Ver mais fotos". A lista da galeria em tela cheia é o JSON `<script class="gal">` no mesmo bloco, na mesma ordem das fotos. Fotos: `assets/img/obra-1..8.webp`. Quando uma obra ficar pronta, mova a foto para um card do portfólio.

### Seção "Escritório"
Fica entre "Sobre" e "Serviços" (`id="escritorio"`). No celular as fotos rolam para o lado; no computador aparecem lado a lado (a primeira, em paisagem, é maior). Cada foto abre a galeria em tela cheia. Para trocar fotos ou legendas, edite as `<figure class="off-fig">` e o JSON `<script class="gal">` dentro de `#offGal`.

## 3. Seção "Do dia à noite"

Os pares de imagens ficam nos botões `#dnTabs` do `index.html` (`data-a` = imagem da esquerda, `data-b` = imagem da direita, `data-la`/`data-lb` = rótulos).

## 4. Textos e cores

- Textos: direto no `index.html`.
- Cores e fontes: variáveis no topo de `assets/css/style.css`. Paleta terra: areia, terracota, ocre e dourado. Cada seção usa um contexto de cor (`.lt` claro, `.dk` marrom escuro, `.tc` terracota) que redefine as variáveis.
- Dados do Google (SEO): bloco `application/ld+json` no `<head>`.

## O que o site faz

- Feito primeiro para celular, responsivo até telas grandes.
- Hero com apresentação de imagens, menu em tela cheia no celular, barra de progresso e botão fixo "Solicitar projeto".
- Portfólio com filtro por categoria, botão "Ver mais projetos" e galeria em tela cheia (deslizar com o dedo, setas, teclado, miniaturas).
- Seção do escritório com fotos do ambiente de consultoria e projeto.
- Comparação dia/noite arrastável.
- Formulário que monta a mensagem pronta.
- Acessível por teclado, respeita "reduzir movimento", fontes carregadas do Google Fonts.

## Observações

- As fotos têm cerca de 1000 px de largura. Funcionam bem no celular, mas em telas muito grandes ficam levemente suaves. Se tiver as versões originais em alta resolução, vale substituí-las.
- O Instagram não aceita mensagem pré-preenchida por link; por isso o site copia o texto para colar.



## Logo

Arquivos em `assets/brand/` (SVG vetorial + PNG):
- `logo-horizontal-*` (cabeçalho), `logo-vertical-*` (rodapé), `logo-marca-*` (só o "C"), `favicon.svg`, `favicon-32/192/512.png`, `apple-touch-icon.png`.
- `*-dourado`: para fundos escuros. `*-bronze`: para fundos claros (o cabeçalho troca sozinho ao rolar a página).
- Atenção: a cliente não tinha a logo em vetor. Os SVGs foram redesenhados a partir do JPG (marca em polígonos limpos, letras traçadas). Ficou muito fiel, mas se ela conseguir o arquivo original (AI/PDF/SVG) com o designer, vale trocar.
