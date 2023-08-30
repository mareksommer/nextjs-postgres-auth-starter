export type LabelProps = {
  text?: string;
  htmlFor?: string;
};

const classes = "block text-xs text-gray-600 uppercase";

const Label = ({ text, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={classes}>
      {text}
    </label>
  );
};

export default Label;
