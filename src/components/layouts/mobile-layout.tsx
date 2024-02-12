export default function MobileLayout() {
  return (
    <div className="container mx-auto flex h-full flex-col flex-nowrap items-center justify-center gap-3 overflow-hidden p-5 font-roboto text-text sm:hidden">
      <h1 className="mt-auto text-center text-3xl">
        <span className="font-extrabold">
          Leading with innovation,
          <br />
        </span>
        not just implementation
      </h1>
      <hr className="w-32 text-primary" />
      <p className="text-center text-lg">
        As an
        <span className="font-bold"> Engineering Manager</span>, I prioritize
        strategic leadership and team development over pixel-perfect layouts.
      </p>
      <div className="text-center text-text/70"></div>
      <div className="text-6xl">😎</div>
      <div className="mt-auto text-center text-text/70">
        A responsive design update is in the pipeline as I continuously improve
        the website. Stay tuned!
      </div>
    </div>
  );
}
