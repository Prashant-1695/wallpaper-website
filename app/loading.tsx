// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <svg
        className="w-[3.25em] origin-center animate-rotate4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle
          className="fill-none stroke-blue-500 stroke-[2] stroke-dasharray-[1,200] stroke-dashoffset-[0] stroke-linecap-round animate-dash4"
          cx="25"
          cy="25"
          r="20"
        ></circle>
      </svg>
    </div>
  );
}
