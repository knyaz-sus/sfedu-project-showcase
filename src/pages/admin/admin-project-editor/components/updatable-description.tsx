import { useState } from "react";
import { RichEditor } from "@/shared/ui/editors/rich-editor";
import { StaticRichEditor } from "@/shared/ui/editors/static-rich-editor";
import { useUpdateProjectDescription } from "../api/hooks/use-update-project-description";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { ConfirmButton } from "./confirm-button";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/hooks/use-toast";

interface UpdatableDescriptionProps {
  previousValue?: string;
  projectId: string;
}

export function UpdatableDescription({
  previousValue,
  projectId,
}: UpdatableDescriptionProps) {
  const { toast } = useToast();
  const [showEditor, setShowEditor] = useState(false);
  const { mutateAsync, isPending } = useUpdateProjectDescription();

  const [description, setDescription] = useState<string | null>(null);

  const currentDescription =
    description !== null ? description : previousValue ?? "";

  const handleDescriptionChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      await mutateAsync({
        projectId,
        description: currentDescription,
        login,
        password,
      });
      setShowEditor(false);
    } catch (error) {
      toast({
        title: "Не удалось изменить описание",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };
  return showEditor ? (
    <>
      <RichEditor
        content={currentDescription}
        onUpdate={setDescription}
        className="my-2"
      />
      <div className="flex gap-2 items-center">
        <ConfirmButton
          onConfirm={handleDescriptionChange}
          isLoading={isPending}
          show
          disabled={currentDescription === previousValue}
        />
        <Button onClick={() => setShowEditor(false)} variant="outline">
          Отменить
        </Button>
      </div>
    </>
  ) : (
    <button>
      <StaticRichEditor
        onClick={() => setShowEditor((prev) => !prev)}
        className="mt-2 hover:text-primary cursor-pointer text-left"
        content={previousValue ? previousValue : "У этого проекта нет описания"}
      />
    </button>
  );
}
