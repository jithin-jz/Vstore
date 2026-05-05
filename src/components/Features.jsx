const features = [
  { 
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), 
    title: "Instant Activation", 
    desc: "Get your login credentials or license keys delivered instantly." 
  },
  { 
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ), 
    title: "Genuine Access", 
    desc: "100% authentic premium subscriptions with full warranty." 
  },
  { 
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ), 
    title: "Expert Support", 
    desc: "Dedicated support team available 24/7 via WhatsApp." 
  },
  { 
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), 
    title: "Best Pricing", 
    desc: "Professional-grade tools at industry-leading prices." 
  },
];

export default function Features() {
  return (
    <section className="bg-white py-12 px-4 sm:py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {features.map((f) => (
            <div 
              key={f.title} 
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl border border-gray-50 bg-white transition-all hover:border-gray-100 sm:p-8 sm:rounded-3xl"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-900 transition-colors group-hover:bg-brand-orange group-hover:text-white sm:mb-8 sm:h-14 sm:w-14 sm:rounded-2xl">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold tracking-tight text-gray-900 sm:text-lg">
                {f.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500 font-medium sm:mt-3 sm:text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
