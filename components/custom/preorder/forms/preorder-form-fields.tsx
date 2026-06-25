import { CreatePreorderDto, UpdatePreorderDto } from "@/src/app/(server)";
import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormInput = CreatePreorderDto | UpdatePreorderDto;

export type PreorderFormType = ReactFormExtendedApi<
  UpdatePreorderDto,
  FormValidateOrFn<UpdatePreorderDto>,
  FormValidateOrFn<UpdatePreorderDto>,
  FormAsyncValidateOrFn<UpdatePreorderDto>,
  FormValidateOrFn<UpdatePreorderDto>,
  FormAsyncValidateOrFn<UpdatePreorderDto>,
  FormValidateOrFn<UpdatePreorderDto>,
  FormAsyncValidateOrFn<UpdatePreorderDto>,
  FormValidateOrFn<UpdatePreorderDto>,
  FormAsyncValidateOrFn<UpdatePreorderDto>,
  FormValidateOrFn<UpdatePreorderDto>,
  unknown
>;

type Props = {
  form: PreorderFormType;
};

export default function PreorderFormFields({ form }: Props) {
  return (
    <FieldGroup>
      <form.Field name="name">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel
                required
                className="text-sm font-medium text-blue-100 mb-2"
              >
                Name
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                required
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="eg: Preorder for the new iPhone 15"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </FieldGroup>
  );
}
