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

Cada projeto é um bloco `<article class="card ...">` dentro de `<div class="grid">` no `index.html`. Para adicionar um projeto:

1. Coloque as fotos em `assets/img/` (um arquivo grande `.webp` e uma miniatura `-sm.webp` de 640 px de largura).
2. Copie um bloco `<article>` existente e troque: título, categoria (`data-cat`: `arquitetura`, `interiores` ou `externas`), a imagem de capa e o JSON dentro de `<script class="gal">` (título, texto e lista de imagens).
3. A cada 3 projetos o layout alterna cards largos (classe `wide`); remova ou mova `wide` para equilibrar a grade.

Projetos atuais: Casa Acolhimento, Casa Amanhecer, Residência Contemporânea, Sobrado Verde, Quintal com Piscina, Sala & Home Office, Cozinha Integrada, Banhos & Lavanderia, Suíte & Closet.
Os nomes foram criados a partir das legendas das suas postagens. Troque pelos nomes reais dos projetos quando quiser.

Mapa das fotos originais para os projetos:
- Casa Acolhimento: `acolhimento-00`, `luz-02`, `luz-03`
- Casa Amanhecer: `amanhecer-00`, `amanhecer-01`, `amanhecer-02`, `luz-08`
- Residência Contemporânea: `luz-01`, `luz-00`
- Sobrado Verde: `luz-04`, `luz-05`
- Quintal com Piscina: `luz-06`, `luz-07`
- Sala & Home Office: `elegancia-00`, `elegancia-01`
- Cozinha Integrada: `elegancia-02`, `elegancia-03`
- Banhos & Lavanderia: `elegancia-07`, `elegancia-04`, `elegancia-05`
- Suíte & Closet: `elegancia-08`, `elegancia-06`
- Retrato da Érica: `erica-00`

## 3. Seção "Do dia à noite"

Os pares de imagens ficam nos botões `#dnTabs` do `index.html` (`data-a` = imagem da esquerda, `data-b` = imagem da direita, `data-la`/`data-lb` = rótulos).

## 4. Textos e cores

- Textos: direto no `index.html`.
- Cores e fontes: variáveis no topo de `assets/css/style.css`. Paleta terra: areia, terracota, ocre e dourado. Cada seção usa um contexto de cor (`.lt` claro, `.dk` marrom escuro, `.tc` terracota) que redefine as variáveis.
- Dados do Google (SEO): bloco `application/ld+json` no `<head>`.

## O que o site faz

- Feito primeiro para celular, responsivo até telas grandes.
- Hero com apresentação de imagens, menu em tela cheia no celular, barra de progresso e botão fixo "Solicitar projeto".
- Portfólio com filtro por categoria e galeria em tela cheia (deslizar com o dedo, setas, teclado, miniaturas).
- Comparação dia/noite arrastável.
- Formulário que monta a mensagem pronta.
- Acessível por teclado, respeita "reduzir movimento", fontes carregadas do Google Fonts.

## Observações

- As fotos têm cerca de 1000 px de largura. Funcionam bem no celular, mas em telas muito grandes ficam levemente suaves. Se tiver as versões originais em alta resolução, vale substituí-las.
- O Instagram não aceita mensagem pré-preenchida por link; por isso o site copia o texto para colar.
