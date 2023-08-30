import LoadingDots from "../loading/loading-dots";

export type ButtonOptions = {
  text?: string;
  isLoading?: boolean;
};

const loadingClasses = "cursor-not-allowed border-gray-200 bg-gray-100";
const buttonActiveClasses =
  "border-black bg-black text-white hover:bg-white hover:text-black";
const buttonBaseClasses =
  "flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none";

const Button = ({ text, isLoading = false }: ButtonOptions) => {
  return (
    <button
      disabled={isLoading}
      className={`${
        isLoading ? loadingClasses : buttonActiveClasses
      } ${buttonBaseClasses}`}
    >
      {isLoading ? <LoadingDots /> : <p>{text}</p>}
    </button>
  );
};

export default Button;
