# Modelo de mensagem de commit

```text
<type>(<scope>): <resumo em português do Brasil, sem abreviações>

<corpo longo: contexto, o que mudou, por que, impacto>

```

Escreva a mensagem completa em `LATEST_COMMIT` na raiz do repositório.
Audite com a skill `git-commit-message-auditor` antes de `git commit -F LATEST_COMMIT`.
Tipos e escopos permitidos: ver `presets.yaml`.
