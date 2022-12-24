import { Input } from "@ff6wc/ui";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import { selectDefaultValue, selectDescription } from "~/state/schemaSlice";
import { renderDescription } from "~/utils/renderDescription";

export type FlagTextInputProps = {
  description?: string;
  flag: string;
  label: string;
  type: "text";
};

export const FlagTextInput = ({
  description: hardDescription,
  flag,
  label,
  type,
}: FlagTextInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const defaultValue = useSelector(selectDefaultValue(flag));
  const schemaDescription = useSelector(selectDescription(flag));

  const value =
    useFlagValueSelector<string>(flag) ?? defaultValue?.toString() ?? "";

  const dispatch = useDispatch();

  const onChange = (value: string) => {
    dispatch(
      setFlag({
        flag,
        value,
      })
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={"flex flex-col gap-1"}>
        <FlagLabel
          flag={flag}
          helperText={renderDescription(
            hardDescription ?? schemaDescription,
            value
          )}
          label={label}
        />

        <Input
          className="w-full"
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          type="text"
          value={value}
        />
      </div>
    </div>
  );
};