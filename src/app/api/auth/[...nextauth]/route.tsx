import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const githubClientId = "Ov23li4FJOImuic9RHIY";
const githubClientSecret = "33f7ff286b7b5b6d3bbfa3e2e36bccdf3e62874e";

if (!githubClientId || !githubClientSecret) {
    throw new Error('Faltando variáveis de ambiente para autenticação.');
}
const authOptions = {
    providers: [
        GitHubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret,
        }),
    ],
    pages: {
        error: '/auth/error', // Redireciona para a página de erro
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Exporta o handler para GET e POST