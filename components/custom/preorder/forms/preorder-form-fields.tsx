import { PreorderWhenValues, UpdatePreorderDto } from "@/src/app/(server)";
import {
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import {
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PreorderWhen } from "@/src/generated/prisma/enums";
import { useMemo } from "react";
import EnumContainer from "../../home/table/enum-container";
import { Switch } from "@/components/ui/switch";
import FormRow from "./form-row";
import DatetimeInput from "./datetime-input";

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

const controlClassName = "w-full max-w-md";

export default function PreorderFormFields({ form }: Props) {
  const PreorderWhenSelectItems = useMemo(
    () =>
      PreorderWhenValues.map((value) => ({
        label: <EnumContainer value={value} />,
        value,
      })),
    [],
  );

  return (
    <div className="px-4 sm:px-6">
      <form.Field name="name">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel required>Name</FieldLabel>}
              description={
                <FieldDescription>
                  A label to recognize this preorder by.
                </FieldDescription>
              }
            >
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                required
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="eg: Preorder for the new iPhone 15"
                className={controlClassName}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>

      <form.Field name="products">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel>Products</FieldLabel>}
              description={
                <FieldDescription>
                  Number of products covered by this preorder.
                </FieldDescription>
              }
            >
              <div className="flex items-center gap-2">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(parseInt(e.target.value, 10) || 1)
                  }
                  type="number"
                  step={1}
                  min={1}
                  aria-invalid={isInvalid}
                  placeholder="1"
                  className="w-24 [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100"
                />
                <p className="text-sm text-muted-foreground">product(s)</p>
              </div>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>

      <form.Field name="preorderWhen">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel>Preorder when</FieldLabel>}
              description={
                <FieldDescription>
                  When customers are allowed to preorder.
                </FieldDescription>
              }
            >
              <Select
                items={PreorderWhenSelectItems}
                id={field.name}
                name={field.name}
                defaultValue={PreorderWhen.REGARDLESS_OF_STOCK}
                value={field.state.value}
                onValueChange={(val) =>
                  field.handleChange(val ?? "REGARDLESS_OF_STOCK")
                }
                aria-invalid={isInvalid}
              >
                <SelectTrigger className={controlClassName}>
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>

                <SelectContent alignItemWithTrigger={false}>
                  {PreorderWhenSelectItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>

      <form.Field name="startsAt">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel>Starts at</FieldLabel>}
              description={
                <FieldDescription>
                  When the preorder window opens.
                </FieldDescription>
              }
            >
              <DatetimeInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => {
                  if (value) field.handleChange(value);
                }}
                aria-invalid={isInvalid}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>

      <form.Field name="endsAt">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel>Ends at</FieldLabel>}
              description={
                <FieldDescription>
                  Leave empty for no end date.
                </FieldDescription>
              }
            >
              <DatetimeInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                aria-invalid={isInvalid}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>

      <form.Field name="isActive">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <FormRow
              label={<FieldLabel>Status</FieldLabel>}
              description={
                <FieldDescription>
                  Active preorders are visible to customers.
                </FieldDescription>
              }
            >
              <div className="flex items-center gap-2">
                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onCheckedChange={(val) => field.handleChange(val)}
                  aria-invalid={isInvalid}
                />
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FormRow>
          );
        }}
      </form.Field>
    </div>
  );
}
