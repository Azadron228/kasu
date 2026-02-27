import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import MembersInteractiveGrid from './MembersInteractiveGrid'

export default async function MembersPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch members and populate the region relationship
  const { docs: members } = await payload.find({
    collection: 'members',
    limit: 100,
    depth: 1, // Ensures the region object (with localized name) is returned, not just the ID
  })

  // Fetch regions to build the dynamic filter buttons
  const { docs: regions } = await payload.find({
    collection: 'regions',
    limit: 100,
  })

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <div className="bg-white border-b py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-800 uppercase bg-blue-100 rounded-full">
            Қауымдастық · Kazakhstan U3A
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Члены Ассоциации
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            14 университетов Казахстана, реализующих программы Серебряного университета в рамках
            концепции University of the Third Age (U3A)
          </p>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 py-6 px-4 divide-x divide-gray-100">
          <div className="text-center">
            <span className="block text-3xl font-bold text-blue-900">14</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Университетов</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-yellow-600">11</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Учредителей</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-gray-700">3</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Новых членов</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-blue-900">{regions.length}</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Регионов РК</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-blue-900">U3A</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Стандарт</span>
          </div>
        </div>
      </div>

      {/* CLIENT COMPONENT (Filters & Grid) */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <MembersInteractiveGrid members={members} regions={regions} />
      </div>
    </main>
  )
}
