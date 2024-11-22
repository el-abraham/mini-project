import { Input } from "./input";

type Props = {
  maxdigits?: number;
  firstZero?: boolean;
};

export const InputNumber = (props: React.ComponentProps<"input"> & Props) => {
  const customChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value.replace(/[^0-9]/g, "");

    // if (e.currentTarget.value.startsWith('0') && e.currentTarget.value.length > 0) {
    //     e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '')
    // }

    if (!props.firstZero && newValue.startsWith("0") && newValue.length > 1) {
      newValue = newValue.slice(1);
    }

    if (props.maxdigits && newValue.length > props.maxdigits) {
      newValue = newValue.slice(0, props.maxdigits);
    }

    e.currentTarget.value = newValue;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.onChange && props.onChange(e);
  };

  return <Input {...props} type="text" onChange={customChange} />;
};
