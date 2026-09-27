# Design system extraído das seis capturas — Prapet Hospital Veterinário

**Fonte da análise:** seis capturas de tela de `prapet.framer.website`, datadas de 26/09/2026, todas com 2048 × 1280 px. São recortes sucessivos da mesma página em um navegador de desktop. **Escopo:** descrição visual e especificação de reconstrução; não houve acesso ao projeto Framer, CSS, arquivos de fonte, SVGs originais ou estados interativos. Medidas em “px da captura” são distâncias na imagem, **não** valores CSS confirmados. Uma captura pode incluir escala do navegador ou do dispositivo.

## 1. Inventário e evidências

| Captura | Conteúdo efetivamente visível | Componentes identificados |
|---|---|---|
| 8.18.01 | Navegação, hero e começo de serviços | Logo horizontal, links, CTA, eyebrow, H1, texto, foto, localidade, título de seção |
| 8.18.05 | Serviços e atendimento 24 horas | Grade 5 × 2 de cards, divisor claro, ícone de despertador, bloco de texto |
| 8.18.13 | Acessibilidade e especialidades | Bloco vermelho com texto, seção azul, grade de especialidades, CTA inferior |
| 8.18.21 | Sobre e proposta de cuidado | Eyebrow, introdução, cards descritivos 2 × 2 |
| 8.18.25 | Localização e início da chamada final | Endereço, mapa incorporado, headline vermelha, seção de conversão |
| 8.18.30 | Chamada final e rodapé | Eyebrow centralizado, headline em duas linhas, CTA, contatos e símbolo da marca |

**Grau de certeza:** `observado` significa presente na imagem; `medido` é aproximação sobre pixels da captura ou amostragem de cor; `proposto` é token ou regra útil para reconstrução que precisa de validação no arquivo original. Nenhuma imagem mostra um acordeão, menu aberto, hover, estado de erro, modal ou layout mobile.

## 2. Direção visual e gramática da página

A identidade combina hospitalidade clínica e simplicidade: fundos chapados em três azuis, texto azul marinho, CTAs vermelhos, cartões arredondados e uma única fotografia clínica no hero. Não há gradientes de fundo, texturas, sombras pronunciadas, contornos decorativos nem efeitos glassmorphism nas seções observadas. O vermelho cria pontos de decisão e uma afirmação de marca; o azul claro abre espaço de leitura; o azul escuro sustenta os blocos mais densos. O branco separa as seções e inverte a tipografia no fundo marinho.

A página é uma **landing page de rolagem vertical com âncoras**. Sequência aparente: `header → hero → serviços → atendimento 24h → cuidado acessível → especialidades → sobre → proposta de cuidado → localização → CTA final → footer`. O item “Contato” na navegação pode apontar para CTA ou rodapé; o destino exato não aparece na captura. A barra de navegação permanece na mesma posição de tela em capturas de rolagem distintas, sinalizando comportamento `sticky` ou `fixed`, mas a implementação exata não é verificável.

### Estrutura semântica recomendada

```text
<header> logo + <nav> 5 links + link/CTA
<main>
  <section id="inicio"> eyebrow + h1 + descrição + CTA + localidade + imagem
  <section id="servicos"> h2 + descrição + lista de 10 serviços
  <section id="atendimento-24h"> ícone + eyebrow + h2 + descrição
  <section id="acessibilidade"> manifesto em card vermelho + h2 + descrição
  <section id="especialidades"> h2 + lista de 18 especialidades + CTA
  <section id="sobre"> eyebrow + h2 + descrição
  <section id="proposta"> h2 + 4 cards de atributo/descrição
  <section id="localizacao"> h2 + endereço + descrição + mapa
  <section id="contato"> eyebrow + h2 + descrição + CTA
</main>
<footer> endereço, WhatsApp, Instagram, marca reduzida </footer>
```

Os rótulos da navegação observados são **Serviços**, **Especialidades**, **Sobre o Prapet**, **Localização** e **Contato**. O CTA recorrente diz **“Fale com o Prapet”**. O texto ajuda a identificar âncoras; não define por si só URLs, números ou comportamentos de clique.

## 3. Cores

Amostragem das áreas chapadas da imagem, com valores HEX repetidos com frequência. Variações de 1–3 níveis RGB nas bordas resultam de antialiasing e compressão da captura.

| Token sugerido | Cor medida | Papel observado | Combinações de uso |
|---|---|---|---|
| `--navy-900` | `#102F57` | Fundo das seções serviços, proposta e CTA final; títulos e texto sobre azul claro; traço do ícone 24h | Branco ou azul claro no fundo; sobre fundos claros |
| `--blue-500` | `#228CC6` | Fundo de atendimento 24h e especialidades; subtítulos, endereço, eyebrow e localidade | Branco ou azul marinho conforme elemento |
| `--blue-100` | `#CBDDEE` | Fundo hero, manifesto, sobre e localização; cards de especialidades | Azul marinho e azul médio |
| `--red-600` | `#CC1019` | Botões, manifesto quadrado e título de localização | Texto branco no CTA/card |
| `--white` | `#FFFFFF` | Header, cards de serviço, títulos invertidos e separadores | Texto azul marinho |
| `--surface-soft` | `#F2F2F2` | Cards 2 × 2 de proposta e região do footer | Texto azul marinho |
| `--text-on-dark-muted` | aproximado `#CBDDEE` | Parágrafos e eyebrow em seção marinho | Fundo `#102F57` |

A peça gráfica do logo inclui vermelho, azul escuro, azul mais vivo e branco. Ela deve ser tratada como **asset de marca**, sem recriar sua geometria a partir de amostras de tela. O mapa tem cores do provedor externo, fora dos tokens da interface.

**Contraste e acessibilidade:** os pares principais marinho/branco, marinho/azul claro e branco/vermelho são fortes. O texto azul `#228CC6` em `#CBDDEE` aparenta contraste baixo para corpo pequeno; antes de implementar, medir WCAG e escurecer a cor do texto quando necessário. A legibilidade final depende de tamanho, peso e escala reais.

## 4. Tipografia e hierarquia

Toda a interface observada usa uma **sans serif geométrica contemporânea**, com pesos regulares e fortes. Os títulos apresentam formas arredondadas, curvas suaves, grande altura-x e peso muito alto; os parágrafos são mais leves. **A família exata não pode ser identificada de maneira confiável por capturas rasterizadas.** Como aproximação visual de implementação, testar `Poppins` em títulos e textos e comparar glifos `a`, `e`, `r`, algarismos e espaçamento com o site/projeto; `Inter` ou `Plus Jakarta Sans` são hipóteses secundárias, não identificações. O lettering vermelho do logo é um asset independente da fonte da interface.

| Nível | Evidência | Tamanho visual aproximado na captura | Peso/altura | Regra sugerida |
|---|---|---:|---|---|
| Eyebrow / sobrelinha | “HOSPITAL VETERINÁRIO POPULAR • 24H”, “SOBRE O PRAPET” | 14–16 px | 700–800; caixa alta; tracking ligeiramente aberto | Antes de H1/H2; azul marinho, azul médio ou azul claro segundo o fundo |
| H1 do hero | “Hospital Veterinário / Popular em Fortaleza.” | 62–68 px | 700–800; entrelinha compacta ~1,03–1,12 | Alinhado à esquerda, duas linhas no desktop |
| H2 de seção | “Estrutura completa…”, “Cuidado especializado…” | 42–46 px | 700–800; entrelinha ~1,1–1,2 | Esquerda ou centro conforme seção |
| H2 de chamada | “Sempre prontos. / Sempre Prapet.” | 52–58 px | 700–800; entrelinha compacta | Centralizado; quebra de linha intencional |
| H3 ou título de card | Serviço, especialidade, atributo | 18–21 px | 650–750; entrelinha ~1,15–1,3 | Marinho, alinhado à esquerda |
| Texto de corpo | Descrições de hero, sobre, localização e CTA | ~19–21 px | 400–500; entrelinha ~1,45–1,6 | Marinho/azul médio sobre claro, azul claro/branco sobre escuro |
| Navegação | 5 links e CTA | ~16 px | 600–700 | Espaçamento uniforme; sem decoração aparente |
| Texto do botão | “Fale com o Prapet” | ~17–19 px | 700 | Branco, uma linha |
| Rodapé | Endereço e redes | ~14–16 px | 400–500 | Marinho, entrelinha mais compacta |

**Hierarquia por contexto:** hero usa eyebrow → H1 → parágrafo azul → botão vermelho → localidade azul. Seções informativas usam H2 → apoio → grid. Manifesto usa uma frase branca de alto peso em quadrado vermelho + H2 e texto. CTA final usa eyebrow → slogan H2 em duas linhas → parágrafo → botão. A frase de destaque “Popular é cuidado” é centralizada dentro do bloco vermelho, não um botão.

**Quebras:** manter a largura da coluna e a quebra visual do H1 e do slogan em desktop, mas permitir quebra natural em telas estreitas. Evitar `white-space: nowrap` em títulos longos e nomes de especialidades. Acentos e grafias originais devem permanecer.

## 5. Layout, grade e espaçamento

A janela da captura mede 2048 px. O conteúdo principal começa aproximadamente em **x=396** e termina em **x=1652**, sugerindo uma faixa central de **~1256 px da captura**; a margem externa é ~396 px em cada lado. O header repete o alinhamento do logo à esquerda e do botão à direita. A imagem do hero ocupa a coluna direita; o texto começa no eixo esquerdo da faixa central. Valores abaixo são medidos na captura e devem ser convertidos para CSS após checar zoom/devicePixelRatio.

| Elemento / seção | Geometria observada no desktop | Interpretação de reconstrução |
|---|---|---|
| Header branco | Aproximadamente y=174–262, altura ~88 px na captura | Contêiner central com logo à esquerda, links no meio e CTA à direita; possível sticky |
| Hero azul claro | Aproximadamente y=262–900 | Duas colunas com espaçamento amplo; bloco textual ~600 px; foto ~500 × 445 px, cantos ~12 px |
| Serviços marinho | Contêiner central; grade de 5 colunas × 2 linhas | 10 cartões claros de larguras próximas; gaps ~16 px; cards ~106 px de altura |
| Atendimento 24h azul | Ícone à esquerda de bloco textual; ícone ~90 px na captura | Linha horizontal centralizada dentro da seção; eyebrow e H2 no texto |
| Acessibilidade azul claro | Quadrado vermelho ~260 × 260 px + texto à direita | Duas colunas assimétricas; texto com largura ~600 px |
| Especialidades azul | 4 colunas, cinco linhas incompletas | Cards largos e baixos, altura ~58 px; gaps ~12–16 px; CTA central abaixo |
| Sobre azul claro | Eyebrow, H2 e parágrafo à esquerda | Uma coluna textual dentro do contêiner; bastante espaço inferior |
| Proposta marinho | Título central, 2 × 2 cartões cinza claro | Cards ~620 px de largura e ~98 px de altura na captura |
| Localização azul claro | Endereço/texto à esquerda, mapa à direita | Duas colunas; mapa com canto arredondado, ~465 × 460 px visíveis |
| CTA final marinho | Conteúdo centrado | Slogan em duas linhas; parágrafo com largura controlada; botão abaixo |
| Footer cinza claro | Texto à esquerda, símbolo à direita | Contêiner central, alinhamento horizontal no desktop |

**Ritmo vertical:** seções são bandas de cor de largura total. Há finas linhas brancas ou muito claras, cerca de 4–5 px de imagem, entre algumas bandas. Padding interno é grande: da ordem de ~80–110 px na captura nas seções de conteúdo. Cards usam padding interno de ~18–24 px, estimado pela posição do texto. O agrupamento evita bordas pesadas; a diferença de fundo estabelece a estrutura.

**Alinhamentos:** serviços e localização são alinhados à esquerda; proposta e CTA final são centralizados no título, com texto dos cards à esquerda. O grid de especialidades mantém rótulos à esquerda; o último par de itens não é esticado para preencher a linha. Não há sidebar.

## 6. Componentes detalhados

### 6.1 Cabeçalho e navegação

- Superfície branca ocupando toda a largura; logo horizontal colorido com “PRAPET” e assinatura pequena “HOSPITAL VETERINÁRIO”.
- Links em marinho, peso semibold, em uma linha: Serviços, Especialidades, Sobre o Prapet, Localização, Contato. Sem ícones nem submenus observáveis.
- Botão vermelho à direita com texto branco, altura visual de ~42 px e raio ~11 px na captura. Espaçamento amplo entre agrupamentos.
- Recomendação semântica: `<a>` nas âncoras, `aria-label` para a marca; foco visível; em mobile, definir menu responsivo após obter referência, pois não há estado móvel na amostra.

### 6.2 Hero

- Fundo azul claro sólido. Conteúdo textual à esquerda e fotografia clínica à direita, ambos alinhados dentro do mesmo contêiner.
- Eyebrow em caixa alta. H1 marinho de grande escala e duas linhas. Corpo em azul mais saturado; largura suficiente para ~3 linhas. CTA vermelho. Localidade azul em linha própria: “José Walter • Fortaleza, Ceará”.
- Foto retangular de veterinários com um gato em primeiro plano e um cão ao fundo; cantos modestamente arredondados; enquadramento central e recorte controlado. Asset fotográfico, não ilustração nem imagem de fundo.
- Não há overlay, moldura, gradiente ou sombra visível sobre a foto.

### 6.3 Grade de serviços

- Fundo marinho; H2 branco alinhado à esquerda; apoio azul claro em uma linha; grade 5 × 2 de **10** cards brancos.
- Cards de altura comum, cantos arredondados ~15–17 px da captura, sem borda nem sombra evidente; conteúdo marinho, sem ícone; texto alinhado ao topo/esquerda.
- Itens observados: Consulta clínica; Consulta com especialistas; Vacinação; Exames laboratoriais; Exames de imagem; Internação para cães, gatos e infectocontagiosos; Cirurgia geral e especializada; Medicina intensiva; Atendimento 24 horas; Documentação para viagens.
- Os nomes longos quebram em duas ou três linhas, enquanto os cartões conservam a altura da linha de grade.

### 6.4 Atendimento 24 horas

- Banda azul médio. Ícone de **despertador em contorno azul marinho**, traço espesso e arredondado, sem preenchimento; funciona como apoio visual e não como controle.
- Eyebrow branco em caixa alta: “24 HORAS • TODOS OS DIAS”; H2 marinho; parágrafo branco, em 2 linhas. Composição de ícone à esquerda e texto à direita.
- O ícone deve ser SVG escalável com `aria-hidden="true"` se a informação já estiver no texto. O SVG exato e suas coordenadas não podem ser recuperados da captura.

### 6.5 Manifesto de acessibilidade

- Banda azul claro. Card vermelho sólido aproximadamente quadrado, arredondado, com “Popular / é cuidado” em branco, centrado horizontal e verticalmente.
- À direita, H2 marinho “Cuidado veterinário mais acessível” e parágrafo marinho de ~3 linhas. O quadrado é peça editorial/manifesto; não há indício visual de interação.

### 6.6 Especialidades

- Fundo azul médio; título branco alinhado à esquerda, amplo afastamento acima da grade.
- Grade de **4 colunas**, cartões azul claro com marinho, altura baixa, padding horizontal ~16 px, raio ~15 px. O texto tem peso semibold/bold; algumas palavras menores aparentam variação de tamanho por extensão ou renderização, não um segundo nível semântico confirmado.
- 18 itens visíveis: Cardiologia; Medicina felina; Oftalmologia; Ortopedia; Odontologia veterinária; Dermatologia; Endocrinologia; Nefrologia e Urologia; Nutrição e Nutrologia; Oncologia; Anestesiologia; Cirurgias; Emergência; Medicina Intensiva Veterinária; Fisioterapia; Diagnóstico por Imagem; Patologia; Medicina de Animais Silvestres.
- Na última linha aparecem apenas dois cartões, mantendo o início da grade. CTA vermelho centralizado abaixo dos itens.

### 6.7 Sobre o Prapet

- Faixa superior azul médio fina observada na transição, depois superfície azul claro.
- Eyebrow azul “SOBRE O PRAPET”, H2 marinho “Um novo hospital veterinário popular no José Walter”, seguido de descrição marinho em cerca de 2 linhas.
- Coluna textual larga, alinhamento à esquerda, com respiro generoso acima e abaixo.

### 6.8 Proposta de cuidado

- Fundo marinho; título branco central em aproximadamente 2 linhas: “Uma proposta de cuidado preparada para diferentes necessidades”.
- Grid 2 × 2 com cards cinza claro (`#F2F2F2`), aproximadamente 620 × 98 px da captura, raio ~16 px e sem sombra; duas linhas de texto marinho por card.
- Temas: Hospital Veterinário Popular / cuidado mais acessível; Atendimento 24h / suporte durante 24 horas; Serviços e especialidades / reunidos em um só lugar; Cuidado para cães e gatos / necessidades diferentes.
- O texto parece composto como duas linhas de peso semelhante, sem divisor ou ícone. Uma implementação pode dar semântica distinta a título e descrição, preservando aparência.

### 6.9 Localização

- Fundo azul claro. Coluna esquerda com H2 vermelho “O Prapet está no José Walter”, endereço azul médio em três linhas, descrição azul médio abaixo. Trecho visível: “Rua 46, nº 20 / Prefeito José Walter / Fortaleza - CE”.
- Coluna direita mostra mapa incorporado do Google, cantos arredondados ~18 px, ruas, marcador vermelho e controles/créditos do provedor. A caixa do mapa não tem moldura decorativa própria evidente.
- É um widget externo: carregamento, mapa interativo, créditos e permissões não são definidos pelo design system. Prever título acessível no `iframe`, alternativa textual com endereço e vínculo “Abrir rotas”.

### 6.10 CTA final

- Banda marinho de largura total. Eyebrow central em azul claro: “HOSPITAL VETERINÁRIO POPULAR • 24H”. Slogan branco em duas linhas: “Sempre prontos. / Sempre Prapet.”
- Descrição central azul claro de duas linhas; botão vermelho central com texto branco. O botão é visualmente igual ao CTA do hero/header, podendo compartilhar o mesmo componente e variar apenas o posicionamento.

### 6.11 Rodapé

- Fundo cinza muito claro, aproximadamente `#F2F2F2`. Bloco de informações à esquerda: slogan, endereço, WhatsApp e Instagram. À direita, versão reduzida do símbolo da marca, sem a palavra PRAPET.
- Contato visível: WhatsApp **(85) 92166-7824** e Instagram **@hvprapet**. Esses valores foram lidos da captura; conferir com a operação antes de publicar.
- Sem colunas extras, newsletter, menu duplicado, política de privacidade ou copyright visíveis.

### 6.12 Elemento flutuante da ferramenta

- Pequeno círculo escuro com ícone branco de lápis à direita da janela, repetido em capturas. Parece controle de edição/visualização do ambiente Framer, **não componente de marca da landing page**. Não deve ser reproduzido na versão final sem evidência do produto.

## 7. Botões, estados e interação

O CTA primário observado tem preenchimento `#CC1019`, texto branco em peso forte, cantos ~10–12 px da captura, sem ícone e sem sombra detectável. Está no header, hero, fim de especialidades e CTA final. O destino é presumivelmente um canal de contato, mas a captura não comprova se abre WhatsApp, formulário ou seção interna. Links de navegação são marinho sobre branco. A foto, os cards de serviços, especialidades e atributos não mostram affordances de clique; tratá-los como conteúdo, a menos que o projeto original demonstre interatividade.

Não há estados `hover`, `focus`, `active`, `disabled`, `loading` ou `visited` registrados. Para implementar, **proposta**: hover do botão com vermelho ligeiramente mais escuro; foco com anel visível de alto contraste; hit area mínima de 44 × 44 CSS px; transições discretas respeitando `prefers-reduced-motion`. Essas regras são recomendações de acessibilidade, não elementos comprovados nas telas.

## 8. Acordeão e componentes não visíveis

**Nenhum acordeão aparece em qualquer uma das seis capturas.** Também não há pergunta frequente, cabeçalho expansível, ícones de `+`/`−`/chevron, painéis recolhidos ou conteúdo expandido. Portanto, não existe evidência para especificar tipografia, cores, borda, abertura múltipla ou animação de um “acordeão Prapet”. Se for necessário criar um, usar apenas os tokens gerais acima como ponto de partida e identificar o resultado como **novo componente proposto**, não como extração. O mesmo limite vale para formulários, dropdowns, carrossel, toast e menu mobile.

## 9. Elementos gráficos, fotografia e iconografia

- **Marca:** logo horizontal completo no header; símbolo isolado no footer; preservar vetor original. Em raster, os traços internos do coração e dos animais não permitem reconstrução fiel.
- **Ícone 24h:** traço azul marinho espesso, geometria simples e redonda. Sem coleção completa de ícones observada.
- **Fotografia:** apenas uma foto veterinária no hero, em clima clínico e acolhedor, com uniforme azul e cães/gatos. Evitar aplicar ilustrações genéricas a outras seções sem referência.
- **Mapa:** conteúdo do Google, sujeito ao estilo e créditos do provedor; não redesenhar seus controles como se fossem do Prapet.
- **Formas:** cards, imagem, mapa e botão usam retângulos arredondados; não há padrões abstratos, blobs ou linhas decorativas além dos separadores de seção.

## 10. Tokens de implementação propostos

Os valores CSS a seguir são um **ponto de partida**, calibrados pela proporção da captura. Não equivalem a propriedades obtidas do Framer. Conferir largura real do viewport CSS e fonte antes de validar pixel a pixel.

```css
:root {
  --color-navy: #102f57;
  --color-blue: #228cc6;
  --color-pale-blue: #cbddee;
  --color-red: #cc1019;
  --color-white: #ffffff;
  --color-soft: #f2f2f2;
  --font-ui: "Poppins", "Plus Jakarta Sans", Arial, sans-serif; /* hipótese */
  --container-max: 1256px; /* medida da captura, converter se necessário */
  --radius-button: 11px;
  --radius-card: 16px;
  --radius-media: 16px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-20: 80px;
}
.container { width: min(calc(100% - 48px), var(--container-max)); margin-inline: auto; }
.services-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
.specialties-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.benefits-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
```

**Responsividade proposta, sem evidência de mobile:** preservar a ordem do DOM e migrar hero/localização para 1 coluna; reduzir serviços de 5 para 2 e depois 1 coluna; especialidades de 4 para 2 e depois 1; atributos de 2 para 1; permitir menu colapsado acessível; restringir H1 com `clamp()`. Breakpoints e aparência final exigem capturas móveis para reprodução exata.

## 11. Checklist de fidelidade para reconstrução

1. Usar assets originais de logo e foto se disponíveis; não substituir símbolo por desenho aproximado.
2. Fixar os cinco fundos principais conforme os HEX medidos e preservar alternância das bandas.
3. Alinhar header, hero, grids e rodapé no mesmo contêiner central.
4. Manter H1 de duas linhas, títulos pesados e textos de apoio com escala claramente menor.
5. Preservar serviços em 5 × 2, especialidades em 4 colunas com dois itens finais, e proposta em 2 × 2 na largura desktop capturada.
6. Usar cards sem sombra destacada, raio coerente e texto marinho.
7. Repetir o mesmo CTA vermelho nos quatro pontos observados.
8. Usar mapa e endereço lado a lado, com créditos do provedor preservados.
9. Validar contraste, navegação por teclado, foco, semântica de headings, alternativa da foto e acessibilidade do mapa.
10. Solicitar fonte, SVGs, links de CTA, dimensões CSS reais, estados interativos e capturas mobile antes de afirmar equivalência exata ao site.

## 12. Lacunas de evidência

Não é possível extrair somente de PNG: nome e licença das fontes; `font-weight` numérico exato; largura real em CSS px; breakpoint; HTML/semântica original; export vetorial dos logos e ícone; URLs de botões; comportamento sticky exato; estados de interação; regra real do mapa; performance; analytics; menu mobile; accordions. As estimativas acima tornam o material implementável, mas devem ser confrontadas com o arquivo de origem quando a meta for fidelidade literal.
