# Credenciais de Administrador - Painel CMS

## 🔐 Acesso ao Sistema

O sistema possui uma camada de segurança implementada para proteger o acesso ao painel administrativo (CMS).

### Credenciais Padrão

Para acessar o painel administrativo, utilize as seguintes credenciais:

- **Email:** `admin@dfontes.com.br`
- **Senha:** `admin123`

## 📋 Como Acessar

### Método 1: Botão no Footer
1. Role até o rodapé da página
2. Clique no botão **⚙️ Admin**
3. Digite as credenciais acima
4. Clique em **Entrar**

### Método 2: Atalho de Teclado
1. Pressione `Ctrl+K` (ou `Cmd+K` no Mac) em qualquer página
2. Digite as credenciais acima
3. Clique em **Entrar**

## 🔒 Segurança Implementada

### Recursos de Segurança

1. **Autenticação Obrigatória**: O painel administrativo só pode ser acessado mediante login
2. **Validação de Credenciais**: Email e senha são validados antes do acesso
3. **Sessão Persistente**: A sessão é mantida por 24 horas após o login
4. **Logout Seguro**: Botão de logout limpa completamente a sessão
5. **Proteção contra Acesso Não Autorizado**: Sem credenciais válidas, o painel não é exibido

### Validações Implementadas

- ✅ Validação de formato de email
- ✅ Campos obrigatórios
- ✅ Mensagens de erro claras em português
- ✅ Feedback visual durante o processo de login

## ⚠️ Importante - Segurança em Produção

**ATENÇÃO:** As credenciais atuais são para desenvolvimento/demonstração apenas.

### Para Ambiente de Produção, você DEVE:

1. **Alterar as Credenciais Padrão**
   - Edite o arquivo `/src/utils/auth.js`
   - Modifique o objeto `DEFAULT_ADMIN` com credenciais seguras
   - Use senhas fortes (mínimo 12 caracteres, com letras, números e símbolos)

2. **Implementar Hash de Senhas**
   - As senhas atualmente são armazenadas em texto plano
   - Implemente bcrypt ou similar para hash de senhas
   - Nunca armazene senhas em texto plano em produção

3. **Conectar a um Backend Seguro**
   - O sistema atual usa localStorage (apenas frontend)
   - Implemente um backend com autenticação JWT
   - Use HTTPS para todas as comunicações

4. **Adicionar Mais Recursos de Segurança**
   - Rate limiting (limite de tentativas de login)
   - Autenticação de dois fatores (2FA)
   - Logs de acesso
   - Recuperação de senha
   - Múltiplos usuários com diferentes permissões

## 🛠️ Estrutura Técnica

### Arquivos Relacionados

- `/src/utils/auth.js` - Funções de autenticação e autorização
- `/src/components/Login.jsx` - Componente de formulário de login
- `/src/components/Login.css` - Estilos do formulário de login
- `/src/components/Admin.jsx` - Componente principal do painel (com controle de acesso)

### Funções Disponíveis

```javascript
import { 
  login,           // Autentica usuário
  logout,          // Remove sessão
  getCurrentUser,  // Obtém usuário atual
  isAuthenticated, // Verifica se está autenticado
  isAdmin          // Verifica se é administrador
} from './utils/auth'
```

## 📝 Gerenciamento de Sessões

- **Duração da Sessão:** 24 horas
- **Armazenamento:** localStorage
- **Expiração:** Automática após 24h
- **Renovação:** Manual (fazer login novamente)

## 🔄 Fluxo de Autenticação

1. Usuário clica para acessar o Admin
2. Sistema verifica se existe sessão válida
3. Se não existe sessão → exibe formulário de login
4. Se existe sessão → exibe painel administrativo
5. Usuário pode fazer logout a qualquer momento
6. Logout limpa todas as informações de sessão

## 💡 Dicas

- Mantenha suas credenciais em local seguro
- Não compartilhe credenciais de administrador
- Faça logout ao terminar de usar o sistema
- Em produção, considere usar gerenciador de senhas
- Configure alertas para tentativas de login suspeitas

---

**Desenvolvido com segurança em mente para a Imobiliária Dernival Fontes**
