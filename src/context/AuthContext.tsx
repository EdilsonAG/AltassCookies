import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ClienteResponse } from '../types'
import { clienteService } from '../services/api'

interface AuthContextValue {
  usuario: ClienteResponse | null
  logado: boolean
  loading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
  recarregar: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<ClienteResponse | null>(null)
  const [loading, setLoading] = useState(true)

  // muito utiliz so muda quando de falto 
  const recarregar = useCallback(async () => {
    try {
      setLoading(true)
      // chama um endpoint tipo /cliente/me que retorna o usuário do cookie
      const data = await clienteService.meusDados()
      setUsuario(data)
    } catch {
      setUsuario(null) // não logado
    } finally {
      setLoading(false)
    }
  }, [])


  // dessa forma so vai rodar uma vez a cada re-renderização, cada atualização de estado
//   useEffect(() => {
//   console.log("sdsdfgs")
// }, [])


//   function Exemplo() {
//   const [count, setCount] = useState(0)

//   //   Sem array — roda em TODA re-renderização
//   useEffect(() => {
//     console.log('rodou!')
//   })

//   return (
//     <button type="button" onClick={() => setCount(c => c + 1)}>
//       Clicou {count} vezes
//     </button>
//   )
// }


// Execute recarregar() quando o valor de recarregar mudar
  useEffect(() => {
    recarregar()
  }, [recarregar])

  const login = async (email: string, senha: string) => {
    await clienteService.login(email, senha)
    await recarregar() // busca os dados após login
  }

  const logout = async () => {
    await clienteService.logout()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        logado: usuario !== null,
        loading,
        login,
        logout,
        recarregar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}