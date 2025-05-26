import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { ConfirmButton } from "./confirm-button";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { useUpdateProjectTrack } from "../api/hooks/use-update-project-track";
import { useGetAllTracks } from "@/pages/admin/api/hooks/use-get-all-tracks";
import { TrackSelect } from "@/shared/widgets/track-select";

interface UpdatableTrackProps {
  previousValue: string | null;
  projectId: string;
}

export function UpdatableTrack({
  previousValue,
  projectId,
}: UpdatableTrackProps) {
  const { mutateAsync, isPending } = useUpdateProjectTrack();
  const { toast } = useToast();
  const { data: tracks } = useGetAllTracks();
  const [edit, setEdit] = useState(false);

  const [track, setTrack] = useState<string | null>(null);

  const currentTrack = track !== null ? track : previousValue ?? "";

  const handleTrackChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const trackId = tracks?.find((track) => track.name === currentTrack)?.id;
      if (!trackId) throw new Error("Не удалось получить трек");
      await mutateAsync({
        projectId,
        trackId: Number(trackId),
        login,
        password,
      });
      setEdit(false);
    } catch (error) {
      toast({
        title: "Не удалось изменить трек",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {!!previousValue && (
        <>
          {!edit && (
            <Badge className="cursor-pointer" onClick={() => setEdit(true)}>
              {previousValue}
            </Badge>
          )}
          {edit && (
            <>
              <TrackSelect value={currentTrack} onValueChange={setTrack} />
              <div className="flex gap-2 items-center w-full">
                <ConfirmButton
                  isLoading={isPending}
                  onConfirm={handleTrackChange}
                  disabled={!currentTrack || currentTrack === previousValue}
                />
                <Button onClick={() => setEdit(false)} variant="outline">
                  Отменить
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
