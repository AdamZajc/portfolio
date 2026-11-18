"use client";
export default function Loading() {
  return (
    <main className="grid place-content-center w-full h-screen">
      <div>
        <div
          className={
            "w-[50vw] md:w-[30vw] h-auto grid grid-cols-3 grid-rows-2 aspect-3/2"
          }
        >
          <div
            className={"bg-sky-800 h-full aspect-square loader"}
            style={{ borderRadius: "100% 100% 000% 000%" }}
          />
          <div
            className={"bg-sky-300 h-full aspect-square loader"}
            style={{ borderRadius: "100% 000% 100% 100%" }}
          />
          <div
            className={"bg-sky-200 h-full aspect-square loader"}
            style={{ borderRadius: "100% 100% 100% 100%" }}
          />
          <div
            className={"bg-sky-950 h-full aspect-square loader"}
            style={{ borderRadius: "000% 000% 100% 100%" }}
          />
          <div
            className={"bg-sky-600 h-full aspect-square loader"}
            style={{ borderRadius: "100% 100% 000% 100%" }}
          />
          <div
            className={"bg-sky-100 h-full aspect-square loader"}
            style={{ borderRadius: "100% 000% 000% 000%" }}
          />
        </div>
      </div>
    </main>
  );
}
