function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">⚡</span>
          <h1 className="text-2xl font-bold text-slate-800">
            React + Vite + Tailwind
          </h1>
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed">
          A modern web app scaffold powered by{' '}
          <span className="font-semibold text-indigo-600">Vite</span>,{' '}
          <span className="font-semibold text-cyan-600">React 18</span>,{' '}
          <span className="font-semibold text-blue-600">TypeScript</span>, and{' '}
          <span className="font-semibold text-teal-600">Tailwind CSS</span>.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Vite', color: 'bg-yellow-100 text-yellow-800' },
            { label: 'React 18', color: 'bg-cyan-100 text-cyan-800' },
            { label: 'TypeScript', color: 'bg-blue-100 text-blue-800' },
            { label: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800' },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`${color} text-sm font-medium px-3 py-2 rounded-lg text-center`}
            >
              {label}
            </span>
          ))}
        </div>

        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Get Started →
        </a>
      </div>
    </div>
  )
}

export default App
