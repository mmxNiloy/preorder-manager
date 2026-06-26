"use client";

import { Switch } from "@/components/ui/switch";
import { updatePreorder } from "@/src/app/(server)";
import { Preorder } from "@/src/generated/prisma/browser";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  data: Preorder;
};

export default function ToggleAction({ data }: Props) {
  const [loading, startToggle] = useTransition();
  const router = useRouter();

  const handleToggle = useCallback(
    (checked: boolean) => {
      startToggle(async () => {
        const res = await updatePreorder(data.id, {
          isActive: checked,
        });

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        router.refresh();
      });
    },
    [data.id, router],
  );

  return (
    <Switch
      disabled={loading}
      checked={data.isActive}
      onCheckedChange={handleToggle}
    />
  );
}
