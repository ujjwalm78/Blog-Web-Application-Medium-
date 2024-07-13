function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="font-bold text-2xl">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="max-w-md font-semibold text-xl mt-4">
            Jules Winnfield
          </div>
          <div className=" font-light text-sm text-slate-400">
            CEO, Acme Ince
          </div>
        </div>
      </div>
    </div>
  );
}

export { Quote };
