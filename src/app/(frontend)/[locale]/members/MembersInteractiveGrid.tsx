'use client'

import React, { useState } from 'react'

export default function MembersInteractiveGrid({
  members,
  regions,
}: {
  members: any[]
  regions: any[]
}) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Filter Logic
  const filteredMembers = members.filter((member) => {
    const regionName = typeof member.region === 'object' ? member.region?.name : ''

    const matchesFilter =
      filter === 'all' ||
      (filter === 'founder' && member.status === 'founder') ||
      (filter === 'member' && member.status === 'member') ||
      regionName === filter

    const matchesSearch =
      member.shortName?.toLowerCase().includes(search.toLowerCase()) ||
      member.fullName?.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 mr-2">Фильтр:</span>

          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Все ({members.length})
          </button>

          <button
            onClick={() => setFilter('founder')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'founder' ? 'bg-yellow-600 text-white' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
          >
            ★ Учредители
          </button>

          <button
            onClick={() => setFilter('member')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === 'member' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Новые члены
          </button>

          {/* Dynamic Region Buttons */}
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setFilter(region.name)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === region.name ? 'bg-blue-100 text-blue-900 border-blue-200 border' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full lg:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, i) => (
          <div
            key={member.id || i}
            className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden flex flex-col h-full"
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-gray-50 border flex items-center justify-center overflow-hidden">
                {/* Fallback if no logo uploaded yet */}
                {member.logo && typeof member.logo === 'object' && member.logo.url ? (
                  <img
                    src={member.logo.url}
                    alt={member.shortName}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-400">
                    {member.shortName?.charAt(0)}
                  </span>
                )}
              </div>

              {member.status === 'founder' ? (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                  ★ Учредитель
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
                  Член
                </span>
              )}
            </div>

            {/* Content */}
            <div className="mb-4 flex-grow">
              <div className="text-xs font-semibold text-blue-600 mb-1">
                {typeof member.region === 'object' ? member.region.name : ''} · {member.city}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.shortName}</h3>
              <p className="text-sm text-gray-500 line-clamp-3">{member.fullName}</p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-4 border-t flex items-center gap-3">
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors border"
                >
                  🌐 Сайт
                </a>
              )}
              <div className="flex-1 text-center bg-blue-50 text-blue-800 text-sm font-medium py-2 px-4 rounded-lg border border-blue-100">
                🎓 U3A
              </div>
            </div>
          </div>
        ))}

        {/* Static "Join Us" Card */}
        <div className="bg-blue-900 rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col h-full text-white text-center justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-3xl font-light mb-4">
            +
          </div>
          <h3 className="text-xl font-bold mb-2">Вступите в Ассоциацию</h3>
          <p className="text-blue-200 text-sm mb-6">
            Если ваш университет реализует программу серебряного обучения — присоединяйтесь к КАСУ
          </p>
          <button className="bg-white text-blue-900 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors w-full">
            Подать заявку →
          </button>
        </div>
      </div>
    </div>
  )
}
