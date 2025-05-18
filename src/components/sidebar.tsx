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
  User,
  LogOut,
  Menu
} from 'lucide-react'

import { useGetMember } from '@/services/hooks/member/useGetMember'
import { useCreateLogout } from '@/services/hooks/token/useCreateLogout'
import React from 'react'

const menuItems = [
  { name: 'Perfil', href: '/profile', icon: User },
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Músicas', href: '/musics', icon: Music2 },
  { name: 'Categorias', href: '/categories', icon: FolderOpen },
  { name: 'Membros', href: '/members', icon: Users },
  { name: 'Funções', href: '/functions', icon: Briefcase },
  { name: 'Playlists', href: '/playlists', icon: ListMusic },
  { name: 'Escalas', href: '/scales', icon: Calendar }
]

export function Sidebar() {
  const pathname = usePathname()
  const { mutate } = useCreateLogout()
  const { data } = useGetMember()
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  const member = data?.data

  const requestLogout = () => mutate()

  return (
    <div className="bg-purple-900 w-full text-white gap-2 relative lg:flex lg:flex-col lg:h-screen lg:w-64 items-center">
      <div className="flex items-center justify-between w-full lg:flex-none">
        <div className="p-1 w-1/3">
          <h1 className="text-xl font-bold text-orange-400">Louvor</h1>
        </div>
        <div
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="lg:hidden w-1/3 cursor-pointer px-4 py-2"
        >
          <Menu size={40} />
        </div>

        <div className="p-4 w-1/3 lg:border-t md:w-1/3 lg:w-full lg:border-purple-800 lg:absolute lg:bottom-0 lg:left-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                {member?.profile_picture ? (
                  <Image
                    src={member?.profile_picture} // coloque um fallback para evitar erro
                    alt="Foto de perfil"
                    width={60}
                    height={60}
                    className="rounded-full object-cover w-10 h-10"
                  />
                ) : (
                  <User size={16} className="w-10 h-10" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {member?.user?.first_name}
                </p>
              </div>
            </div>
            <Link
              href="/login"
              onClick={requestLogout}
              className="p-2 rounded-md hover:bg-purple-800 transition-colors"
              aria-label="Sair"
            >
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </div>
      <nav
        className={`pt-2 pb-2 overflow-y-auto ${
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
                      ? 'bg-purple-800 text-orange-400'
                      : 'text-indigo-100 hover:bg-purple-800 hover:text-orange-500'
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
