export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p> &copy; GaDaMi {new Date().getFullYear()}</p>
                <div className="mt-2">
                    <p>Acesse os termos de uso</p>
                    <p>Políticas de segurança</p>
                </div>
            </div>
      </footer>
    );
  }
  