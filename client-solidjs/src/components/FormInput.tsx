type FormInputProps = {
  label: string;
  type: "email" | "password" | "text";
  id: string;
  value: string;
  error?: string;
  onChange?: (inputName: string, inputValue: string) => void;
  onFocus?: (inputName: string) => void;
};

function FormInput(props: FormInputProps) {
  return (
    <>
      <label for={props.label} class="block text-sm font-medium text-gray-700">
        {props.label}
      </label>

      <input
        type={props.type}
        id={props.id}
        class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        value={props.value}
        onChange={(event) =>
          props.onChange
            ? props.onChange(props.id, event.target.value)
            : undefined
        }
        onFocus={() => {
          props.onFocus ? props.onFocus(props.id) : undefined;
        }}
      />

      {props.error && <div class="text-red-500">{props.error}</div>}
    </>
  );
}

export default FormInput;
