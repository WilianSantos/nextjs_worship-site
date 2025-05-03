'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  Music2,
  FolderOpen,
  Users,
  Briefcase,
  ListMusic,
  Calendar,
  BarChart2,
  User,
  LogOut,
  Menu
} from 'lucide-react'

import { useGetMember } from '@/services/hooks/useGetMember'
import { useCreateLogout } from '@/services/hooks/useCreateLogout'
import React from 'react'

const menuItems = [
  { name: 'Perfil', href: '/perfil', icon: User },
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Músicas', href: '/musicas', icon: Music2 },
  { name: 'Categorias', href: '/categorias', icon: FolderOpen },
  { name: 'Membros', href: '/membros', icon: Users },
  { name: 'Funções', href: '/funcoes', icon: Briefcase },
  { name: 'Playlists', href: '/playlists', icon: ListMusic },
  { name: 'Escalas', href: '/escalas', icon: Calendar },
  { name: 'Relatórios', href: '/relatorios', icon: BarChart2 }
]

export function Sidebar() {
  const pathname = usePathname()
  const { mutate } = useCreateLogout()
  const { data } = useGetMember()
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  const member = data?.data

  const requestLogout = () => mutate()

  return (
    <div
      className="bg-indigo-900 text-white lg:relative lg:flex lg:flex-col lg:h-screen lg:w-64
                  md:fixed md:top-0 md:left-0 md:w-screen md:p-5 md:items-center md:z-10
                  sm:fixed sm:top-0 sm:left-0 sm:w-screen sm:p-5 sm:items-center sm:z-10
                "
    >
      <div className="flex items-center justify-between w-full lg:flex-none">
        <div className="p-1">
          <h1 className="text-xl font-bold">Louvor</h1>
        </div>
        <div
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="lg:hidden cursor-pointer px-4 py-2"
        >
          <Menu size={40} />
        </div>

        <div className="p-4 lg:border-t lg:border-indigo-800 lg:absolute lg:bottom-0 lg:left-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                {member?.profile_picture ? (
                  <Image
                    src={member?.profile_picture} // coloque um fallback para evitar erro
                    alt="Foto de perfil"
                    width={16}
                    height={16}
                    className="rounded-full w-full h-full"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{member?.name}</p>
              </div>
            </div>
            <Link
              href="/login"
              onClick={requestLogout}
              className="p-2 rounded-md hover:bg-indigo-800 transition-colors"
              aria-label="Sair"
            >
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </div>
      <nav
        className={`pt-2 pb-2 lg:flex-1 overflow-y-auto ${
          menuIsOpen ? 'block md:block lg:block' : 'hidden md:hidden lg:block'
        } md:w-full`}
      >
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
