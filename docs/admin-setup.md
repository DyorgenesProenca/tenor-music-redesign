# Configuração do catálogo administrativo

O catálogo e o painel usam Supabase Auth, Postgres com RLS e Storage. O frontend usa apenas a URL do projeto e uma chave publicável. O painel só autoriza contas cuja UUID esteja em `public.admin_users`; as políticas RLS repetem essa autorização no banco e no bucket de imagens.

## 1. Criar e migrar o projeto

1. Crie um projeto Supabase e copie a Project URL, a publishable key (`sb_publishable_...`) e uma secret key (`sb_secret_...`). A secret key dá acesso privilegiado e nunca pode ir para o navegador, para um repositório ou para uma variável `VITE_`.
2. No SQL Editor do Supabase, execute uma vez o conteúdo de [`supabase/migrations/202610020001_catalog_admin.sql`](../supabase/migrations/202610020001_catalog_admin.sql). A migração cria as tabelas, políticas RLS e o bucket público de imagens com limite de 5 MB e formatos JPEG, PNG e WebP.

## 2. Autorizar uma conta administrativa

1. Em **Authentication → Users**, crie um usuário com o e-mail e a senha escolhidos pela loja. Não há credenciais padrão no projeto.
2. Copie a UUID desse usuário e execute no SQL Editor, substituindo o marcador:

```sql
insert into public.admin_users (user_id)
values ('COLE-A-UUID-DO-USUARIO-AQUI');
```

Somente alguém que já tem acesso administrativo ao projeto deve poder inserir UUIDs nessa tabela. A aplicação permite editar produtos e categorias apenas depois dessa verificação, e o banco também exige a permissão em cada operação.

## 3. Carregar o catálogo e iniciar

1. Copie `.env.example` para `.env` na raiz do projeto.
2. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` com os valores públicos do projeto. Preencha também `SUPABASE_URL` e `SUPABASE_SECRET_KEY` para a carga inicial. Mantenha `.env` fora do Git.
3. Com Node.js 20.6 ou mais recente, rode `npm run seed:catalog`. O script carrega as categorias, marcas e produtos já definidos em `src/data`. IDs que já existem são preservados quando o script é executado novamente, para evitar substituir alterações feitas no painel.
4. Rode `npm run dev` e abra `/admin`. Entre com o usuário criado na etapa 2.

O painel permite criar, editar e remover produtos, enviar uma imagem principal e uma galeria, organizar categorias e alterar o link de WhatsApp e o e-mail público da loja. Imagens aceitas: JPEG, PNG e WebP, até 5 MB cada.

## 4. Publicação

Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` como variáveis do build no provedor de hospedagem. Nunca publique `SUPABASE_SECRET_KEY`; ela serve apenas para rodar `seed:catalog` localmente. Configure o servidor para entregar o `index.html` da aplicação nas rotas `/admin/*`, `/instrumentos` e `/produto/*`.

Sem as variáveis públicas, o site continua exibindo o catálogo local para leitura e o painel fica bloqueado. Com o Supabase configurado, produtos, categorias, marcas e contatos são lidos do banco; falhas da API são exibidas no painel e o site mantém a última fonte local como contingência. A sessão de login é mantida somente na sessão desta aba; os dados do catálogo não são guardados no `localStorage`.
