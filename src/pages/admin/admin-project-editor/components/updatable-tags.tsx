import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { useToast } from "@/shared/hooks/use-toast";
import { useAddProjectTag } from "../api/hooks/use-add-project-tag";
import { useDeleteProjectTag } from "../api/hooks/use-delete-project-tag";
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";
import { Badge } from "@/shared/ui/badge";
import { Tags } from "@/shared/types/schemas";
import { Spinner } from "@/shared/ui/spinner";
import { TagsSelect } from "@/shared/widgets/tags-select";
import { ConfirmButton } from "./confirm-button";
import { Button } from "@/shared/ui/button";

interface UpdatableTitleProps {
  projectId: string;
  projectTags: Tags | null;
}

export function UpdatableTags({ projectId, projectTags }: UpdatableTitleProps) {
  const { toast } = useToast();

  const { mutateAsync: mutateAddAsync, isPending: isAddPending } =
    useAddProjectTag();
  const { mutateAsync: mutateDeleteAsync, isPending: isDeletePending } =
    useDeleteProjectTag();

  const { data: tags } = useGetAllTags();
  const [edit, setEdit] = useState(false);
  const [tag, setTag] = useState<string | null>(null);

  const handleAddTag = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const tagId = tags?.find((_tag) => _tag.name === tag)?.id;
      if (!tagId) throw new Error("Не удалось получить трек");
      await mutateAddAsync({
        projectId,
        tagId: tagId,
        login,
        password,
      });
      setTag(null);
      setEdit(false);
    } catch (error) {
      toast({
        title: "Не удалось добавить тег",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTag = async (tag: string) => {
    try {
      const { login, password } = getAdminCredentials();
      const tagId = tags?.find((_tag) => _tag.name === tag)?.id;
      if (!tagId) throw new Error("Не удалось получить трек");
      await mutateDeleteAsync({
        projectId,
        tagId: tagId,
        login,
        password,
      });
    } catch (error) {
      toast({
        title: "Не удалось удалить тег",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 flex-wrap w-full">
      {projectTags &&
        projectTags?.map((tag) => (
          <Badge
            onClick={() => handleDeleteTag(tag.name)}
            variant="secondary"
            key={tag.id}
            className="cursor-pointer"
          >
            {isDeletePending ? (
              <Spinner className="text-primary-foreground" />
            ) : (
              tag.name
            )}
          </Badge>
        ))}
      {!edit && (
        <Badge
          className="cursor-pointer"
          variant="secondary"
          onClick={() => setEdit(true)}
        >
          Добавить тег
        </Badge>
      )}
      {edit && (
        <div className="w-full">
          <TagsSelect
            value={tag ? [tag] : []}
            onValueChange={setTag}
            triggerClassName="mb-1 w-full"
          />
          <div className="flex gap-2 items-center w-full">
            <ConfirmButton isLoading={isAddPending} onConfirm={handleAddTag} />
            <Button onClick={() => setEdit(false)} variant="outline">
              Отменить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
