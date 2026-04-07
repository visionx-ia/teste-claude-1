# CLAUDE.md

Este arquivo fornece orientações para assistentes de IA (Claude Code e similares) que trabalham neste repositório.

## Visão Geral do Repositório

**Repositório:** visionx-ia/teste-claude-1
**Status:** Recém-inicializado — nenhum código-fonte foi commitado ainda.

Este repositório foi criado em estado vazio. À medida que o projeto evoluir, atualize este arquivo para refletir a estrutura real do código, convenções e fluxos de trabalho.

---

## Estado Atual

- Nenhuma linguagem ou framework foi definido.
- Nenhum arquivo de dependências existe (package.json, requirements.txt, etc.).
- Nenhuma pipeline de CI/CD está configurada.
- Nenhum teste, linter ou script de build está em vigor.

Quando o primeiro código for adicionado, atualize as seções abaixo de acordo.

---

## Convenções Git

### Nomenclatura de Branches
- Funcionalidades: `feature/<descrição-curta>`
- Correções de bugs: `fix/<descrição-curta>`
- Documentação: `docs/<descrição-curta>`
- Trabalho assistido por IA: `claude/<descrição-da-tarefa>` (ex.: `claude/add-claude-documentation-v7kul`)

### Mensagens de Commit
Escreva mensagens de commit no modo imperativo, focando no *porquê* e não no *o quê*:

```
Adiciona módulo de autenticação de usuários

Implementa autenticação baseada em JWT para suportar sessões de API sem estado.
Substitui a abordagem anterior com cookie de sessão para melhor escalabilidade.
```

- Mantenha a linha de assunto com no máximo 72 caracteres.
- Deixe uma linha em branco entre o assunto e o corpo.
- Referencie números de issues quando aplicável: `Closes #42`

### Fluxo de Push
```bash
git push -u origin <nome-do-branch>
```

Tente novamente até 4 vezes com backoff exponencial (2s, 4s, 8s, 16s) em caso de falhas de rede.

---

## Fluxo de Desenvolvimento (atualizar conforme o projeto cresce)

### Configuração Inicial de um Novo Projeto
Quando este repositório receber uma stack, documente os passos de configuração aqui. Exemplo de template:

```bash
# Instalar dependências
<comando de instalação>

# Executar servidor de desenvolvimento
<comando dev>

# Executar testes
<comando de testes>

# Lint e formatação
<comando de lint>
```

### Variáveis de Ambiente
- Copie `.env.example` para `.env` antes de executar localmente (crie `.env.example` quando houver segredos).
- Nunca faça commit de `.env` ou segredos.

---

## Convenções de Código

Estas devem ser atualizadas quando uma linguagem/framework for escolhido:

- Siga o formatter/linter aplicado pelo projeto (ex.: Prettier, Black, rustfmt, gofmt).
- Prefira explícito ao implícito.
- Mantenha funções pequenas e com propósito único.
- Escreva testes junto com novas funcionalidades — não adicione features sem cobertura.
- Evite abstrações especulativas; construa apenas o que a tarefa atual exige.

---

## Diretrizes para Assistentes de IA

### O que fazer
- Leia os arquivos existentes antes de modificá-los.
- Siga o estilo e os padrões já presentes no código.
- Prefira editar arquivos existentes a criar novos.
- Mantenha as mudanças restritas ao que foi solicitado — sem refatorações por impulso.
- Marque as tarefas como concluídas no TodoWrite assim que cada uma for finalizada.

### O que evitar
- Não adicione tratamento de erros para cenários impossíveis.
- Não adicione docstrings ou comentários em código não modificado.
- Não introduza shims de compatibilidade retroativa para código que não precisa deles.
- Não faça commit ou push sem instrução explícita do usuário.
- Não crie novos arquivos a menos que seja estritamente necessário.
- Não adicione emojis em arquivos a menos que seja explicitamente solicitado.

### Ações arriscadas que requerem confirmação
Sempre pause e confirme antes de:
- Deletar arquivos ou branches
- Fazer force-push
- Modificar pipelines de CI/CD
- Postar em serviços externos ou GitHub (PRs, comentários, issues)
- Qualquer operação difícil de reverter

---

## Contatos do Repositório

Atualize esta seção com informações da equipe ou mantenedores à medida que o projeto crescer.

---

*Última atualização: 07/04/2026 — Repositório em estado inicial vazio. Atualize este arquivo conforme o projeto evoluir.*
