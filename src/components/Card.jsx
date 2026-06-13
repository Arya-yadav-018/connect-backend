import React from 'react'

const Card = () => {
  return (
   <div className="bg-gray-50 py-16 px-6">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
    How DevConnect works
  </h2>

  <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">

    {/* STEP 1 - LEFT */}
    <div className="w-full flex justify-start">
      <div className="flex items-start gap-5 bg-white rounded-2xl p-6 w-full md:w-96 shadow-sm border border-gray-100">
        <div className="text-3xl">🔍</div>
        <div>
          <h3 className="font-semibold text-gray-800">
            Discover developers
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Browse through developer profiles matched to your tech stack and interests.
          </p>
          <p className="text-sm text-purple-500 mt-2 font-medium cursor-pointer hover:text-purple-700">
            Start exploring →
          </p>
        </div>
      </div>
    </div>

    {/* ARROW */}
    <div className="text-gray-300 text-4xl">↓</div>

    {/* STEP 2 - RIGHT */}
    <div className="w-full flex justify-end">
      <div className="flex items-start gap-5 bg-white rounded-2xl p-6 w-full md:w-96 shadow-sm border border-gray-100">
        <div className="text-3xl">🤝</div>
        <div>
          <h3 className="font-semibold text-gray-800">
            Send a connection request
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Liked someone's profile? Hit interested and wait for them to match back.
          </p>
          <p className="text-sm text-purple-500 mt-2 font-medium cursor-pointer hover:text-purple-700">
            See how matching works →
          </p>
        </div>
      </div>
    </div>

    {/* ARROW */}
    <div className="text-gray-300 text-4xl">↓</div>

    {/* STEP 3 - CENTER */}
    <div className="w-full flex justify-center">
      <div className="flex items-start gap-5 bg-white rounded-2xl p-6 w-full md:w-96 shadow-sm border border-gray-100">
        <div className="text-3xl">🚀</div>
        <div>
          <h3 className="font-semibold text-gray-800">
            Collab and grow together
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Once matched, start building — side projects, open source, startups.
          </p>
          <p className="text-sm text-purple-500 mt-2 font-medium cursor-pointer hover:text-purple-700">
            Create your profile →
          </p>
        </div>
      </div>
    </div>

  </div>

  {/* BOTTOM TEXT */}
  <div className="flex items-center justify-center gap-2 mt-12">
    <span className="text-purple-300 text-2xl">👨‍💻</span>
    <p className="text-purple-400 font-medium text-sm italic">
      Devs, but make it easy
    </p>
  </div>
</div>
  )
}

export default Card