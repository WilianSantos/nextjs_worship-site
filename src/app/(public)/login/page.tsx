import LoginForm from './formLogin'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Gestão do Ministério de Louvor
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-center">Login</h2>

        <LoginForm />
      </div>
    </div>
  )
}
