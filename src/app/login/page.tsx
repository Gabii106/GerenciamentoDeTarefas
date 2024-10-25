
export default function Login() {
    return (
        <>
            <div className="flex items-center justify-center">
                <form className="bg-gray-300 p-8 rounded shadow-md w-96">
                    <h2 className="text-3xl mx-4 text-center"> Login por Gmail</h2>
                    <div className="mt-4 text-center">
                        <label className="block text-sm">Digite seu email: </label>
                        <input type="email" id="email" required placeholder="Digite seu email"
                            className="mt-4 block w-full p-2 rounded " />
                        <label className="block text-sm mt-4">Digite sua senha: </label>
                        <input type="password" id="password" required placeholder="Digite sua senha"
                            className="mt-4 block w-full p-2 rounded" />
                    </div>
                    <button type="submit" className="w-full my-6 bg-blue-500 text-white p-3 rounded">Entrar</button>
                </form>
            </div>
            <div className="flex items-center justify-center mt-2 ">
                <button
                    className="flex bg-gray-900 text-white p-2 rounded hover:bg-gray-700 transition duration-200">
                    {/* <FaGithub className="h-5 w-5 mr-2" /> */}
                    Login por Github
                </button>
            </div>
        </>
    )
}