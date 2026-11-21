// Squelettes de chargement : reprennent la mise en page réelle (mêmes largeurs, hauteurs et grilles)
// pour que la page ne "saute" pas quand le vrai contenu arrive.
const Sk = ({ c = '' }) => <div className={`skeleton relative ${c}`} />;

const Status = () => <span role="status" className="sr-only">Chargement…</span>;

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-cacao/5 bg-white shadow-warm sm:rounded-3xl">
      <Sk c="aspect-square w-full !rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-5">
        <Sk c="h-2.5 w-1/3 rounded-full" />
        <Sk c="h-5 w-3/4 rounded-lg sm:h-7" />
        <Sk c="h-3 w-full rounded-full" />
        <Sk c="h-3 w-2/3 rounded-full" />
        <div className="mt-auto flex items-end justify-between pt-3">
          <Sk c="h-5 w-16 rounded-lg sm:h-6 sm:w-24" />
          <Sk c="h-8 w-20 rounded-full sm:h-10 sm:w-28" />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div aria-busy="true">
      <Status />
      {/* Hero */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-14 md:px-12 lg:grid-cols-2 lg:py-20">
        <div>
          <Sk c="h-8 w-64 rounded-full" />
          <div className="mt-6 space-y-3">
            <Sk c="h-10 w-full rounded-xl md:h-14" />
            <Sk c="h-10 w-5/6 rounded-xl md:h-14" />
            <Sk c="h-10 w-2/3 rounded-xl md:h-14" />
          </div>
          <Sk c="mt-6 h-4 w-3/4 max-w-lg rounded-full" />
          <div className="mt-7 flex flex-wrap gap-3">
            <Sk c="h-12 w-56 rounded-full" />
            <Sk c="h-12 w-52 rounded-full" />
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[0, 1, 2].map((k) => (
              <div key={k} className="space-y-2"><Sk c="h-8 w-16 rounded-lg" /><Sk c="h-3 w-full rounded-full" /></div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-3xl border border-cacao/5 bg-white p-4 shadow-warm">
          <Sk c="aspect-square w-full rounded-2xl" />
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-2"><Sk c="h-5 w-32 rounded-lg" /><Sk c="h-3 w-44 rounded-full" /></div>
            <Sk c="h-11 w-11 rounded-full" />
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <Sk c="h-3 w-32 rounded-full" />
            <Sk c="h-9 w-72 max-w-full rounded-xl" />
            <Sk c="h-4 w-64 max-w-full rounded-full" />
          </div>
          <Sk c="h-10 w-80 max-w-full rounded-full" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((k) => <CardSkeleton key={k} />)}
        </div>
      </section>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div aria-busy="true" className="pb-20 md:pb-0">
      <Status />
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <div className="flex items-center gap-2 py-5"><Sk c="h-3 w-16 rounded-full" /><Sk c="h-3 w-24 rounded-full" /><Sk c="h-3 w-20 rounded-full" /></div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galerie : même cadre 4/5 que la vraie galerie */}
          <div className="self-start">
            <Sk c="aspect-[4/5] max-h-[78vh] w-full rounded-3xl" />
            <div className="mt-3 flex gap-2.5">
              {[0, 1, 2].map((k) => <Sk key={k} c="h-16 w-16 shrink-0 rounded-xl sm:h-[72px] sm:w-[72px]" />)}
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-6">
            <Sk c="h-4 w-52 rounded-full" />
            <div className="space-y-3">
              <Sk c="h-11 w-3/4 rounded-xl md:h-14" />
              <Sk c="h-6 w-1/2 rounded-lg" />
            </div>
            <div className="space-y-2.5">
              <Sk c="h-4 w-full rounded-full" />
              <Sk c="h-4 w-11/12 rounded-full" />
              <Sk c="h-4 w-2/3 rounded-full" />
            </div>
            <Sk c="h-10 w-40 rounded-xl" />
            <div className="flex gap-3">
              <Sk c="h-14 w-36 shrink-0 rounded-full" />
              <Sk c="h-14 flex-1 rounded-full" />
            </div>
            <Sk c="h-14 w-full rounded-full" />
            <div className="space-y-4 rounded-2xl bg-biscuit/60 p-5">
              {[0, 1, 2].map((k) => <Sk key={k} c="h-5 w-full rounded-lg" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
