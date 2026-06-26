import { PreorderWhenValues, UpdatePreorderDto } from "@/src/app/(server)";
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
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { format } from "date-fns";

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
  const PreorderWhenSelectItems = useMemo(
    () =>
      PreorderWhenValues.map((value) => ({
        label: <EnumContainer value={value} />,
        value,
      })),
    [],
  );

  return (
    <FieldGroup className="*:grid *:md:grid-cols-4 *:gap-10 *:*:last:col-span-3 *:*:last:gap-2 *:*:last:flex *:*:last:flex-col *:*:last:items-start *:*:last:justify-center *:[&>input]:max-w-105 *:*:[&>input]:max-w-105">
      <form.Field name="name">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel required>Name</FieldLabel>
                <FieldDescription>
                  A label to recognize this preorder by.
                </FieldDescription>
              </div>

              <div>
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
              </div>
            </Field>
          );
        }}
      </form.Field>

      <Separator />

      <form.Field name="products">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel>Products</FieldLabel>
                <FieldDescription>
                  Number of products covered by this preorder.
                </FieldDescription>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                    type="number"
                    step={1}
                    min={1}
                    aria-invalid={isInvalid}
                    placeholder="1"
                    className="[&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100 w-40"
                  />
                  <p className="text-sm text-muted-foreground">product(s)</p>
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            </Field>
          );
        }}
      </form.Field>

      <Separator />

      <form.Field name="preorderWhen">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel>Preorder when</FieldLabel>
                <FieldDescription>
                  When customers are allowed to preorder.
                </FieldDescription>
              </div>
              <div>
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
                  <SelectTrigger className="w-full max-w-105">
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
              </div>
            </Field>
          );
        }}
      </form.Field>

      <Separator />

      <form.Field name="startsAt">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel>Starts at</FieldLabel>
                <FieldDescription>
                  When the preorder window opens.
                </FieldDescription>
              </div>

              <div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={
                    field.state.value
                      ? format(field.state.value, "yyyy-MM-dd HH:mm")
                      : ""
                  }
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(new Date(e.target.value))}
                  type="datetime-local"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            </Field>
          );
        }}
      </form.Field>

      <Separator />

      <form.Field name="endsAt">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel>Ends at</FieldLabel>
                <FieldDescription>
                  Leave empty for no end date.
                </FieldDescription>
              </div>

              <div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={
                    field.state.value
                      ? format(field.state.value, "yyyy-MM-dd HH:mm")
                      : ""
                  }
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    console.log("Ends at value:", e.target.value);
                    field.handleChange(new Date(e.target.value));
                  }}
                  type="datetime-local"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            </Field>
          );
        }}
      </form.Field>

      <Separator />

      <form.Field name="isActive">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <div className="flex flex-col gap-2">
                <FieldLabel>Status</FieldLabel>
                <FieldDescription>
                  Active preorders are visible to customers.
                </FieldDescription>
              </div>

              <div>
                <div className="flex flex-row gap-2 items-start">
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(val) => field.handleChange(val)}
                    aria-invalid={isInvalid}
                  />
                  <p className="text-sm text-muted-foreground">
                    {field.state.value ? "Active" : "Inactive"}
                  </p>
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            </Field>
          );
        }}
      </form.Field>
    </FieldGroup>
  );
}
