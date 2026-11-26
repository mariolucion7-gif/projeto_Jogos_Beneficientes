# Casa São Domingos Sávio — Jogos Beneficentes

Projeto demonstrativo em React + TypeScript + Vite, com acesso de demonstração e páginas de jogos beneficentes.

## Executar localmente

1. Extraia o ZIP e abra a pasta `mr-construcao` no VS Code.
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev`
4. Abra o endereço local informado pelo Vite.

## Acesso demonstrativo

A tela de login aceita qualquer e-mail em formato válido e qualquer senha não vazia. Não há autenticação real de servidor; o acesso é apenas demonstrativo.

## Área pública de jogos beneficentes

Após entrar, o sistema abre `public/campanha.html`. Esta página mantém o modelo e as imagens fornecidas no protótipo, com:

- Bingo interativo;
- Leilões demonstrativos;
- Nova área de rifas, com cartões de prêmios e seleção de números;
- Apresentação institucional da Casa São Domingos Sávio.

As áreas de doação e arrecadação foram retiradas da navegação e da página.

## Identidade visual

A página aplica as diretrizes do Guia de Identidade Visual da Casa São Domingos Sávio: azul institucional `#0F3256`, verde esperança `#6E9B27`, verde vitalidade `#84B327`, azul sereno `#247BA0`, fundo `#F4F7FA`, divisores `#E2E8F0` e hierarquia tipográfica inspirada em Plus Jakarta Sans.

## Observação importante

O sistema de rifas é demonstrativo. A seleção de números não realiza pagamentos, não cria reservas oficiais e não confirma participação em sorteios reais. Para uso oficial, a instituição deverá cadastrar os prêmios, valores, regulamento, datas e canais de pagamento validados.


### Atualização das rifas

As três rifas agora exibem prêmios diferentes: violão em **Arte e cultura**, cesta com flores e chocolates em **Cesta especial**, e automóvel em **Experiência especial**. A marca **Rifa Fácil** enviada foi aplicada ao destaque visual da área de rifas. As imagens estão em `public/images/rifas/`.
