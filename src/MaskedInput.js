import InputMask from "react-input-mask";

export default function MaskedInput({value, onChange, placeholder}) {
  return <InputMask mask="999.999.999-99" value={value} onChange={onChange} placeholder={placeholder} />;
}

